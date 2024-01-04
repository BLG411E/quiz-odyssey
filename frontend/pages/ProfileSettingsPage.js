import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import GetUserInfo from '../utils/GetUserInfo';
import { SafeAreaView } from "react-native-safe-area-context";


const ProfileSettingsPage = ({ navigation, route }) => {
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
                        setUsername(data["username"]);
                        setEmail(data["email"]);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                    <Icon.Button backgroundColor="rgba(0,0,0,0)" name="chevron-back-outline" size={30} color="white" iconStyle={{marginRight: 0}} onPress={() => {
                            navigation.navigate('ProfilePage');
                    }}/>

                    <Text style={styles.profileHeaderText}>{"Settings"}</Text>
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
                    bottom: 0, // Adjust this value as needed
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', }}>{"Delete account"}</Text>
                </View>
            </View>
        </SafeAreaView>
        <SafeAreaView style={{flex:0, backgroundColor: "#3e4c5e"}} edges={['right', 'bottom', 'left']}></SafeAreaView>
        </>
    )
};

export default ProfileSettingsPage;
