import datetime

from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from .. import models
from ..authutils import get_userID, require_token
from ..extensions import db

question = Blueprint("question", __name__)


@question.route("/submit", methods=["POST"])
@require_token
def submit_question(username):
    if not request.is_json:
        return jsonify({"msg": "Expected JSON data"}), 400

    requestParameters = request.get_json()

    category = requestParameters.get("category", None)
    text = requestParameters.get("text", None)
    option1 = requestParameters.get("option1", None)
    option2 = requestParameters.get("option2", None)
    option3 = requestParameters.get("option3", None)
    option4 = requestParameters.get("option4", None)
    correctAnswer = requestParameters.get("correctAnswer", None)
    addedAt = datetime.datetime.now()
    addedBy = get_userID(db, username)
    explanation = requestParameters.get("explanation", None)
    difficulty = requestParameters.get("difficulty", None)

    if (
        not text
        or not category
        or not difficulty
        or not option1
        or not option2
        or not correctAnswer
        or not explanation
    ):
        # A question must have all of these fields (At least 2 options, a correct answer, an explanation, a difficulty, a category and a question text)
        return (
            jsonify(
                {
                    "msg": "Missing required parameters",
                }
            ),
            400,
        )

    try:
        questionID = db.session.execute(
            db.insert(models.Question).returning(models.Question.id),
            [
                {
                    "category": category,
                    "text": text,
                    "option1": option1,
                    "option2": option2,
                    "option3": option3,
                    "option4": option4,
                    "correctAnswer": correctAnswer,
                    "addedAt": addedAt,
                    "addedBy": addedBy,
                    "isValid": False,
                    "approvedBy": None,  # This is a nullable field
                    "explanation": explanation,
                    "difficulty": difficulty,
                }
            ],
        ).first()[0]
        db.session.commit()
        return jsonify({"id": questionID}), 200
    except IntegrityError:
        return (
            jsonify(
                {
                    "msg": "Invalid Category ID",
                }
            ),
            400,
        )
    except Exception as e:
        return jsonify({"msg": str(e)}), 500