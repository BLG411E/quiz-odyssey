import datetime

import werkzeug
from flask import Blueprint, jsonify, request, current_app
from werkzeug.security import check_password_hash, generate_password_hash

from .. import models
from ..authutils import require_token, require_admin
from ..extensions import db
import jwt

users = Blueprint("users", __name__)

@users.route("/search", methods=["GET"])
def search_users():
    term = request.args.get("term", None)
    
    try:
        users = db.session.query(models.User).filter(models.User.username.contains(term)).all()

        user_list = [user.to_dict() for user in users]
        return jsonify(user_list), 200
        
    
    except Exception as e:
        return (
            jsonify({"error": str(e)}),
            500,
        )


@users.route("/list", methods=["GET"])
@require_admin
def list_users(username, isAdmin):
    page = int(request.args.get("page", 0))
    if page < 1:
        page = 1

    try:
        users = db.paginate(
            db.select(models.User).order_by(models.User.registeredAt.desc()),
            page=page,
            per_page=20,
        )
        return (
            jsonify(
                {
                    "total": users.total,
                    "page": users.page,
                    "per_page": 20,
                    "has_prev": users.has_prev,
                    "has_next": users.has_next,
                    "results": [item.to_dict() for item in users.items],
                }
            ),
            200,
        )
    except werkzeug.exceptions.NotFound:
        return (
            jsonify({"msg": "Page does not exist"}),
            404,
        )
    except Exception as e:
        return (
            jsonify({"msg": str(e)}),
            500,
        )


@users.route("/<id>", methods=["DELETE"])
@require_admin
def delete_user(username, isAdmin, id):
    try:
        db.session.execute(db.select(models.User).where(models.User.id == id)).first()[
            0
        ]
    except TypeError:
        return (
            jsonify(
                {
                    "msg": "Invalid User ID",
                }
            ),
            400,
        )

    try:
        db.session.execute(db.delete(models.User).where(models.User.id == id))
        db.session.commit()
        return jsonify({"msg": "User deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500


@users.route("/info", methods=["GET"])
@require_token
def get_user_information(username):
    try:
        user = db.session.execute(
            db.select(
                models.User.username,
                models.User.email,
                models.User.registeredAt,
                models.User.streakCount,
                models.User.totalScore,
            ).where(models.User.username == username)
        ).first()
        return (
            jsonify(
                {
                    "username": user[0],
                    "email": user[1],
                    "registeredAt": user[2],
                    "streakCount": user[3],
                    "totalScore": user[4],
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    

@users.route("/updateusername", methods=["PUT"])
@require_token
def change_username(username):
    requestParameters = request.get_json()
    print(username)
    new_username =str( requestParameters.get("newusername", None))

    try:
        db.session.execute(
            db.update(models.User)
            .where(models.User.username == username)
            .values(username=new_username)
        )
        db.session.commit()
        
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    
    token = jwt.encode(
        {
            "username": new_username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=30),
        },
        current_app.secret_key,
    )
    return jsonify({"token": token}), 201

@users.route("/updatepassword", methods=["PUT"])
@require_token
def change_password(username):
    requestParameters = request.get_json()

    current_password =requestParameters.get("oldpassword", None)
    new_password =requestParameters.get("newpassword", None)

    try:
        db.session.execute(
            db.select(models.User).where(models.User.username == username)
        ).first()[0]
    except TypeError:
        return (
            jsonify(
                {
                    "msg": "No user with this name",
                }
            ),
            400,
        )
    
    if current_password is None or new_password is None:
        return jsonify({"msg": "Both currentpassword and newpassword are required"}), 400



    passwordHash = (
        db.session.execute(
            db.select(models.User).where(models.User.username == username)
        )
        .first()[0]
        .passwordHash
    )

    if check_password_hash(passwordHash, current_password):
        
        


        passwordHash = generate_password_hash(new_password)

        try:
            db.session.execute(
                db.update(models.User)
                .where(models.User.username == username)
                .values(passwordHash=passwordHash)
            )
            db.session.commit()
            return jsonify({"msg": "Password updated successfully!"}), 200
            
        except Exception as e:
            return jsonify({"msg": str(e)}), 500
    else:
        return (
        jsonify({"msg": "Invalid credentials"}),
        401,
    )


@users.route("/listscore", methods=["GET"])
def list_users_score():
    page = int(request.args.get("page", 0))
    if page < 1:
        page = 1

    try:
        users = db.paginate(
            db.select(models.User).order_by(models.User.totalScore.desc()),
            page=page,
            per_page=20,
        )

        return (
            jsonify(
                {
                    "total": users.total,
                    "page": users.page,
                    "per_page": 20,
                    "has_prev": users.has_prev,
                    "has_next": users.has_next,
                    "results": [{"username": item.username, "score": item.totalScore} for item in users.items],
                }
            ),
            200,
        )
    except werkzeug.exceptions.NotFound:
        return (
            jsonify({"msg": "Page does not exist"}),
            404,
        )
    except Exception as e:
        return (
            jsonify({"msg": str(e)}),
            500,
        )
    
   