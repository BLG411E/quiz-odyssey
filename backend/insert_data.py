from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .models import Question
import os


engine = create_engine(os.getenv("QUIZODYSSEY_DATABASE_URI"))
Session = sessionmaker(bind=engine)
session = Session()

def insert_questions():
    file_path = os.path.join(os.path.dirname(__file__), 'music')

    category_mapping = {
        "music": 1,  # Map file names to category IDs
        "movies": 2,
    }        
    lines_to_read = 141
    lines_read = 0
    questions = []
    current_question = None

    with open(file_path, 'r', encoding='utf-8') as file:
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
        file_name = file_path  # Extract the file name or use it directly if already available
        category_id = category_mapping.get(file_name)  # Get category ID from the mapping

        new_question = Question(
            text=question_data["text"],
            option1=question_data["option1"],
            option2=question_data["option2"],
            option3=question_data["option3"],
            option4=question_data["option4"],
            correctAnswer=question_data["correctAnswer"],
            addedBy=1,  # Replace with the ID of the user who added the question
            category=category_id,
            isValid=True,  # Assuming all parsed questions are considered valid
            approvedBy=1,  # Replace with the ID of the staff member who approved the question
            explanation="Explanation text",  # Replace with the explanation for the question
            difficulty=3  # Replace with the difficulty level of the question
        )
        session.add(new_question)

session.commit()
session.close()