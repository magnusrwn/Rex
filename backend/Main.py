from config.db import engine
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from sqlmodel import Session
from config.init_db import init_db

load_dotenv()

with Session(engine) as session:
    (session)