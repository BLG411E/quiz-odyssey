import datetime
import werkzeug

from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from .. import models
from ..authutils import get_userID, get_staffID, require_token, require_moderator
from ..extensions import db

category = Blueprint("category", __name__)


@category.route("/list", methods=["GET"])
def list_categories():
    # fetch all categories from database

    categories = db.session.query(models.Category).all()
    categories_list = [{"id": category.id, "name": category.name, "description": category.description}
                       for category in categories if category.name != "Daily"]
    return jsonify(categories_list)
