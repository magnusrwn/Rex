# USER CRUD ONLY
from models.sql_models import User
from sqlmodel import Session, select


# will need password imports from 'security' file...
def add_user_to_db(session:Session, u:User):
    """
    Input: session, user[User]
    Output: {"status_code":200} OR {"status_code":500, "message":string}
    """
    try:
        session.add(u)
        session.commit()
        session.refresh(u)
        return {"status_code": 200}
    except Exception as e:
        return {"status_code":500, "message":f"Databsae error creating user. Return message: {e}"}

def user_soft_delete(session: Session, u: User):
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




