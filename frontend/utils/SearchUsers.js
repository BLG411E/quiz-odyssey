import { API_URL } from './AuthContext';

const SearchUsers = async (term) => {
    try {
        const response = await fetch(`${API_URL}/users/search?term=${term}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        
        const json = await response.json();

        if (response.status !== 200) {
            console.log('Error', json.msg);
            return null;
        }

        return json;
    }
    catch (error) {
        console.error('Error searching users:', error);
        return null;
    }
};

export default SearchUsers;
