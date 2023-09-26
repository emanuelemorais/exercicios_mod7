from models.base import Base
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel

class UserCreate(BaseModel):
    email: str
    password: str

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)