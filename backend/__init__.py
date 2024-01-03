import os

import socketio
from flask import Flask
from .insert_data import insert_questions
from .extensions import db
from .routes.auth import auth
from .routes.category import category
from .routes.question import question
from .routes.quiz import QuizSession
from .routes.score import score
from .routes.social import social
from .routes.users import users
from .routes.stats import stats


def create_app():
    app = Flask(__name__)
    app.secret_key = os.getenv("QUIZODYSSEY_SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("QUIZODYSSEY_DATABASE_URI")
    app.config["SQLALCHEMY_ECHO"] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()
        insert_questions()

    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(question, url_prefix="/question")
    app.register_blueprint(social, url_prefix="/social")
    app.register_blueprint(users, url_prefix="/users")
    app.register_blueprint(category, url_prefix="/category")
    app.register_blueprint(score, url_prefix="/score")
    app.register_blueprint(stats, url_prefix='/stats')

    sio = socketio.Server(cors_allowed_origins="*")
    sio.register_namespace(QuizSession(app=app, namespace="/quiz"))

    app = socketio.WSGIApp(sio, app)
    return app
