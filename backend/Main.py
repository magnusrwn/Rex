from config.db import engine
from fastapi import FastAPI, APIRouter, routing
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlmodel import Session, SQLModel
from models.sql_models import *

load_dotenv()

# Creates all SQL tables in the db on every run. **Does not edit already created tables... to do that use Workbench, or delete whole tablbe and re-add (on run)
SQLModel.metadata.create_all(engine)

app = FastAPI()

origins = [
    "http://localhost:8000", # local server... change later to match default local host?
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)



from routes import login, db_endpoints

app.include_router(login.router)
app.include_router(db_endpoints.router)