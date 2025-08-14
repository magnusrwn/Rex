# maybe import from dependancies? [make dependancies.py]
from sqlmodel import Session
from models.base_model import *
from models.sql_models import *
from Main import app
from fastapi import routing, APIRouter

router = APIRouter(prefix='/db')


# endpoints half-done !!!!!! (mostly mock data)
def get_user(session: Session, username: str, email: str):
    if username in session:
        user_dict = session[username]
        return UserInDB(**user_dict)