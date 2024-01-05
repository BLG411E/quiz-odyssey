import { Alert } from 'react-native';
import { API_URL } from './AuthContext';

const IsDailyQuizCompleted = async (token) => {
    try {
        const response = await fetch(
            `${API_URL}/users/daily_quiz_finished`,
            {
                method: 'GET',
                headers: {
                    "Token": token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );

        const json = await response.json();
        

        

        if (response.status !== 200) {
            Alert.alert('Error', json.msg);
            return null;
        }

        return json;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export default IsDailyQuizCompleted;
