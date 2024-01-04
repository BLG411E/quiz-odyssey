import { Alert } from 'react-native';
import { API_URL } from './AuthContext';

const ChangePassword = async (token,old_password,new_password) => {
    try {
        const response = await fetch(
            `${API_URL}/users/updatepassword`,
            {
                method: 'PUT',
                headers: {
                    "Token": token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newpassword: new_password,
                    oldpassword: old_password 
                }),
            }
        );

        const json = await response.json();
        if (response.status != 200) {
            Alert.alert('Error', `${json.msg}`);
        }
        else{
            Alert.alert('Password updated successfully');
        }
    } catch (error) {
        console.error(error);
    }
    return null;
};

export default ChangePassword;
