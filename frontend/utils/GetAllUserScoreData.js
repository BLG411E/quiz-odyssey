import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from './AuthContext';

const GetAllUserScoreData = async () => {
    try {
        const response = await fetch(
            `${API_URL}/users/listscore`,
            {
                method: 'GET',
                headers: {
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