import socketio
import jwt
from sqlalchemy.sql import func

from ..extensions import db
from .. import models


class QuizSession(socketio.Namespace):
    def __init__(self, app, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.app = app

    def on_connect(self, sid, environ, auth):
        if auth is None or auth.get("Token", None) is None:
            raise socketio.exceptions.ConnectionRefusedError("Token is required!")
        token = auth["Token"]

        try:
            tokenData = jwt.decode(token, self.app.secret_key, algorithms=["HS256"])
        except Exception as e:
            raise socketio.exceptions.ConnectionRefusedError("Invalid token!")

        # print(f"New session with {tokenData['username']}, sid={sid}")
        with self.session(sid) as session:
            session["username"] = tokenData["username"]

    # def on_disconnect(self, sid):
    # print(f"Session ended, sid={sid}")

    def on_start(self, sid, data):
        # print("Starting quiz")
        with self.session(sid) as session:
            if session.get("questions", None) is not None:
                return

        category = data.get("category", None)
        question_count = data.get("question_count", 10)
        if question_count > 25:
            question_count = 25

        if category is None:
            self.emit("error", {"message": "Category is required!"}, room=sid)
        # print(f"Starting quiz with category={category}, sid={sid}")

        with self.app.app_context():
            # category_id = db.select(models.Category.id).where(models.Category.name == category).scalar_subquery()
            questions = db.session.execute(
                db.select(
                    models.Question.text,
                    models.Question.option1,
                    models.Question.option2,
                    models.Question.option3,
                    models.Question.option4,
                    models.Question.correctAnswer,
                )
                .where(models.Question.category == category)
                .order_by(func.random())
                .limit(question_count)
            ).fetchall()

        with self.session(sid) as session:
            session["category"] = category
            session["questions"] = questions
            session["question_count"] = question_count
            session["next_question"] = 1
            session["score"] = 0

        self.emit(
            "new_question",
            {"text": questions[0][0], "options": questions[0][1:5]},
            room=sid,
        )

    def on_answer(self, sid, data):
        # print(f"Answer received: {data['answer']}, sid={sid}")

        try:
            with self.session(sid) as session:
                next_question = session["next_question"]
                question_count = session["question_count"]
                questions = session["questions"]
                category = session["category"]
                score = session["score"]
        except KeyError:
            self.emit("error", {"message": "No quiz started!"}, room=sid)
            return

        if next_question - 1 > question_count:
            return

        if questions[next_question - 1][5] == data["answer"]:
            score += 1

        with self.session(sid) as session:
            session["score"] = score

        if next_question < question_count:
            self.emit(
                "result",
                {
                    "correct_answer": questions[next_question - 1][5],
                    "score": score,
                },
                room=sid,
            )
        else:
            # print(f"Quiz ended with score {score}, sid={sid}")
            with self.app.app_context():
                user_id = (
                    db.select(models.User.id)
                    .where(models.User.username == session["username"])
                    .scalar_subquery()
                )
                db.session.add(
                    models.Score(
                        user=user_id,
                        category=category,
                        score=score,
                    )
                )
                db.session.execute(
                    db.update(models.User)
                    .where(models.User.username == session["username"])
                    .values(totalScore=models.User.totalScore + score)
                )
                db.session.commit()

            self.emit(
                "result",
                {
                    "correct_answer": questions[next_question - 1][5],
                    "score": score,
                },
                room=sid,
            )

            self.emit(
                "end", {"score": score, "question_count": question_count}, room=sid
            )

    def on_next_question(self, sid):
        # print(f"Next question requested, sid={sid}")
        try:
            with self.session(sid) as session:
                next_question = session["next_question"]
                questions = session["questions"]

                if next_question == len(questions):
                    return
                else:
                    session["next_question"] = session["next_question"] + 1
        except KeyError:
            self.emit("error", {"message": "No quiz started!"}, room=sid)
            return

        # print(f"Sending question {questions[next_question][0]}, sid={sid}")
        self.emit(
            "new_question",
            {
                "text": questions[next_question][0],
                "options": questions[next_question][1:5],
            },
            room=sid,
        )
