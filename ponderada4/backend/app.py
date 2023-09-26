from fastapi import FastAPI
from routes.user import init_routes_user
from routes.dashboard import init_routes_dashboard 

app = FastAPI()

init_routes_user(app)
init_routes_dashboard(app)