import React, { useEffect, useState, useReducer } from "react";
import {
    Pressable,
    StatusBar,
    Text,
    View,
    BackHandler,
    ScrollView,
} from 'react-native';
import styles from "./styles";


const QuizSummaryPage = ({ route, navigation }) => {
    const {  token, score, answeredCorrectly, resultArray } = route.params;
    console.log("result arary: ", resultArray);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            navigation.navigate('MainPage', { token: token });
            return true;
          });

        return () => {
        }
    }, []);


    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" />

            <View style={styles.questionHeader}>
                <Text style={styles.textHeader}>SUMMARY</Text>
            </View>

            <View style={styles.resultsHolder}>
                <Text style={styles.textQuestion}>Your score: {score.score}
                {"\n"}Answered correctly: {answeredCorrectly}/{score.question_count}</Text>
            </View>

            <View style={styles.sliderHolder}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {resultArray.map((result, index) => (
                        <View key={index} style={styles.questionHolder}>
                            <Text style={styles.textAnswer}>Question {index + 1}: {resultArray[index]}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

        </View>
    );
};

export default QuizSummaryPage;
