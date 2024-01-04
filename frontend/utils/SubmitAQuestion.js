import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from './AuthContext';

const SubmitAQuestion = async (token, data) => {
    try {
        console.log(data.category);
        const response = await fetch(
            `${API_URL}/question/submit`,
            {
                method: 'POST',
                headers: {
                    "Token": token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: data.category,
                    text: data.questionText,
                    option1: data.answers[0],
                    option2: data.answers[1],
                    option3: data.answers[2],
                    option4: data.answers[3],
                    correctAnswer: data.correctAnswerIndex,
                    explanation: data.explanation,
                    difficulty: data.difficulty
                }),
            }
        );
        const json = await response.json();
        return json;

    } catch (error) {
        console.error(error);
    }
    return null;
};

export default SubmitAQuestion;