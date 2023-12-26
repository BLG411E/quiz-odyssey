import React, { useContext } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import { Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, View, Pressable } from 'react-native';
import styles from '../styles';



const MainPage = ({navigation}) => {
    const { Logout, onPress, title = 'Save' } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <Pressable style={styles.buttonMainMenu} onPress={() => {
                            navigation.navigate('DailyChallengePage');
                        }}>
                    <Text style={styles.textMainMenu}>{'Daily odyssey'}</Text>
                </Pressable>
                <Pressable style={styles.buttonMainMenu} onPress={() => {
                            navigation.navigate('ProfilePage');
                        }}>
                    <Text style={styles.textMainMenu}> {'Profile'}</Text>
                </Pressable>


            </View>
            <View style={styles.headerWrapper}>
                <Pressable style={styles.buttonMainMenu} onPress={onPress}>
                    <Text style={styles.textMainMenu}>{'Leaderboards'}</Text>
                </Pressable>

                <Pressable style={styles.buttonMainMenu} onPress={onPress}>
                    <Text style={styles.textMainMenu}>{'Submit a '}</Text>
                </Pressable>
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