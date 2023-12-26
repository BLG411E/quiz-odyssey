import datetime

import werkzeug
from flask import Blueprint, jsonify, request

from .. import models
from ..authutils import require_admin
from ..extensions import db

users = Blueprint("users", __name__)


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