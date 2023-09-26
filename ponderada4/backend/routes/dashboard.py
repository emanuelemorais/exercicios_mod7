from controller.dashborad import new_prediction, return_dados
from models.dashboard import Data
from fastapi.security.oauth2 import OAuth2PasswordBearer
from fastapi import Depends

def init_routes_dashboard(app):  

    @app.post("/dashboard/prediction")
    def prediction(item: Data):
        resposta = new_prediction(item.tipo_acidente_quant, item.tipo_ocorrencia_quant, item.sentido_quant)
        return resposta
    
    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

    @app.get("/dashboard/dados")
    def dados(token: str = Depends(oauth2_scheme)):
        dados_armazenados = return_dados(token)
        return dados_armazenados