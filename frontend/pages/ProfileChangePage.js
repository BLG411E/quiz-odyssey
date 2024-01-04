import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BlueButton from "../components/BlueButton";
import styles from '../styles';

import ChangePassword from "../utils/ChangePassword";
import ChangeUsername from '../utils/ChangeUsername';
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileChangePage = ({ route, navigation }) => {
    const [username, setUsername] = useState('');
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [retype_password, setRetypePassword] = useState('');
    const { type, token } = route.params
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const handleSave = () => {       
        if(type === 'username'){
            if (username.length > 0) {
                setUsernameValid(true);
                changeusername();
            }
            else {
                setUsernameValid(false);
            }
        }
        else{
            if(new_password.length > 0 && new_password === retype_password){
                setPasswordValid(true);
                changepassword();
            }
            else{
                setPasswordValid(false);
                Alert.alert('Error', 'Invalid password');
            }   
        }
    };
    const changeusername = async () => {
        try {
            if (token) {
                await ChangeUsername(token, username);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const changepassword = async () => {
        try {
            if (token) {
                await ChangePassword(token,old_password, new_password);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                    <TouchableOpacity hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }} onPress={() => {
                        navigation.navigate('ProfileSettingsPage');
                    }}>
                        <Icon name="chevron-back-outline" size={30} color="white" hitSlop={{ top: 100, bottom: 100, left: 100, right: 100 }} onPress={() => {
                            navigation.navigate('ProfileSettingsPage');
                        }} />

                    </TouchableOpacity>

                    <Text style={styles.profileHeaderText}>{"Change " + type}</Text>
                </View>

                {type === 'password' ? (
                    // Change Password Window
                    <View style={{ paddingTop: 20, flex: 1, alignItems: 'center' }}>
                        <TextInput style={[styles.inputText, passwordValid ? styles.inputValid : styles.inputInvalid]} placeholder='current password' value={old_password} onChangeText={setOldPassword} secureTextEntry={true} ></TextInput>
                        <TextInput style={[styles.inputText, passwordValid ? styles.inputValid : styles.inputInvalid]} placeholder='new password' value={new_password} onChangeText={setNewPassword} secureTextEntry={true} ></TextInput>
                        <TextInput style={[styles.inputText, passwordValid ? styles.inputValid : styles.inputInvalid]} placeholder='retype new password' value={retype_password} onChangeText={setRetypePassword} secureTextEntry={true} ></TextInput>
                        <BlueButton onPress={handleSave} text="Save" />
                    </View>
                ) : (
                    // Change Username Window
                    <View style={{ paddingTop: 20, flex: 1, alignItems: 'center' }}>
                        <TextInput style={[styles.inputText, usernameValid ? styles.inputValid : styles.inputInvalid]} placeholder='Enter new username' value={username} onChangeText={setUsername} autoComplete='username' autoCapitalize='none'></TextInput>
                        <BlueButton onPress={handleSave} text="Save" />
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
};

export default ProfileChangePage;
