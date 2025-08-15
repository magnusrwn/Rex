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

router = APIRouter()


# # endpoints half-done !!!!!! (mostly mock data)
@router.post('/create-user')
async def create_user_endpoint(user: User, session: Session = Depends(get_session)):
    response = create_user(session, user)
    if response["status_code"] != 200:
        raise HTTPException(status_code=response["status_code"], detail=response["message"])
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


