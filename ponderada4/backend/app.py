import uvicorn
from fastapi import FastAPI
from routes.user import init_routes_user
from routes.dashboard import init_routes_dashboard 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


init_routes_user(app)
init_routes_dashboard(app)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)