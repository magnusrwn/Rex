from sqlmodel import SQLModel, Field, Relationship
from typing import Union, Optional
import uuid
from datetime import datetime, date

# add 'table=True' to ensure all are actual tables

class User(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=lambda: uuid.uuid4(), primary_key=True)
    username: str = Field()
    hashed_password: str = Field(unique=True)
    email: str = Field(unique=True)
    isEmailAuthed: bool = Field(False)
    isActive: bool = Field(True)

class ShopifyProfile(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=lambda: uuid.uuid4(), primary_key=True)
    user_id: uuid.UUID = Field(foreign_key='user.id')

class EbayProfile(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=lambda: uuid.uuid4(), primary_key=True)
    user_id: uuid.UUID = Field(foreign_key='user.id')

class EmailAuth(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=lambda: uuid.uuid4(), primary_key=True)
    token: str
    email: str = Field(foreign_key='user.email')
