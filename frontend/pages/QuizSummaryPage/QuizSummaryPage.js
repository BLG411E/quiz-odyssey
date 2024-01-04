import React, { useEffect } from "react";
import {
    BackHandler,
    ScrollView,
    StatusBar,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import BlueButton from "../../components/BlueButton";
import styles from "./styles";


const QuizSummaryPage = ({ route, navigation }) => {
    const {  token, score, answeredCorrectly, resultArray } = route.params;

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            navigation.navigate('MainPage', { token: token });
            return true;
          });

        return () => {
        }
    }, []);


    return (
        <>
        <SafeAreaView style={{flex: 0, backgroundColor:'#8ea4d2'}} edges={['right', 'top', 'left']}></SafeAreaView>
        <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
            <StatusBar barStyle="default"/>
        
            <View style={styles.questionHeader}>
                <Text style={styles.textHeader}>SUMMARY</Text>
            </View>

            <View style={styles.resultsHolder}>
                <Text style={styles.textQuestion}>Your score: {score.score}
                {"\n"}Correct Answers: {answeredCorrectly}/{score.question_count}</Text>
            </View>

            <View style={styles.sliderHolder}>
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    {resultArray.map((result, index) => (
                        <View key={index} style={[styles.questionHolder, {backgroundColor: resultArray[index] === "correct" ? "#BFF783" : resultArray[index] === "incorrect" ? "#FF7F7F" : "#F7F583"}]}>
                            <Text style={styles.textAnswer}>Question {index + 1}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.scrollViewMarginer}></View>
            </View>
            <BlueButton style={{marginTop: 25}} onPress={() => {navigation.navigate('MainPage', { token: token });}} text={"BACK"} />
        </SafeAreaView>
        </>
    );
};

export default QuizSummaryPage;
