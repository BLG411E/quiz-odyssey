from flask import Blueprint, jsonify
from sqlalchemy.exc import IntegrityError

from .. import models
from ..authutils import get_userID, require_token
from ..extensions import db

social = Blueprint("social", __name__)


@social.route("/follow/<follow_username>", methods=["POST"])
@require_token
def follow(username, follow_username):
    user_id = get_userID(db, username)
    follow_id = get_userID(db, follow_username)
    
    if follow_id is None:
        return jsonify({"msg": "User does not exist"}), 404
    
    follow = models.Follow(
        follower=user_id,
        followed=follow_id,
    )
    db.session.add(follow)
    
    try:
        db.session.commit()
    except IntegrityError as e:
        errmsg = e.orig.args[0]
        if "Follow_follower_followed_key" in errmsg:
            return jsonify({"msg": "Already following"}), 400
        elif "Follow_check" in errmsg:
            return jsonify({"msg": "Cannot follow yourself"}), 400
        else:
            return jsonify({"msg": errmsg}), 500

    return jsonify({"msg": "Followed successfully"}), 200