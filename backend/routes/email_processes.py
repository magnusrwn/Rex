from fastapi import APIRouter, Depends, HTTPException
import os
from dotenv import load_dotenv
from sqlmodel import Session
from models.sql_models import User
from config.dependencies import get_session, get_current_user, get_client
import httpx
import smtplib
from email.mime.text import MIMEText
from routes.db_endpoints import add_email_for_auth, remove_email_for_auth

load_dotenv()

router = APIRouter(prefix='/email')

@router.post('/send-email-for-verify')
async def send_email_for_verify(email: str, client: httpx.AsyncClient = Depends(get_client)):
    '''
    Input: email
    Output: None
    '''
    add_email_to_db_resp = await add_email_for_auth(email)
    if add_email_to_db_resp["status_code"] != 200:
        return {"status_code":200, "message":"error in adding email/ token to the db for verification. Try again later/ check types"}


    # send the email 
    created_token = add_email_to_db_resp["token"]

    sender = "me@example.com" # paid for sender
    receiver = "email@email.example.com" # emial var 
    subject = "MailHog Test -- Auth message"
    body = "Hello, this is a test email sent to MailHog!\n\n" \
    f"Your auth link is: https:example_linkhere:?token={created_token}" \
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

