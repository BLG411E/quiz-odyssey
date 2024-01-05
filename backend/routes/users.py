import datetime

import werkzeug
from flask import Blueprint, jsonify, request, current_app
from werkzeug.security import check_password_hash, generate_password_hash

from .. import models
from ..authutils import require_token, require_admin
from ..extensions import db
import jwt
from ..authutils import get_userID, require_token

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
    
@users.route("/daily_quiz_finished", methods=["GET"])
@require_token
def is_daily_quiz_finsihed(username):
    user_id = get_userID(db, username)
    try:
        obtainedTime = db.session.execute(
            db.select(
                models.Score.obtainedAt,
            ).where(models.Score.user == user_id)
            .where(models.Score.category == 1)
            .where(models.Score.obtainedAt >= datetime.date.today())
        ).first()
        if obtainedTime is None:  
            return (
                jsonify(
                    {
                        "isFinished": False,
                    }
                ),
                200,
            )
        else:
            return (
                jsonify(
                    {
                        "isFinished": True,
                        "timeFinished": obtainedTime[0],
                    }
                ),
                200,
            )

    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    
@users.route("/staffinfo", methods=["GET"])
@require_token
def get_staff_information(username):
    try:
        staff_member = db.session.execute(
            db.select(
                models.Staff.username,
                models.Staff.hasAdminPriveleges,
            ).where(models.Staff.username == username)
        ).first()
        return (
            jsonify(
                {
                    "username": staff_member[0],
                    "hasAdminPriveleges": staff_member[1],
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
    
@users.route("/upgradeuser/<username>", methods=["POST"])
@require_admin
def upgrade_user_to_moderator(admin, isAdmin, username):
    user_info = models.User.query.filter_by(username=username).first()
    moderator = models.Staff(
        username=user_info.username,
        passwordHash=user_info.passwordHash,
        hasAdminPriveleges=False
    )

    try:
        db.session.add(moderator)
        db.session.commit()
        return jsonify({"msg": "User upgraded successfully!"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    

@users.route("/downgrade/<moderator_username>", methods=["DELETE"])
@require_admin
def downgradeuser(admin, isAdmin, moderator_username):
    try:
        moderator = db.session.execute(
            db.select(models.Staff).where(
                models.Staff.username == moderator_username,
                models.Staff.hasAdminPriveleges == False,
            )
        ).first()

        if moderator is None:
            return (
                jsonify({"msg": "Invalid User ID"}),
                400,
            )

    except Exception as e:
        return (
            jsonify({"msg": str(e)}),
            500,
        )

    try:
        db.session.execute(db.delete(models.Staff).where(models.Staff.username == moderator_username))
        db.session.commit()
        return jsonify({"msg": "User downgraded successfully!"}), 200
    except Exception as e:
        return jsonify({"msg": str(e)}), 500


@users.route("/ismoderator", methods=["GET"])
@require_admin
def is_moderator(username):
    try:
        moderator = db.session.execute(
            db.select(models.Staff).where(models.Staff.username == username, models.Staff.hasAdminPriveleges == False)
        ).first()

        if moderator is None:
            return jsonify({"isModerator": False})

        return jsonify({"isModerator": True}), 200
    except Exception as e:
        return (
            jsonify({"msg": str(e)}),
            500,
        )

@users.route("/listmoderators", methods=["GET"])
@require_admin
def list_moderators(username, isAdmin):
    page = int(request.args.get("page", 0))
    if page < 1:
        page = 1

    try:
        moderators = db.paginate(
            db.select(models.Staff).where(models.Staff.hasAdminPriveleges == False).order_by(models.Staff.username.asc()),
            page=page,
            per_page=200,
        )
        return (
            jsonify(
                {
                    "total": moderators.total,
                    "page": moderators.page,
                    "per_page": 200,
                    "has_prev": moderators.has_prev,
                    "has_next": moderators.has_next,
                    "results": [item.to_dict() for item in moderators.items],
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
