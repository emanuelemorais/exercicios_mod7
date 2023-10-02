from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from models.base import Base


class Data(BaseModel):
    tipo_acidente_quant: int
    tipo_ocorrencia_quant: int
    sentido_quant: int

class Crashs(Base):
    __tablename__ = 'crashes'
    id= Column(Integer, primary_key=True, autoincrement=True)
    gravidade = Column(Integer)
    tipo_acidente_quant = Column(Integer)
    tipo_ocorrencia_quant = Column(Integer)
    sentido_quant = Column(Integer)

class Predictions(Base):
    __tablename__ = 'predictions'
    id= Column(Integer, primary_key=True, autoincrement=True)
    gravidade = Column(Integer)
    tipo_acidente_quant = Column(Integer)
    tipo_ocorrencia_quant = Column(Integer)
    sentido_quant = Column(Integer)