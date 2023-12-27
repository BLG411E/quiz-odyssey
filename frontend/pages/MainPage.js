import React, { useContext } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import { Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, View, Pressable, Image } from 'react-native';
import styles from '../styles';



const MainPage = ({navigation}) => {
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
                            navigation.navigate('ProfileSettingsPage');
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
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.textMainMenu}>{'PLAY '}</Text>
                </Pressable>

            </View>
            <View style={styles.row}>
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.textMainMenu}>{'Settings '}</Text>
                </Pressable>


            </View>

            <View style={styles.row}>

                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.textMainMenu}>{'Quit '}</Text>
                </Pressable>


            </View>

            
            </View>
            <View style={styles.footerWrapper}>
            <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.textMainMenu}>{'Quit '}</Text>
                </Pressable>

            


            </View>




        </View>

    )
};

export default MainPage;
{/* <BlueButton onPress={() => { Logout(); }} Text="LOGOUT"  />  */ }