from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError
from typing import Annotated
from dotenv import load_dotenv
from models.base_model import *
import os
from utils import get_user
from sqlmodel import Session
from config.db import engine
import httpx

load_dotenv()

# dep to auto find the token in headers
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


ALGORITHM = os.getenv("ALGORITHM")
SECRET_KEY = os.getenv("SECRET_KEY")


# -- funcs --
def get_session():
    with Session(engine) as session:
        yield session

async def get_client():
    async with httpx.AsyncClient() as cleint:
        yield cleint

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], session: Session = Depends(get_session)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("username")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(session, username=token_data.username) ###
    if user is None:
        raise credentials_exception
    return user

# async def get_current_active_user(
#     current_user: Annotated[User, Depends(get_current_user)],
# ):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user
