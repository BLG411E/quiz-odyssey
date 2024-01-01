import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from './AuthContext';

const AddPointsToUserSCore = async (token, pointsToAdd, categoryID) => {
    try {
        const response = await fetch(
            `${API_URL}/score/addPoints`,
            {
                method: 'PUT',
                headers: {
                    "Token": token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pointsToAdd: pointsToAdd,
                    categoryID: categoryID,
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

export default AddPointsToUserSCore;