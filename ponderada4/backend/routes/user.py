from controller import user 
from models.user import UserCreate

def init_routes_user(app):

    @app.post("/users/new")
    def new_user(new_user: UserCreate):
        usuário = user.create_user(new_user.email, new_user.password)
        return usuário

    @app.post("/users/login")
    def login(login: UserCreate):
        token = user.get_user(login.email, login.password)
        return token
        