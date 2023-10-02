from pycaret.classification import *
import pandas as pd
from models.db import session
from models.dashboard import Crashs
from models.dashboard import Predictions
from fastapi import HTTPException
import jwt
from dotenv import load_dotenv
import os


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

def new_prediction(tipo_acidente_quant, tipo_ocorrencia_quant, sentido_quant):

    try:
        modelo_carregado = load_model('notebook/modelo_final')

        dados_de_entrada = pd.DataFrame({
            "tipo_acidente_quant":[tipo_acidente_quant],
            "tipo_ocorrencia_quant":[tipo_ocorrencia_quant],
            "sentido_quant":[sentido_quant]
        })

        resultado = modelo_carregado.predict(dados_de_entrada)

        previsao = Predictions(
            tipo_acidente_quant=tipo_acidente_quant,
            tipo_ocorrencia_quant=tipo_ocorrencia_quant,
            sentido_quant=sentido_quant,
            gravidade=int(resultado[0])
        )
        session.add(previsao)
        session.commit()
        session.refresh(previsao)

        return previsao
    
    except Exception as e:
        print(str(e))   
        return e


def return_dados_dashboard(token):

    try:
        if(token):
            decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])

            exp = decoded_token['exp']
            iat = decoded_token['iat']
            email = decoded_token['email']

            dados = session.query(Predictions).all()
            return dados
        raise HTTPException(status_code=401, detail="Invalid credentials")


    except Exception as e:
        print(str(e))   
        return e
    