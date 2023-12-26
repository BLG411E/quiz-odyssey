import datetime

import werkzeug
from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from .. import models
from ..authutils import (
    get_staffID,
    get_userID,
    require_admin,
    require_moderator,
    require_token,
)
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
