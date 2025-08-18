import httpx
from config.dependencies import get_session, get_current_user
from sqlmodel import Session
from models.base_model import *
from models.sql_models import *
from Main import app
from fastapi import routing, APIRouter, HTTPException, Depends
from services.email_auth import *

router = APIRouter()
