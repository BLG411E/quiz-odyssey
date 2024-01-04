import os

import socketio
from flask import Flask
from flask_cors import CORS

from .extensions import db
from .routes.auth import auth
from .routes.category import category
from .routes.question import question
from .routes.quiz import QuizSession
from .routes.social import social
from .routes.stats import stats
from .routes.users import users


def create_app(use_socketio=True):
    app = Flask(__name__)
    app.secret_key = os.getenv("QUIZODYSSEY_SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("QUIZODYSSEY_DATABASE_URI")
    app.config["SQLALCHEMY_ECHO"] = False
    CORS(app)
    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(question, url_prefix="/question")
    app.register_blueprint(social, url_prefix="/social")
    app.register_blueprint(users, url_prefix="/users")
    app.register_blueprint(category, url_prefix="/category")
    app.register_blueprint(stats, url_prefix='/stats')

    if not use_socketio:
        return app

    sio = socketio.Server(cors_allowed_origins="*")
    sio.register_namespace(QuizSession(app=app, namespace="/quiz"))

    app = socketio.WSGIApp(sio, app)
    
    return app
