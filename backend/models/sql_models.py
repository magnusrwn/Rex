from sqlmodel import SQLModel, Field
from typing import Union, Required, Optional
from uuid import uu

class User(SQLModel):
    id