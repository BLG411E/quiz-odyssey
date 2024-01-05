import { Alert } from 'react-native';
import { API_URL } from './AuthContext';

const GetAllUserScoreData = async (token) => {
    try {
        const response = await fetch(
            `${API_URL}/users/listscore`,
            {
                method: 'GET',
                headers: {
                    "Token": token,
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

export default GetAllUserScoreData;
