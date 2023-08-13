from flask import *

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template("resume.html");

@app.route('/static/<filename>')
def servir_imagem(filename):
    return send_from_directory('static', filename);