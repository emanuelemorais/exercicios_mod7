from pycaret.classification import *
import pandas as pd
from models.db import session
from models.dashboard import Crashs
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

        previsao = Crashs(
            tipo_acidente_quant=tipo_acidente_quant,
            tipo_ocorrencia_quant=tipo_ocorrencia_quant,
            sentido_quant=sentido_quant,
            gravidade=int(resultado[0])
        )
        session.add(previsao)
        session.commit()
        session.refresh(previsao)

        if resultado[0] == 0:
            resposta = "Grave"
        elif resultado[0] == 1:
            resposta = "Leve"
        elif resultado[0] == 2:
            resposta = "Moderado"
        elif resultado[0] == 3:
            resposta = "Significativo"
        return resposta
    
    except Exception as e:
        print(str(e))   
        return e


def return_dados(token):

    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])

        # Agora, você pode acessar as informações no JWT decodificado
        exp = decoded_token['exp']
        iat = decoded_token['iat']
        email = decoded_token['email']

        dados = session.query(Crashs).all()

        return {"email": email, "data": dados}


    except jwt.ExpiredSignatureError:
        print("O token JWT está expirado.")
    except jwt.InvalidTokenError:
        print("O token JWT é inválido.")
    