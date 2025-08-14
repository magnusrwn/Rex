# maybe import from dependancies? [make dependancies.py]
from sqlmodel import Session
from models.base_model import *
from models.sql_models import *
from Main import app
from fastapi import routing, APIRouter, HTTPException
from sqlmodel import select, and_
from sqlite3 import DatabaseError

router = APIRouter(prefix='/db')


# # endpoints half-done !!!!!! (mostly mock data)
