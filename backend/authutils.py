from functools import wraps

import jwt
from flask import current_app, jsonify, request


def get_userID(db, username: str):
    from . import models

    return (
        db.session.execute(
            db.select(models.User).where(models.User.username == username)
        )
        .first()[0]
        .id
    )


def get_staffID(db, username: str):
    from . import models

    return (
        db.session.execute(
            db.select(models.Staff).where(models.Staff.username == username)
        )
        .first()[0]
        .id
    )


def require_token(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not "Token" in request.headers:
            return (
                jsonify({"msg": "Token required"}),
                401,
            )

        token = request.headers["Token"]
        try:
            tokenData = jwt.decode(token, current_app.secret_key, algorithms=["HS256"])
        except Exception as e:
            return jsonify({"msg": str(e)}), 401

        return f(tokenData["username"], *args, **kwargs)

    return decorated


def require_moderator(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not "Token" in request.headers:
            return (
                jsonify({"msg": "Token required"}),
                401,
            )

        token = request.headers["Token"]
        try:
            tokenData = jwt.decode(token, current_app.secret_key, algorithms=["HS256"])
        except Exception as e:
            return jsonify({"msg": str(e)}), 401

        try:
            return f(tokenData["username"], tokenData["isStaff"], *args, **kwargs)
        except KeyError:
            return (
                jsonify(
                    {
                        "msg": "You do not have permission to access this resource",
                    }
                ),
                403,
            )

    return decorated


def require_admin(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not "Token" in request.headers:
            return (
                jsonify({"msg": "Token required"}),
                401,
            )

        token = request.headers["Token"]
        try:
            tokenData = jwt.decode(token, current_app.secret_key, algorithms=["HS256"])
        except Exception as e:
            return jsonify({"msg": str(e)}), 401

        try:
            return f(tokenData["username"], tokenData["isAdmin"], *args, **kwargs)
        except KeyError:
            return (
                jsonify(
                    {
                        "msg": "You do not have permission to access this resource",
                    }
                ),
                403,
            )

    return decorated
