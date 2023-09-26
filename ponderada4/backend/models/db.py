from models.dashboard import Crashs
from models.user import User
from models.base import Base
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine, MetaData, Table
from dotenv import load_dotenv

import os

load_dotenv()
DATABASE_URL = os.getenv("URL")



engine = create_engine(DATABASE_URL, echo=True)

Base.metadata.create_all(engine)


Session = sessionmaker(bind=engine)
session = Session()



