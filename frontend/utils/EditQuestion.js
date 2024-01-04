import { Alert } from "react-native";
import { API_URL } from "./AuthContext";

const EditQuestion = async (questionID, questionText,
    option1, option2, option3, option4,
    correctAnswer, explanation, difficulty, isValid) => {
    try {
        const response = await fetch(`${API_URL}/question/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionID: questionID,
                questionText: questionText,
                option1: option1,
                option2: option2,
                option3: option3,
                option4: option4,
                correctAnswer: correctAnswer,
                explanation: explanation,
                difficulty: difficulty,
                isValid: isValid
            })
        });

        if (!response.ok) {
            throw new Error('Failed to edit question');
        }

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default EditQuestion;
