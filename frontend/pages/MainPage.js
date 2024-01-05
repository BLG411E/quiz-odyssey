import React, { useContext, useEffect, useState } from "react";
import { Alert, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import AuthContext from "../utils/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import IsDailyQuizCompleted from '../utils/IsDailyQuizCompleted';


const MainPage = ({ navigation, route }) => {
    const { Logout } = useContext(AuthContext);
    const { token } = route.params
    const [isDailyQuizFinished, setDailyQuizFinished] = useState('');

    const onPressPlay = () => {
        navigation.navigate('ChooseCategoryPage', { token: token });
    };


    const onPressDailyChallenge = async () => {
        try {
            const data = await IsDailyQuizCompleted(token);

            if (data["isFinished"]) {
   
                Alert.alert("Daily quiz already finished");
            } else {
                const category = 1; // 1 is the id of the daily challenge category
                const numberOfQuestions = 10;
                navigation.navigate('GameQuizPage', {
                    token: token,
                    categoryID: category,
                    numberOfQuestions: numberOfQuestions,
                    currentQuestionNumber: 1,
                });
            }
        } catch (error) {
            console.error('Error checking daily quiz completion:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    // Use the token to fetch user data
                    const data = await IsDailyQuizCompleted(token);
                    setDailyQuizFinished(data["isFinished"])

                    
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity style={styles.headerButton} onPress={onPressDailyChallenge}>
                    <View style={styles.headerButtonContent}>
                        <Image source={require('../assets/dailychallenge.png')} style={styles.headerImage} />
                        <Text style={styles.headerButtonText}>{"Daily odyssey"}</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={styles.headerButton} onPress={() => {
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
                    navigation.navigate('LeaderboardPage');
                }}>
                    <View style={styles.headerButtonContent}>
                        <Image source={require('../assets/stats.png')} style={styles.headerImage} />
                        <Text style={styles.headerButtonText}>{"Check your score!"}</Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity style={styles.headerButton} onPress={() => {
                    navigation.navigate('SubmitQuestionPage');
                }}>
                    <View style={styles.headerButtonContent}>
                        <Text style={styles.headerButtonText}>{"Submit a question"}</Text>
                        <Image source={require('../assets/questionmark.png')} style={styles.headerImage} />

                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flex:1, alignItems:"center"}}>
            <Image source={require('../assets/Logomk1.png')} style={{ width: 250,
        height: 200
        }} />
        </View>
            

            <View style={{ "paddingTop": 1, }}>
            

                <View style={styles.row}>
                    <Pressable style={{
                        paddingVertical: 15,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        width: 250,
                        height: 70,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: '#8ea4d2',
                        boxShadow: '1px 2px 9px #F4AAB9',
                    }} onPress={onPressPlay}>
                        <Text style={styles.textMainMenu}>{'PLAY'}</Text>
                    </Pressable>

                </View>
                <View style={styles.row}>
                    <Pressable style={{
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        width: 200,
                        height: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: '#8ea4d2',
                        boxShadow: '1px 2px 9px #F4AAB9',
                    }} onPress={() => {
                        navigation.navigate('ProfilePage');
                    }}>
                        <Text style={{fontSize: 20,
        lineHeight: 35,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -1, height: 1},
         textShadowRadius: 3}}>{'SETTINGS'}</Text>
                    </Pressable>
                </View>
                <View style={styles.row}>
                    <Pressable style={{
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        width: 170,
                        height: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: '#8ea4d2',
                        boxShadow: '1px 2px 9px #F4AAB9',
                    }} onPress={() => {
                        Logout();
                    }}>
                        <Text style={{fontSize: 18,
        lineHeight: 35,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -1, height: 1},
         textShadowRadius: 3}}>{'LOGOUT'}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default MainPage;
