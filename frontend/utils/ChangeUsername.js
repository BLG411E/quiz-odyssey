import { Alert } from 'react-native';
import { API_URL } from './AuthContext';

const ChangeUsername = async (token,new_username) => {
    try {
        const response = await fetch(
            `${API_URL}/users/updateusername`,
            {
                method: 'PUT',
                headers: {
                    "Token": token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newusername: new_username
                    
                }),
            }
        );
        const json = await response.json();

        if (response.status != 200) {
            Alert.alert('Error', `${json.msg}`);
        } else {
            Alert.alert('Username updated successfully');
        }
    } catch (error) {
        console.error(error);
    }
    return null;
};

export default ChangeUsername;
