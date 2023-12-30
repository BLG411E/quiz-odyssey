import { Alert } from 'react-native';
import { API_URL } from './AuthContext';

const GetCategories = async () =>{
    let categories = [];
    try {
        let response = await fetch(API_URL + '/category/list', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        let json = await response.json();
        categories = json.map(category => [category.id, category.name, category.description]);
    } catch (error) {
        Alert.alert(error);
    }
    return categories;
}
export default GetCategories;






