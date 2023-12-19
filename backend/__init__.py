import os

from flask import Flask 

from .extensions import db
from .routes.auth import auth

def create_app():
    app = Flask(__name__)
    app.secret_key = os.getenv("QUIZODYSSEY_SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("QUIZODYSSEY_DATABASE_URI")
    app.config["SQLALCHEMY_ECHO"] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(auth, url_prefix='/auth')

    return app