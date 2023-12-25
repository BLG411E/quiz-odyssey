import werkzeug
from flask import Blueprint, jsonify, request
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


@social.route("/follow/<follow_username>", methods=["DELETE"])
@require_token
def unfollow(username, follow_username):
    user_id = get_userID(db, username)
    follow_id = get_userID(db, follow_username)

    if follow_id is None:
        return jsonify({"msg": "User does not exist"}), 404

    follow = db.session.execute(
        db.delete(models.Follow)
        .where(models.Follow.follower == user_id)
        .where(models.Follow.followed == follow_id)
    )

    if follow.rowcount == 0:
        return jsonify({"msg": "Not following user"}), 404

    db.session.commit()

    return jsonify({"msg": "Unfollowed successfully"}), 200


@social.route("/followers", methods=["GET"])
@require_token
def followers(username):
    page = int(request.args.get("page", 1))
    if page < 1:
        page = 1

    user_id = get_userID(db, username)

    try:
        followers = db.paginate(
            db.select(models.User.username)
            .join(models.Follow, models.User.id == models.Follow.follower)
            .where(models.Follow.followed == user_id)
            .order_by(models.User.username),
            page=page,
            per_page=20,
        )
        return (
            jsonify(
                {
                    "total": followers.total,
                    "page": followers.page,
                    "per_page": 20,
                    "has_prev": followers.has_prev,
                    "has_next": followers.has_next,
                    "results": followers.items,
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


@social.route("/followers/<follower_username>", methods=["DELETE"])
@require_token
def remove_follower(username, follower_username):
    user_id = get_userID(db, username)
    follow_id = get_userID(db, follower_username)

    if follow_id is None:
        return jsonify({"msg": "User does not exist"}), 404

    follow = db.session.execute(
        db.delete(models.Follow)
        .where(models.Follow.follower == follow_id)
        .where(models.Follow.followed == user_id)
    )

    if follow.rowcount == 0:
        return jsonify({"msg": "Not followed by user"}), 404

    db.session.commit()

    return jsonify({"msg": "Removed follower successfully"}), 200


@social.route("/following", methods=["GET"])
@require_token
def following(username):
    page = int(request.args.get("page", 1))
    if page < 1:
        page = 1

    user_id = get_userID(db, username)

    try:
        following = db.paginate(
            db.select(models.User.username)
            .join(models.Follow, models.User.id == models.Follow.followed)
            .where(models.Follow.follower == user_id)
            .order_by(models.User.username),
            page=page,
            per_page=20,
        )
        return (
            jsonify(
                {
                    "total": following.total,
                    "page": following.page,
                    "per_page": 20,
                    "has_prev": following.has_prev,
                    "has_next": following.has_next,
                    "results": following.items,
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
