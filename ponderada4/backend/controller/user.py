from dotenv import load_dotenv
from fastapi import HTTPException
from models.db import session   
from models.user import User
import jwt
import datetime
import os

# Importação do SECRET_KEY
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")


# Controllers usuário
def create_user(email, password):
    try:
        db_user = User(email=email, password=password)
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user
    except Exception as e:
        return e

def get_user(email, password):
    try:
        db_user = session.query(User).filter(User.email == email).first()
        if db_user and db_user.password == password:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),  # Expiração
                'iat': datetime.datetime.utcnow(),  # Emitido em
                'email': email 
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
            return token
        raise HTTPException(status_code=401, detail="Invalid credentials")
    except Exception as e:
        return e