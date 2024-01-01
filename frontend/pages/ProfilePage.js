import React, { useContext, useState, useEffect } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import { Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, View, Pressable, Image } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import GetUserInfo from '../utils/GetUserInfo';



const ProfilePage = ({ navigation, route }) => {
    const { Logout, onPress, title = 'Save' } = useContext(AuthContext);


    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const { token } = route.params

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (token) {
                    // Use the token to fetch user data
                    const data = await GetUserInfo(token);


                    if (data) {
                        // Handle the user data
                        setUserData(data);
                        setUsername(data["username"]);
                        setEmail(data["email"]);
                    }
                }
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                    <TouchableOpacity hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }} onPress={() => {
                        navigation.navigate('MainPage');
                    }}>
                        <Icon name="chevron-back-outline" size={30} color="white" onPress={() => {
                            navigation.navigate('MainPage');
                        }} />

                    </TouchableOpacity>

                    <Text style={styles.profileHeaderText}>{"Profile"}</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('../assets/profileicon2.png')} style={styles.profileSettingsImage} />
                </View>

                <View style={styles.settingsPageTitleRow}>
                    <Text style={{ color: 'white', }}>{"PROFILE"}</Text>
                </View>

                <View style={styles.settingsPageContentRow}>
                    <Text style={{ color: 'black', fontWeight: 'bold', }}>{"Username"}</Text>
                    <Text style={{ color: 'black', }}>{username}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.settingsPageContentRow}>
                    <Text style={{ color: 'black', fontWeight: 'bold', }}>{"Email"}</Text>
                    <Text style={{ color: 'black', }}>{email}</Text>
                </View>

                <View style={styles.settingsPageTitleRow}>
                    <Text style={{ color: 'white', }}>{"ACCOUNT"}</Text>
                </View>

                <TouchableOpacity style={styles.settingsPageChangeContentRow} onPress={() => {
                    navigation.navigate('ProfileChangePage', { type: "username", token: token });
                }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', }}>{"Change username"}</Text>
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.settingsPageChangeContentRow} onPress={() => {
                    navigation.navigate('ProfileChangePage', { type: "password", token: token });
                }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', }}>{"Change password"}</Text>
                </TouchableOpacity>

                <View style={{
                    backgroundColor: '#fd564d', // Customize the background color
                    padding: 10,
                    position: 'absolute',
                    bottom: 40, // Adjust this value as needed
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', }}>{"Delete account"}</Text>
                </View>







            </View>





        </View>

    )
};

export default ProfilePage;
{/* <BlueButton onPress={() => { Logout(); }} Text="LOGOUT"  />  */ }