import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from './AuthContext';

const Login = async (data) => {
    try {
        const response = await fetch(
            API_URL + '/auth/login',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                }),
            }
        );
        const json = await response.json();
        if (response.status != 200) {
            Alert.alert('Error', `${json.msg}`);
        } else {
            await SecureStore.setItemAsync('token', json.token);
            return json.token;
        }
    } catch (error) {
        console.error(error);
    }
    return null;
};

export default Login;
