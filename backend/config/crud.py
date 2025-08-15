# creates, reads, updates, and deletes users from db
from models.sql_models import User
from sqlmodel import Session, select, create_engine


# will need password imports from 'security' file...
def create_user(session:Session, u:User) -> bool:
    new_user = User(u)
    session.add(new_user)
    try:
        session.commit()
        session.refresh()
        return {"status_code": 200}
    except:
        return {"status_code":500, "message":"Databsae error creating user"}

def delete_user(session: Session, u:User):
    '''
    Just sets 'isActive to False
    '''
    try:
        q = select(User).where(User.id == u.id)
        user = session.exec(q).first()

        if user:
            user.isActive = False
            session.add(user)
            session.commit()
            session.refresh()
        else:
            return{
                "status_code":500,
                "message":"could not find passed in user in the db... try again later"
            }
    except:
        return{
            "status_code":500,
            "message":"databse encountereed an error in query. Please try again and/ or report the issue"
        }


