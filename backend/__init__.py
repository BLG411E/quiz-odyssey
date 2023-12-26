import os

from flask import Flask

from .extensions import db
from .routes.auth import auth
from .routes.question import question
from .routes.social import social
from .routes.users import users


def create_app():
    app = Flask(__name__)
    app.secret_key = os.getenv("QUIZODYSSEY_SECRET_KEY")
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("QUIZODYSSEY_DATABASE_URI")
    app.config["SQLALCHEMY_ECHO"] = False

    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(question, url_prefix="/question")
    app.register_blueprint(social, url_prefix="/social")
    app.register_blueprint(users, url_prefix="/users")

    return app
