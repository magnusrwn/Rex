from config.db import engine
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from sqlmodel import Session, SQLModel
from config.init_db import init_db

load_dotenv()

# Creates all SQL tables in the db on every run. **Does not edit already created tables... to do that use Workbench, or delete whole tablbe and re-add (on run)
SQLModel.metadata.create_all(engine)

