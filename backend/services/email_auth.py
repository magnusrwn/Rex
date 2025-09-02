import httpx
from config.dependencies import get_session, get_current_user
from sqlmodel import Session
from models.base_model import *
from models.sql_models import *
from fastapi import Depends
from sqlmodel import select, and_
import secrets
import smtplib
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

load_dotenv()

async def remove_email_for_auth(email:str, token:str, session: Session):
    '''
    Removes the emial from the email autuh table and updates profile info (to show they are now authed)
    This ocurs when the email has been authed
    input: email:str, token:str
    '''
    # clears profile from auth table
    dp_to_remove = select(EmailAuth).where(and_(EmailAuth.email == email, EmailAuth.token == token))
    if not dp_to_remove:
        return {"status_code":400, "message":"Could not find user in the email auth"}
    session.delete(dp_to_remove)
    session.commit()

    # Changes user to be authed on 'User' table
    q = select(User).where(User.email == email)
    user = session.exec(q).first()
    if user:
        user.isEmailAuthed = True
        session.add(user)
        session.commit()
    else:
        return {"status_code":400, "message":"User not found in User table"}
    
    return {"status_code":200, "message":"dp successfully removed form the db, and authed email in User table"}

async def add_email_for_auth(email: str, session: Session = Depends(get_session)):
    '''
    Adds email to the db, so can be compared/ updated for email auth
    Input: email: str
    Output: email:str, token:str
    '''
    new_tok = secrets.token_urlsafe(32)
    data = {
        "token": new_tok,
        "email": email
    }
    try:
        data_to_db = EmailAuth(**data)

        session.add(data_to_db)
        session.commit()
        session.refresh(data_to_db)
        return {
            "status_code":200,
            "token": new_tok
            }
    except Exception as e:
        return {"status_code":500, "message":f"failed to add token to the db. Probably a type error... Details: {e}"}

async def send_email_for_verify(token: str, email:str):
    '''
    Input: email, token
    Output: None
    '''
    try:
        frontend_base_url = os.environ("FRONTEND_BASE_URL")
        url = f"{frontend_base_url}/auth/:{token}"
        sender = "me@example.com" # ME... OR THE THING ILL HAVE TO PAY FOR
        receiver = "email@email.example.com" # USE EMAIL VAR !! 
        #receiver = email
        subject = "Fuffiled Email Verification Link"
        body = "Hello, this is a test email sent to MailHog!\n\n" \
        f"Your auth link is: {url}" \
        "If this was not you then kys"

        # Create the message
        msg = MIMEText(body)
        msg["From"] = sender
        msg["To"] = receiver
        msg["Subject"] = subject

        # Connect to MailHog SMTP (no auth needed)
        smtp_server = "localhost"
        smtp_port = 1025

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.sendmail(sender, receiver, msg.as_string())

        # temp log
        print("Email sent to MailHog!")
        return {"status_code":200, "message":"successfully sent auth email to user"}

    except Exception as e:
        return {"status_code": 500, "message":f"Internal server error when sending auth email. Details: {e}"}
    

    