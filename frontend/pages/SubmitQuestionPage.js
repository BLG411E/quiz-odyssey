import React, { useContext, useState } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import { Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, View, Pressable, Image } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';



const SubmitQuestionPage = ({ route, navigation }) => {

    const { Logout, onPress, title = 'Save' } = useContext(AuthContext);


    const handleSubmit = () => {
        // Implement your save logic here based on the type and newValue
        // For example, you can make an API call to update the username or password

    };


    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <TouchableOpacity hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }} onPress={() => {
                    navigation.navigate('MainPage');
                }}>
                    <Icon name="chevron-back-outline" size={30} color="white" onPress={() => {
                        navigation.navigate('MainPage');
                    }} />

                </TouchableOpacity>

                <Text style={styles.profileHeaderText}>{"Submit a question"}</Text>
            </View>






        </View>

    )
};

export default SubmitQuestionPage;
