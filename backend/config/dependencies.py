from passlib.context import CryptContext
from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError
from typing import Annotated
from dotenv import load_dotenv
from models.base_model import *
import os
from routes.db_endpoints import get_user
from sqlmodel import Session
from config.db import engine


load_dotenv()

# dep to auto find the token in headers
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=['bcrypt'], ) # used for encrypting a decrypting

ALGORITHM = os.environ("ALGORITHM")
SECRET_KEY = os.environ("SECRET_KEY")


# -- funcs --
def get_session():
    with Session(engine) as session:
        yield session

# async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except InvalidTokenError:
#         raise credentials_exception
#     user = get_user(fake_users_db, username=token_data.username) ###
#     if user is None:
#         raise credentials_exception
#     return user

# async def get_current_active_user(
#     current_user: Annotated[User, Depends(get_current_user)],
# ):
#     if current_user.disabled:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user
