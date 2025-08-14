from typing import Annotated
from datetime import date, datetime
from pydantic import BaseModel

from sql_models import *

# Models for security.py
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class UserInDB(User):
    hashed_password: str