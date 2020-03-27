import os

from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="../static")
app.config.from_object('config')

db = SQLAlchemy(app)

@app.route('/')
def index():
    return send_from_directory('../static', 'index.html')

@app.route('/upload')
def upload():
    return send_from_directory('../static', 'image.html')

@app.route('/<path:path>')
def serve(path):
    return send_from_directory('../static', path)


from app.controllers import default