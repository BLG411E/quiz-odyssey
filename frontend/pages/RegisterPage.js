import React, { useState, useContext } from 'react';
import { Text, TextInput, KeyboardAvoidingView, Alert, View, SafeAreaView } from 'react-native';

import DismissKeyboard from '../components/DismissKeyboard';
import BlueButton from '../components/BlueButton';
import styles from '../styles';
import AuthContext from '../utils/AuthContext';


const RegisterPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [registerPressed, setRegisterPressed] = useState(false);

    const { SignUp } = useContext(AuthContext);

    const validate = () => {
        setUsernameValid(username.length > 0);
        setPasswordValid(password.length > 0);
        setEmailValid(email.length != 0 && (String(email).toLowerCase().match(
            /^[_A-Za-z0-9-]+(.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9-]+)*(.[A-Za-z]{2,4})$/
        )));

        return usernameValid && passwordValid && password == retypePassword && emailValid;
    }

    return (
        <DismissKeyboard>
            <View style={styles.containerCenter}>
                <KeyboardAvoidingView behavior="position">
                    <Text style={styles.titleText}>Register</Text>
                    <Text style={styles.baseText}>Email</Text>
                    <TextInput style={[styles.inputText, emailValid ? styles.inputValid : styles.inputInvalid]} placeholder='john.doe@example.com' value={email} onChangeText={setEmail} inputMode='email' autoComplete='email' autoCapitalize='none'></TextInput>
                    <Text style={styles.baseText}>Username</Text>
                    <TextInput style={[styles.inputText, usernameValid ? styles.inputValid : styles.inputInvalid]} placeholder='JohnDoe12' value={username} onChangeText={setUsername} autoComplete='username' autoCapitalize='none'></TextInput>
                    <Text style={styles.baseText}>Password</Text>
                    <TextInput style={[styles.inputText, passwordValid ? styles.inputValid : styles.inputInvalid]} placeholder='***************' value={password} onChangeText={setPassword} secureTextEntry={true} autoComplete='current-password'></TextInput>
                    <Text style={styles.baseText}>Confirm Password</Text>
                    <TextInput style={[styles.inputText, (password == retypePassword || (retypePassword.length == 0 && !registerPressed)) ? styles.inputValid : styles.inputInvalid]} placeholder='***************' value={retypePassword} onChangeText={setRetypePassword} secureTextEntry={true} autoComplete='current-password'></TextInput>
                    <BlueButton style={{ "marginTop": 10, }} text="REGISTER" onPress={() => {
                        setRegisterPressed(true);
                        if (validate()) {
                            SignUp({ email, username, password })
                        } else { null }
                    }} />
                    <View style={{ justifyContent: "center", marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.baseText}>Already have an account? </Text>
                        <Text style={styles.link} onPress={() => {
                            navigation.navigate('LoginPage');
                        }}>
                            Login
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </DismissKeyboard>
    )
};

export default RegisterPage;