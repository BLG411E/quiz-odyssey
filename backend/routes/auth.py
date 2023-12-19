import datetime
import re

import jwt
from flask import Blueprint, current_app, jsonify, request
from sqlalchemy.exc import IntegrityError
from werkzeug.security import check_password_hash, generate_password_hash

from .. import models
from ..extensions import db

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    if not request.is_json:
        return jsonify({"msg": "Expected JSON data"}), 400

    requestParameters = request.get_json()

    username = requestParameters.get("username", None)
    password = requestParameters.get("password", None)
    email = requestParameters.get("email", None)
    registeredAt = datetime.datetime.now()

    if email and not re.match(
        r"^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$", email
    ):
        return (
            jsonify(
                {"msg": "Invalid email address"}
            ),
            400,
        )


    if not username or not password or not email:
        return (
            jsonify(
                {
                    "msg": "Missing required parameters",
                }
            ),
            400,
        )

    passwordHash = generate_password_hash(password)
    try:
        db.session.execute(
            db.insert(models.User),
            [
                {
                    "username": username,
                    "passwordHash": passwordHash,
                    "email": email,
                    "registeredAt": registeredAt,
                }
            ],
        )
        db.session.commit()
    except IntegrityError as e:
        errmsg = e.orig.args[0]
        error_src = errmsg[errmsg.find("Key (") + 5 : errmsg.find(")")]
        if error_src == "username":
            return (
                jsonify(
                    {
                        "msg": "A user with this username already exists",
                    }
                ),
                400,
            )
        elif error_src == "email":
            return (
                jsonify(
                    {
                        "msg": "Email is already registered",
                    }
                ),
                400,
            )
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    token = jwt.encode(
        {
            "username": username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30),
        },
        current_app.secret_key,
    )
    return jsonify({"token": token}), 201