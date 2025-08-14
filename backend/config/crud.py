# creates, reads, updates, and deletes users from db
from models.sql_models import User
from sqlmodel import Session, select, create_engine


# will need password imports from 'security' file...
async def create_user(session:Session, u:User):
    new_user = User(u)

    session.add(new_user)

    try:
        session.commit()
    except:
        raise 

