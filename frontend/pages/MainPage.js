import React, { useContext } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles';
import AuthContext from "../utils/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";


const MainPage = ({ navigation, route }) => {
    const { Logout } = useContext(AuthContext);
    const { token } = route.params

    const onPressPlay = () => {
        navigation.navigate('ChooseCategoryPage', { token: token });
    };


    const onPressDailyChallenge = () => {
        const category = 1; // 1 is the id of the daily challenge category
        const numberOfQuestions = 10;
        navigation.navigate('GameQuizPage', {
            token: token, categoryID: category, numberOfQuestions: numberOfQuestions,
            currentQuestionNumber: 1
        });
    };

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

            <View style={{ "paddingTop": 100, }}>

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
                        <Text style={styles.textMainMenu}>{'SETTINGS'}</Text>
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
                        <Text style={styles.textMainMenu}>{'LOGOUT'}</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default MainPage;
