import datetime
import werkzeug

from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from .. import models
from ..authutils import get_userID, get_staffID, require_token, require_moderator
from ..extensions import db

score = Blueprint("score", __name__)
@score.route("/addPoints", methods=["PUT"])
@require_token
def add_points(username):
    try: 
        request_parameters = request.get_json()
        points_to_add = request_parameters["pointsToAdd"]
        category_id = request_parameters["categoryID"]

        user_id = get_userID(db, username)
        if user_id is None:
            return jsonify({"msg": "User not found"}), 404
        
        db.session.execute(
            db.update(models.User).where(models.User.id == user_id).values(
                totalScore=models.User.totalScore + points_to_add
            )
        )
        
        db.session.execute(
            db.insert(models.Score),
            [
                {
                    "user": user_id,
                    "score": points_to_add,
                    "category": category_id,
                }
            ],
        )
        db.session.commit()
        
        return jsonify({"msg": "Points added successfully"}), 200

    except Exception as e:
        return jsonify({"msg": str(e)}), 500