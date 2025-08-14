from cryptography import fernet
from cryptography.fernet import Fernet
from dotenv import load_dotenv
import os
import asyncio
from typing import Optional
from sqlmodel import Session, select, and_
from sqlite3 import DatabaseError
from fastapi import Depends
from config.dependencies import get_session
from models.sql_models import User

load_dotenv()

def encode_str(s:str)-> bytes:
    byte_string = s.encode("utf-8")
    if byte_string: return byte_string
    raise ValueError("Could Not convert string to bytes. Process: 'encode_str()'")


def init_fernet():
    key = os.getenv("FERNET_KEY")
    if key:
        # encode the key to make it into bytes...
        encoded_key = key.encode()
        f = Fernet(encoded_key)
        return f
    else:
        raise ValueError("FERNET_KEY env var is INVALID or MISSING. Can not init fernet")


def encrypt_fernet(s:bytes, process:Optional[str]):
    fernet_obj = init_fernet()
    encrypted_string = fernet_obj.encrypt(s)
    if encrypted_string:
        return encrypted_string
    else:
        raise ValueError(f"Unable to decrypt the string. Process{process}" if process else "Unable to decrypt the string. Process")

def decrypt_fernet(s:bytes, process:Optional[str]):
    fernet_obj = init_fernet()
    decrypted_string = fernet_obj.decrypt(s)
    if decrypted_string:
        return decrypted_string
    else:
        raise ValueError(f"Unable to decrypt the string. Process{process}" if process else "Unable to decrypt the string. Process")

def get_user(session: Session, username:str, email:str) -> dict:
    '''
    Inps: email:str, username:str
    Output: dict (of User db obj)
    '''
    try:
        q = select(User).where(and_(User.username == username, User.email == email))
        user = session.exec(q).first()
        if user: return user.model_dump()
        return None
    except Exception as e:
        raise DatabaseError(f"Datbase error. Detail: {e}")
