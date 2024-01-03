import os

from sqlalchemy import create_engine, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import sessionmaker

from .models import Category, Question, Staff, User

engine = create_engine(os.getenv("QUIZODYSSEY_DATABASE_URI"))
Session = sessionmaker(bind=engine)
session = Session()


def insert_questions():
    file_path = os.path.join(os.path.dirname(__file__), "music")
    file_path2 = os.path.join(os.path.dirname(__file__), "movies")

    category_mapping = {
        "music": Category(name="Music"),  # Map file names to categories
        "movies": Category(name="Movies"),
    }

    session.add_all(category_mapping.values())

    for category in category_mapping.values():
        try:
            session.add(category)
            session.commit()
        except IntegrityError:
            session.rollback()

    categories = session.execute(select(Category)).fetchall()
    category_mapping = {
        category[0].name.lower(): category[0] for category in categories
    }

    # Create a dummy staff member and user to use for adding and approving questions
    automation_staff = session.execute(
        select(Staff.id).where(Staff.username == "automation")
    ).fetchone()
    if not automation_staff:
        automation_staff = Staff(username="automation", passwordHash="INVALID")
        session.add(automation_staff)
        session.commit()
        session.refresh(automation_staff)
        automation_staff = automation_staff.id
    else:
        automation_staff = automation_staff[0]

    automation_user = session.execute(
        select(User.id).where(User.username == "automation")
    ).fetchone()
    if not automation_user:
        automation_user = User(
            username="automation",
            passwordHash="INVALID",
            email="automation@quizodyssey.com",
        )
        session.add(automation_user)
        session.commit()
        session.refresh(automation_user)
        automation_user = automation_user.id
    else:
        automation_user = automation_user[0]

    lines_to_read = 141
    lines_read = 0
    questions = []
    current_question = None

    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            if lines_read >= lines_to_read:
                break

            line = line.strip()
            if line.startswith("#Q"):
                if current_question:
                    questions.append(current_question)
                current_question = {"text": line[3:].strip()}
            elif line.startswith("^"):
                current_question["correctAnswer"] = line[2:]
            elif line.startswith("A "):
                current_question["option1"] = line[2:]
            elif line.startswith("B "):
                current_question["option2"] = line[2:]
            elif line.startswith("C "):
                current_question["option3"] = line[2:]
            elif line.startswith("D "):
                current_question["option4"] = line[2:]

            lines_read += 1

    for question_data in questions:
        _, file_name = os.path.split(
            file_path
        )  # Extract the file name or use it directly if already available
        category_id = category_mapping.get(
            file_name
        ).id  # Get category ID from the mapping

        correctAnswer = question_data["correctAnswer"]
        if correctAnswer == question_data["option1"]:
            correctAnswer = 1
        elif correctAnswer == question_data["option2"]:
            correctAnswer = 2
        elif correctAnswer == question_data["option3"]:
            correctAnswer = 3
        elif correctAnswer == question_data["option4"]:
            correctAnswer = 4

        new_question = Question(
            text=question_data["text"],
            option1=question_data["option1"],
            option2=question_data["option2"],
            option3=question_data["option3"],
            option4=question_data["option4"],
            correctAnswer=correctAnswer,
            addedBy=automation_user,
            category=category_id,
            isValid=True,  # Assuming all parsed questions are considered valid
            approvedBy=automation_staff,
            explanation="Explanation text",  # Replace with the explanation for the question
            difficulty=1,  # Replace with the difficulty level of the question
        )
        session.add(new_question)
        session.commit()

    with open(file_path2, "r", encoding="latin-1") as file:
        for line in file:
            if lines_read >= lines_to_read:
                break

            line = line.strip()
            if line.startswith("#Q"):
                if current_question:
                    questions.append(current_question)
                current_question = {"text": line[3:].strip()}
            elif line.startswith("^"):
                current_question["correctAnswer"] = line[2:]
            elif line.startswith("A "):
                current_question["option1"] = line[2:]
            elif line.startswith("B "):
                current_question["option2"] = line[2:]
            elif line.startswith("C "):
                current_question["option3"] = line[2:]
            elif line.startswith("D "):
                current_question["option4"] = line[2:]

            lines_read += 1

    for question_data in questions:
        _, file_name = os.path.split(
            file_path2
        )  # Extract the file name or use it directly if already available
        category_id = category_mapping.get(
            file_name
        ).id  # Get category ID from the mapping

        correctAnswer = question_data["correctAnswer"]
        if correctAnswer == question_data["option1"]:
            correctAnswer = 1
        elif correctAnswer == question_data["option2"]:
            correctAnswer = 2
        elif correctAnswer == question_data["option3"]:
            correctAnswer = 3
        elif correctAnswer == question_data["option4"]:
            correctAnswer = 4

        new_question = Question(
            text=question_data["text"],
            option1=question_data["option1"],
            option2=question_data["option2"],
            option3=question_data["option3"],
            option4=question_data["option4"],
            correctAnswer=correctAnswer,
            addedBy=automation_user,
            category=category_id,
            isValid=True,  # Assuming all parsed questions are considered valid
            approvedBy=automation_staff,
            explanation="Explanation text",  # Replace with the explanation for the question
            difficulty=1,  # Replace with the difficulty level of the question
        )
        session.add(new_question)
        session.commit()


session.close()
