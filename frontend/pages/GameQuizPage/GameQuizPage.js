import React, { useState, useContext, useEffect, route } from "react";
import AuthContext from "../../utils/AuthContext";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import Slider from '@react-native-community/slider'
import styles from "./styles";


const GameQuizPage = ({ route, navigation }) => {
  const { token, categoryID, numberOfQuestions, currentQuestionNumber } = route.params;

  const questionTime = 5;
  const [timeLeft, setTimeLeft] = useState(questionTime);
  const [ buttonColors, setButtonColors ] = useState(["white", "white", "white", "white"]);
  
  const changeButtonColor = (index1, color1, index2=-1, color2=-1) => {
    setButtonColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index1] = color1;
      if (index2 !== -1) {
        newColors[index2] = color2;
      }
      return newColors;
    });
  };

  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const breakAfterQuestion = 2;

  const questions = ["What is the capital of Germany",
                    "What is the capital of France",
                    "What is the capital of Italy",
                    "What is the capital of Spain",
                    "What is the capital of Portugal",];
  const options = [["Berlin", "Munich"],
                    ["Paris", "Marseille", "Lyon"],
                    ["Milan", "Rome", "Naples", "Turin"],
                    ["Seville", "Valencia", "Madrind"],
                    ["Porto", "Coimbra", "Braga", "Lisbon"]];
  const answers = ["Berlin", "Paris", "Rome", "Madrid", "Lisbon"];
  const answerIndex = [0, 0, 1, 2, 3];

  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime-1 === 0) {
          clearInterval(timer);
          handleAnswerSelection(-1, true);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);



  handleTimerEnd = () => {
    changeButtonColor(answerIndex[currentQuestionNumber-1], "#D0FFBC");
  }

  const handleAnswerSelection = async (index, isTimeUp=false) => {
    if (isQuestionAnswered)
      return;
    
    clearInterval(timer);
    setTimeLeft(0);
    setIsQuestionAnswered(true);

    if (isTimeUp) {
      changeButtonColor(answerIndex[currentQuestionNumber-1], "#fffdaf");
    }
    else {
      if (index == answerIndex[currentQuestionNumber-1]) {
        changeButtonColor(index, "#D0FFBC");
      }
      else if (index != answerIndex[currentQuestionNumber-1]) {
        changeButtonColor(index, "#FF7F7F", answerIndex[currentQuestionNumber-1], "#D0FFBC");
      }
    }
    
    setTimeout(() => {
      console.log("Current question number: " + currentQuestionNumber + ", Number of questions: " + numberOfQuestions);
      if (currentQuestionNumber < numberOfQuestions) {
        navigation.push('GameQuizPage', { token: token, categoryID: categoryID, 
          numberOfQuestions: numberOfQuestions, currentQuestionNumber: currentQuestionNumber + 1});
        return;
      }
      else {
        navigation.navigate("MainPage", { token: token });
      }
    }, breakAfterQuestion * 1000);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <View style={styles.questionHeader}>
        <Text style={styles.textHeader}>Question {currentQuestionNumber}/{numberOfQuestions}</Text>
      </View>

      <View style={styles.questionHolder}>
        <Text style={styles.textQuestion}>{questions[currentQuestionNumber-1]}</Text> 
      </View>

      <View style={styles.circleTimer}>
        <Text style={styles.textTimer}>{timeLeft}</Text>
      </View>

        
        {options[currentQuestionNumber-1] && options[currentQuestionNumber-1].length >= 1 && (
          <Pressable style={[styles.answerButton, { backgroundColor: buttonColors[0] }]} 
          onPress={() => handleAnswerSelection(0)}>
            <Text style={styles.textAnswer}>{options[currentQuestionNumber-1][0]}</Text>
          </Pressable>
        )}

        {options[currentQuestionNumber-1].length >= 2 && (
          <Pressable  style={[styles.answerButton, { backgroundColor: buttonColors[1] }]}
          onPress={() => handleAnswerSelection(1)}>
            <Text style={styles.textAnswer}>{options[currentQuestionNumber-1][1]}</Text>
          </Pressable>
        )}

        {options[currentQuestionNumber-1].length >= 3 && (
          <Pressable  style={[styles.answerButton, { backgroundColor: buttonColors[2] }]}
          onPress={() => handleAnswerSelection(2)}>
            <Text style={styles.textAnswer}>{options[currentQuestionNumber-1][2]}</Text>
          </Pressable>
        )}

        {options[currentQuestionNumber-1].length === 4 && (
          <Pressable style={[styles.answerButton, { backgroundColor: buttonColors[3] }]} onPress={() => handleAnswerSelection(3)}>
            <Text style={styles.textAnswer}>{options[currentQuestionNumber-1][3]}</Text>
          </Pressable>
        )}

    </View>
  );
};

export default GameQuizPage;