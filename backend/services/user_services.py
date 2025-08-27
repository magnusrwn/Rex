from fastapi import APIRouter, Depends, HTTPException
import os
from dotenv import load_dotenv
from sqlmodel import Session
from models.sql_models import User
from config.dependencies import get_session, get_current_user, get_client
from email.mime.text import MIMEText
from routes.db_endpoints import send_email_for_verify, add_email_for_auth
from services.crud import add_user_to_db, user_soft_delete


async def create_user(user: dict, session: Session = Depends(get_session)):
    '''
    Entire create user process
    '''
    typed_user = User(**user)
    response = add_user_to_db(session, typed_user)
    if response["status_code"] != 200:
        return {"status_code":response["status_code"], "message":response["message"]}
    
    # ads the email to the verification table in db, returns the token
    add_email_to_db_resp = await add_email_for_auth(user['email'], session)
    if add_email_to_db_resp["status_code"] != 200:
        return {"status_code":add_email_to_db_resp['status_code'], "message":"error in adding email/ token to the db for verification. Try again later/ check types"}
    returned_token = add_email_to_db_resp['token']
 
    # send the email with the url/token
    response = await send_email_for_verify(returned_token)
    if response["status_code"] != 200:
        return {"status_code":response["status_code"], "message":response['message']}
    return {"status_code":200, "message":"successfully created user"}


async def delete_user_endpoint(user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    response = user_soft_delete(session, user)
    if response["status_code"] != 200:
        details = {"message":response["message"]}
        raise HTTPException(status_code=response["status_code"], detail=details)
    return {"status_code":200, "message":"successfully deleted user"}

def change_username():
    pass

def change_email():
    pass

def change_password():
    pass