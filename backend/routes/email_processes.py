# all funcs are in services... just derive endpoints entirely our of funcs
from services.email_auth import add_email_for_auth, send_email_for_verify, remove_email_for_auth
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
import os
from dotenv import load_dotenv
from config.dependencies import get_session, get_current_user, get_client

load_dotenv()

router = APIRouter(prefix='/email')

router.post('/start-email-auth')
async def start_email_auth(email: str, session: Session = Depends(get_session)):
    # first, add to db for auth
    response = await add_email_for_auth(email, session)
    if response['status_code'] != 200:
        raise HTTPException(status_code=response['status_code'], detail=response['message'])
    
    # then, send the verification email
    response = await send_email_for_verify(email)
    if response['status_code'] != 200:
        raise HTTPException(status_code=response['status_code'], detail=response['message'])
    
    return {"status_code":200, "message":"successfully sent veri-email"}

router.post('/finish-email-auth')
async def finish_email_auth(email: str, token: str, session: Session = Depends(get_session)):
    response = await remove_email_for_auth(email, token, session) # does both rempval and profile update
    if response['status_code'] != 200:
        raise HTTPException(status_code=response['status_code'], detail=response['message'])
    
    return {'status_code':200, 'message':'Email successfully authenticated. Processes have successfully run'}

