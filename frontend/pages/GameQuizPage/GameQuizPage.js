import React, { useEffect, useState, useReducer } from "react";
import {
    Pressable,
    StatusBar,
    Text,
    View
} from 'react-native';
import styles from "./styles";
import { io } from "socket.io-client";
import { API_URL } from "../../utils/AuthContext";


const GameQuizPage = ({ route, navigation }) => {
    const { token, categoryID, numberOfQuestions } = route.params;

    const questionTime = 5; // 5 seconds
    const [timeLeft, setTimeLeft] = useState(questionTime);
    const [buttonColors, setButtonColors] = useState(["white", "white", "white", "white"]);
    const [currentQuestion, setCurrentQuestion] = useState({
        text: "NULL",
        options: ["NULL", "NULL", "NULL", "NULL"],
    });
    const [answerIndex, setAnswerIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    const [userAnswer, setUserAnswer] = useState(0);
    const [timer, setTimer] = useState(null);

    const breakAfterQuestion = 2000; // 2 seconds (2000ms)

    const changeButtonColor = (index, color) => {
        setButtonColors((prevColors) => {
            const newColors = [...prevColors];
            newColors[index - 1] = color;
            return newColors;
        });
    };

    const [socket, setSocket] = useState(null);

    const [quizState, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "ANSWER":
                socket.emit("answer", {
                    answer: userAnswer,
                });
                changeButtonColor(userAnswer, "#F7F583");
                clearInterval(timer);
                return "PENDING_RESULT";
            case "RECEIVED_RESULT":
                if (userAnswer !== 0 && userAnswer !== answerIndex) {
                    changeButtonColor(userAnswer, "#FF7F7F");
                }

                if (userAnswer === 0) {
                    changeButtonColor(answerIndex, "#F7F583");
                } else {
                    changeButtonColor(answerIndex, "#BFF783");
                }

                setTimeout(() => {
                    dispatch({ type: "NEXT_QUESTION" });
                }, breakAfterQuestion);
                return "SHOWING_RESULT";
            case "NEXT_QUESTION":
                setButtonColors(["white", "white", "white", "white"]);
                setCurrentQuestionNumber(currentQuestionNumber + 1);
                socket.emit("next_question");
                return "PENDING_QUESTION";
            case "RECEIVED_QUESTION":
                setTimeLeft(questionTime);
                setUserAnswer(0);
                const new_timer = setInterval(() => {
                    setTimeLeft((prevTime) => {
                        if (prevTime - 1 === 0) {
                            clearInterval(new_timer);
                            socket.emit("answer", {
                                answer: 0,
                            });
                            return 0;
                        } else {
                            return prevTime - 1;
                        }
                    });
                }, 1000);
                setTimer(new_timer);
                return "PENDING_ANSWER";
            case "END":
                socket.disconnect();
                // Score is available at the "score" variable to display on the results page
                // TODO: Change with results page
                setTimeout(() => {
                    navigation.navigate("MainPage", { token: token });
                }, breakAfterQuestion);
                return "DISCONNECTED";
        }
    }, "READY", () => {
        const socket = io(`${API_URL}/quiz`, {
            reconnectionDelayMax: 10000,
            auth: {
                "Token": global.token,
            },
        });
        
        socket.emit("start", {
            category: categoryID,
            question_count: numberOfQuestions
        });

        setSocket(socket);
        return "PENDING_ANSWER";
    });

    useEffect(() => {
        socket.on("error", (error) => {
            console.log("Error: ", error);
        });

        socket.on("new_question", (question) => {
            setCurrentQuestion(question);
            dispatch({ type: "RECEIVED_QUESTION" });
        });

        socket.on("result", (data) => {
            // Highlight answer on frontend, wait for next question
            setAnswerIndex(data.correct_answer);
            setScore(data.score);
            dispatch({ type: "RECEIVED_RESULT" });
        });

        socket.on("end", (score, question_count) => {
            // Display score on frontend
            setScore(score);
            dispatch({ type: "END" });
        });

        return () => {
            socket.off("error");
            socket.off("new_question");
            socket.off("result");
            socket.off("end");
        }
    }, []);

    const handleAnswerSelection = async (index, isTimeUp = false) => {
        if (quizState !== "PENDING_ANSWER") return;
        setTimeLeft(0);
        setUserAnswer(index);
        dispatch({ type: "ANSWER" });
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="default" />
            <View style={styles.questionHeader}>
                <Text style={styles.textHeader}>Question {currentQuestionNumber}/{numberOfQuestions}</Text>
            </View>

            <View style={styles.questionHolder}>
                <Text style={styles.textQuestion}>{currentQuestion["text"]}</Text>
            </View>

            <View style={styles.circleTimer}>
                <Text style={styles.textTimer}>{timeLeft >= 0 ? timeLeft : 0}</Text>
            </View>


            {currentQuestion["options"] && currentQuestion["options"].length >= 1 && (
                <Pressable style={[styles.answerButton, { backgroundColor: buttonColors[0] }]}
                    onPress={() => handleAnswerSelection(1)}>
                    <Text style={styles.textAnswer}>{currentQuestion["options"][0]}</Text>
                </Pressable>
            )}

            {currentQuestion["options"] && currentQuestion["options"].length >= 2 && (
                <Pressable style={[styles.answerButton, { backgroundColor: buttonColors[1] }]}
                    onPress={() => handleAnswerSelection(2)}>
                    <Text style={styles.textAnswer}>{currentQuestion["options"][1]}</Text>
                </Pressable>
            )}

            {currentQuestion["options"] && currentQuestion["options"].length >= 3 && (
                <Pressable style={[styles.answerButton, { backgroundColor: buttonColors[2] }]}
                    onPress={() => handleAnswerSelection(3)}>
                    <Text style={styles.textAnswer}>{currentQuestion["options"][2]}</Text>
                </Pressable>
            )}

            {currentQuestion["options"] && currentQuestion["options"].length === 4 && (
                <Pressable style={[styles.answerButton, { backgroundColor: buttonColors[3] }]}
                    onPress={() => handleAnswerSelection(4)}>
                    <Text style={styles.textAnswer}>{currentQuestion["options"][3]}</Text>
                </Pressable>
            )}

        </View>
    );
};

export default GameQuizPage;
