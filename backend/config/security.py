from datetime import datetime, timedelta, timezone
from typing import Annotated
from models.sql_models import User, EmailAuth
from dotenv import load_dotenv
import os
from models.base_model import *
import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from pydantic import BaseModel
from sqlmodel import Session, select, and_
from Main import app
from utils import get_user
import secrets
import bcrypt


load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# -- funcs --
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def get_password_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def create_access_token(data: dict):
    ''''
    Creates an access token with 3 hr expirey, or with the current expirey if not already expired.
    '''
    # setting to_encode as the same as the data obj passed in... currently looks like {"username":str}
    to_encode = data.copy()
    expire = datetime.now() + timedelta(hours=3)
    
    to_encode.update({"expire": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def authenticate_user(session: Session, username: str, password: str) -> dict:
    '''
    Input: session, username, password
    Output: {"status_code":int, "user":User}
    '''
    user = get_user(session, username)
    if not user:
        details = {"message":"User with those details does not exist"}
        return {"status_code":400, "detail":details}
    if not verify_password(password, user["hashed_password"]):
        details = {"message":"Username or password is incorrect."}
        return {"status_code":401, "detail":details}
    # check if the user is authed with email
    if not user["isEmailAuthed"]:
        details = {"message":"Users email is not authenticated"}
        return {"status_code":403, "detail":details, "user_email":user["email"]}

    return {"status_code":200, "user":user}

def check_user_exists(session: Session, email: str, username: str) -> bool:
    '''
    Checks for both email and username

    True means that user DOES exist
    False means that user does NOT exist
    '''
    email_q = select(User).where(User.email == email)
    email_response = session.exec(email_q).first()
    if email_response:
        if email_response.isActive == True: return {"status_code":400, "message":"Email already in use"}
        pass
    username_q = select(User).where(User.username == username)
    username_response = session.exec(username_q).first()
    if username_response:
        return {"status_code":400, "message":"Username already in use"}
    
    return {"status_code":200}

def email_verification(email: str):
    '''
    Sends an email verification link, and updates 'isVerified' in the db
    '''
    
    pass

def reset_password():
    pass

