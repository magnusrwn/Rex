from sqlmodel import SQLModel, Field, Relationship
from typing import Union, Optional
import uuid
from datetime import datetime, date

# extreme base of things...

# add 'table=True' to ensure all are actual tables

class User(SQLModel, table=True):
    id: uuid.UUID = Field(uuid.uuid4, primary_key=True)
    hashed_password: str
    email: str = Field(unique=True)

class ShopifyProfile(SQLModel, table=True):
    id: uuid.UUID = Field(uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key='user.id')

class EbayProfile(SQLModel, table=True):
    id: uuid.UUID = Field(uuid.uuid4, primary_key=True)
    user_id: uuid.UUID = Field(foreign_key='user.id')
