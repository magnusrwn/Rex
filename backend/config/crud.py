# USER CRUD ONLY
from models.sql_models import User
from sqlmodel import Session, select, create_engine


# will need password imports from 'security' file...
def create_user(session:Session, u:dict) -> bool:
    try:
        new_user = User(**u)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        return {"status_code": 200}
    except Exception as e:
        return {"status_code":500, "message":f"Databsae error creating user. Return message: {e}"}

def delete_user(session: Session, u: User):
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
            session.refresh(user)
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

def change_username():
    pass

def change_email():
    pass

def change_password():
    pass


