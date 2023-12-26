import React, { useState,useContext, useEffect } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import { Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, View, Pressable, Image,Parse  } from 'react-native';
import styles from '../styles';



const MainPage = ({navigation}) => {
    const [username, setUsername] = useState('');
    const { Logout, onPress, title = 'Save' } = useContext(AuthContext);


    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.headerButton} onPress={() => {
                            navigation.navigate('MainPage');
                        }}>
                <View style={styles.headerButtonContent}>
                    <Image source={require('../assets/dailychallenge.png')} style={styles.headerImage} />
                    <Text style={styles.headerButtonText}>{"Daily odyssey"}</Text>
                </View>

            </TouchableOpacity>

            <TouchableOpacity  style={styles.headerButton} onPress={() => {
                            navigation.navigate('ProfilePage');
                        }}>
                <View style={styles.headerButtonContent}>
                    <Text style={styles.headerButtonText}>{"Profile"}</Text>
                    <Image source={require('../assets/profileicon.png')} style={styles.headerImage} />
                    
                </View>
            </TouchableOpacity>
            </View>

            
            <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.headerButton} onPress={() => {
                            navigation.navigate('MainPage');
                        }}>
                <View style={styles.headerButtonContent}>
                    <Image source={require('../assets/stats.png')} style={styles.headerImage} />
                    <Text style={styles.headerButtonText}>{"Check your score!"}</Text>
                </View>

            </TouchableOpacity>

            <TouchableOpacity  style={styles.headerButton} onPress={() => {
                            navigation.navigate('ProfilePage');
                        }}>
                <View style={styles.headerButtonContent}>
                    <Text style={styles.headerButtonText}>{"Submit a question"}</Text>
                    <Image source={require('../assets/questionmark.png')} style={styles.headerImage} />
                    
                </View>
            </TouchableOpacity>
            </View>

            <View style={{ "paddingTop": 100, }}>

            <View style={styles.row}>
                <Pressable style={{
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        width:250,
        height:70,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#8ea4d2',
        boxShadow: '1px 2px 9px #F4AAB9',}} onPress={onPress}>
                    <Text style={styles.textMainMenu}>{'PLAY'}</Text>
                </Pressable>

            </View>
            <View style={styles.row}>
                <Pressable style={{
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        width:200,
        height:60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#8ea4d2',
        boxShadow: '1px 2px 9px #F4AAB9',}} onPress={onPress}>
                    <Text style={styles.textMainMenu}>{'SETTINGS '}</Text>
                </Pressable>


            </View>

            <View style={styles.row}>

                <Pressable style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width:150,
        height:50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#8ea4d2',
        boxShadow: '1px 2px 9px #F4AAB9',}} onPress={onPress}>
                    <Text style={styles.textMainMenu}>{'QUIT '}</Text>
                </Pressable>


            </View>

            
            </View>
            <View style={styles.footerWrapper}>
            <Pressable style={{paddingVertical: 15, borderRadius: 10,width:100,alignItems: "center", backgroundColor: '#55627e',}} onPress={() => { Logout(); }}>
                    <Text style={{fontSize: 15,
        lineHeight: 35,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        }}>{'Log out '}</Text>
                </Pressable>

            


            </View>




        </View>

    )
};

export default MainPage;
{/* <BlueButton onPress={() => { Logout(); }} Text="LOGOUT"  />  */ }