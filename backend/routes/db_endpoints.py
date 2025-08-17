import httpx
from config.dependencies import get_session, get_current_user
from sqlmodel import Session
from models.base_model import *
from models.sql_models import *
from Main import app
from fastapi import routing, APIRouter, HTTPException, Depends
from sqlmodel import select, and_
from sqlite3 import DatabaseError
from config.crud import create_user, delete_user
import secrets

router = APIRouter()


# # endpoints half-done !!!!!! (mostly mock data)
@router.post('/create-user')
async def create_user_endpoint(user: User, session: Session = Depends(get_session)):
    response = create_user(session, user)
    if response["status_code"] != 200:
        return {"status_code":response["status_code"], "detail":response["message"]}
    
    # add to the needs email auth bit
    response = await add_email_for_auth(user.email)
    if response["status_code"] != 200:
        return {""}
    return {"status_code":200, "message":"successfully created user"}


@router.delete('/delete-user')
async def delete_user_endpoint(user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    '''
    Preforms 'soft delete'
    '''
    response = delete_user(session, user)
    if response["status_code"] != 200:
        details = {"message":response["message"]}
        raise HTTPException(status_code=response["status_code"], detail=details)
    return {"status_code":200, "message":"successfully deleted user"}

@router.post('/add-email-for-auth')
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
        data_to_db = EmailAuth(data)

        session.add(data_to_db)
        session.commit()
        session.refresh(data_to_db)
        return {
            "status_code":200,
            "message":"sucessfully added email and tokn to db. Ready for auth",
            "token": new_tok
            }
    except:
        return {"status_code":500, "message":"failed to add token to the db. Probably a type error"}
    
@router.delete('/remove-email-for-authentication')
async def remove_email_for_auth(email:str, token:str, session: Session = Depends(get_session)):
    '''
    Removes the emial from the email autuh table...
    This ocurs when the email has been authed
    input: email:str, token:str
    '''
    dp_to_remove = select(EmailAuth).where(and_(EmailAuth.email == email, EmailAuth.token == token))
    if not dp_to_remove:
        return {"status_code":400, "message":"Could not find user in the databse"}
    session.delete(dp_to_remove)
    session.commit()
    return {"status_code":200, "message":"dp successfully removed form the db"}