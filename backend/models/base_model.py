from typing import Annotated
from datetime import date, datetime
from pydantic import BaseModel
import uuid

from models.sql_models import *

# Models for security.py
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

# only ever expose this in frontend-backend communication
class UserPublic(BaseModel):
    email: str
    username:str
# use this within the backend
class UserInDB(UserPublic):
    hashed_password: str

class RegisterUser(BaseModel):
    email: str
    username: str
    password: str

class GetUserEndpointBody(BaseModel):
    username: str
    email: str
    isEmailAuthed: bool