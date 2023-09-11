from fastapi import FastAPI
from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates

from pycaret.classification import *
import pandas as pd
from pydantic import BaseModel


app = FastAPI()

class Data(BaseModel):
    tipo_acidente_quant: int
    tipo_ocorrencia_quant: int
    sentido_quant: int


view = Jinja2Templates(directory="view")

@app.get("/")
async def root(request: Request):
    return view.TemplateResponse("index.html", {"request": request})


@app.post("/nova_previsao")
async def create_item(item: Data):

    modelo_carregado = load_model('modelo_final')

    dados_de_entrada = pd.DataFrame({
        "tipo_acidente_quant":[item.tipo_acidente_quant],
        "tipo_ocorrencia_quant":[item.tipo_ocorrencia_quant],
        "sentido_quant":[item.sentido_quant]
    })

    resultado = modelo_carregado.predict(dados_de_entrada)

    if resultado[0] == 0:
        resposta = "Grave"
    elif resultado[0] == 1:
        resposta = "Leve"
    elif resultado[0] == 2:
        resposta = "Moderado"
    elif resultado[0] == 3:
        resposta = "Significativo"

    return f"{resposta}"