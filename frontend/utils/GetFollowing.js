import { Alert } from 'react-native';
import { API_URL } from './AuthContext';

const GetFollowing = async (token, username=null) =>{
    let categories = [];
    try {
        let response = await fetch(API_URL + `/social/following${username ? `/${username}` : ''}`, {
            method: 'GET',
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
    return categories;
}
export default GetFollowing;
