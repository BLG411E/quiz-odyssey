import React, { useContext, useState } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import { Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, View, Pressable, Image } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';

import ChangeUsername from '../utils/ChangeUsername';
import ChangePassword from "../utils/ChangePassword";

const ProfileChangePage = ({ route, navigation }) => {
    const [username, setUsername] = useState('');
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [retype_password, setRetypePassword] = useState('');
    const { Logout, onPress, title = 'Save' } = useContext(AuthContext);
    const { type, token } = route.params
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const handleSave = () => {

       
        if(type=='username'){
            changeusername()
        }
        else{
            changepassword()
        }


    };

    const validate = () => {
        setUsernameValid(username.length > 0);
        setPasswordValid(new_password.length > 0);
        setEmailValid(email.length != 0 && (String(email).toLowerCase().match(
            /^[_A-Za-z0-9-]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9-]+)*(.[A-Za-z]{2,4})$/
        )));

        return usernameValid && passwordValid && new_password == retypePassword && emailValid;
    }
    const changeusername =async () => {
        try {
            

            if (token) {
                const data = await ChangeUsername(token, username);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const changepassword =async () => {

        try {
            if (token) {
                const data = await ChangePassword(token,old_password, new_password);
                
                
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        

    };

    return (
        <View style={styles.container}>
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


        </View>

    )
};

export default ProfileChangePage;
{/* <BlueButton onPress={() => { Logout(); }} Text="LOGOUT"  />  */ }