import { API_URL } from './AuthContext';
import { Alert } from 'react-native';

const FollowUser = async (token, username) => {
    try {
        let response = await fetch(API_URL + '/social/follow/' + username, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Token": token,
            },
        });
        const json = await response.json();

        if (response.status !== 200) {
            Alert.alert('Error', json.msg);
            return null;
        }

        return json;
        
    } catch (error) {
        Alert.alert(error);
    }
};

export default FollowUser;
