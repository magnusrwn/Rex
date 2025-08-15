from fastapi import FastAPI, Depends, APIRouter, HTTPException, status
from config.security import authenticate_user, create_access_token, check_user_exists, get_password_hash
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from models.base_model import *
from sqlmodel import Session
from config.dependencies import get_session, get_client, get_current_user
import httpx


router = APIRouter(prefix='/login')



@router.post("/token")
async def login(session: Session = Depends(get_session), form_data: OAuth2PasswordRequestForm = Depends()):
    response = authenticate_user(session, form_data.username, form_data.password)
    # if the users email i snot authed, then it sends details AND the users e-mail to the frontend... Allowing the auth email to be sent
    if response["status_code"] == 403:
        details = {
            "message":"Users email is not authed. Run auth func sequence now",
            "user":response["user_email"]
        }
        raise HTTPException(
            status_code=403,
            detail=details
        )
    if response["status_code"] == 401:
        raise HTTPException(
            status_code=401,
            detail={"message":"Incorrect username or password"}
        )
    if response["status_code"] == 400:
        raise HTTPException(
            status_code=400,
            detail={"message":"User with username does not exist"}
        )

    # extract the user obj
    user = response["user"]
    # save this in the fronent for local storage/ browser storage (or whatever it is called)
    access_token = create_access_token(data={"username": user["username"]}) # auto calcs three hour epxirey
    return {
        "status_code":200,
        "token":Token(access_token=access_token, token_type="bearer"),
        "message":"successfully logged user in. Returned token."
    }

@router.post('/signup')
async def sign_up(new_user: SignUpUser, session: Session = Depends(get_session), client: httpx.AsyncClient = Depends(get_client)):
    user_exist = check_user_exists(session, new_user.email, new_user.username)
    # returns response code
    if user_exist["status_code"] != 200:
        details = {"message":user_exist["message"]}
        raise HTTPException(status_code=user_exist["status_code"], detail=details)
    
    # if the users detaiuls are not already in use...
    # hashing the inputed password/ detail gathering
    hashed_password = get_password_hash(new_user.password)
    username = new_user.username
    email = new_user.email

    JSON = {
        "username": username,
        "hashed_password": hashed_password,
        "email": email
    }
    response = await client.post('/create-user', json=JSON)
    if response["status_code"] != 200:
        details = {"message":"failed to input new user into db, please try again later"}
        raise HTTPException(status_code=500, detail=details)
    
    # if all is good and added, return the email and status code (email for prompy to verify email)
    return {
        "status_code":200,
        "user_email": new_user.email,
        "message":"successfully added user to db"
    }   
