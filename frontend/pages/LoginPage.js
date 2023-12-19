import React, { useState, useContext } from 'react';
import { Text, TextInput, KeyboardAvoidingView, Alert, View } from 'react-native';

import DismissKeyboard from '../components/DismissKeyboard';
import BlueButton from '../components/BlueButton';
import styles from '../styles';
import AuthContext from '../utils/AuthContext';


const LoginPage = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);

    const { SignIn } = useContext(AuthContext);

    const validate = () => {
        setUsernameValid(username.length > 0);
        setPasswordValid(password.length > 0);

        return usernameValid && passwordValid;
    }

    return (
        <DismissKeyboard>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="-200" style={styles.containerCenter}>
                <Text style={styles.titleText}>Login</Text>
                <Text style={styles.baseText}>Username</Text>
                <TextInput style={[styles.inputText, usernameValid ? styles.inputValid : styles.inputInvalid]} placeholder='JohnDoe12' value={username} onChangeText={setUsername} autoComplete='username'></TextInput>
                <Text style={styles.baseText}>Password</Text>
                <TextInput style={[styles.inputText, passwordValid ? styles.inputValid : styles.inputInvalid]} placeholder='***************' value={password} onChangeText={setPassword} autoComplete='current-password' secureTextEntry={true}></TextInput>
                <BlueButton style={{ "marginTop": 10, }} text="LOGIN" onPress={() => {
                    if (validate()) {
                        SignIn({ username, password })
                    } else { null }
                }} />
                <View style={{ justifyContent: "center", marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.baseText}>Don't have an account? </Text>
                    <Text style={styles.link} onPress={() => {
                        navigation.navigate('RegisterPage');
                    }}>
                        Sign Up
                    </Text>
                </View>
            </KeyboardAvoidingView>
        </DismissKeyboard>
    )
};

export default LoginPage;