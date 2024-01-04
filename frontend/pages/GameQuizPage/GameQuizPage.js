import React, { useEffect, useReducer, useState } from "react";
import {
    BackHandler,
    Modal,
    Pressable,
    StatusBar,
    Text,
    View
} from 'react-native';
import { io } from "socket.io-client";
import { API_URL } from "../../utils/AuthContext";
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";


const GameQuizPage = ({ route, navigation }) => {
    const { token, categoryID, numberOfQuestions } = route.params;

    const questionTime = 15; // seconds
    const [timeLeft, setTimeLeft] = useState(questionTime);
    const [buttonColors, setButtonColors] = useState(["white", "white", "white", "white"]);
    const [currentQuestion, setCurrentQuestion] = useState({
        text: "NULL",
        options: ["NULL", "NULL", "NULL", "NULL"],
    });
    const [answerIndex, setAnswerIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [answeredCorrectly, setAnsweredCorrectly] = useState(0);
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    const [userAnswer, setUserAnswer] = useState(0);
    const [timer, setTimer] = useState(null);

    const breakAfterQuestion = 2000; // 2 seconds (2000ms)

    const [resultArray, setResultArray] = useState(
        Array.from({ length: numberOfQuestions }, () => "unanswered")
    );

    const changeResultArray = (index, result) => {
        setResultArray((prevResults) => {
            const newResults = [...prevResults];
            newResults[index] = result;
            return newResults;
        });
    };

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
                    changeResultArray(currentQuestionNumber - 1, "incorrect");
                }

                if (userAnswer === 0) {
                    changeButtonColor(answerIndex, "#F7F583");
                } else {
                    if (userAnswer == answerIndex) {
                        setAnsweredCorrectly(answeredCorrectly + 1);
                        changeResultArray(currentQuestionNumber - 1, "correct");
                    }
                    changeButtonColor(answerIndex, "#BFF783");
                }

                setTimeout(() => {
                    dispatch({ type: "NEXT_QUESTION" });
                }, breakAfterQuestion);
                return "SHOWING_RESULT";
            case "NEXT_QUESTION":
                if (currentQuestionNumber < numberOfQuestions) {
                    setCurrentQuestionNumber(currentQuestionNumber + 1);
                    socket.emit("next_question");
                    return "PENDING_QUESTION";
                }
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
                    navigation.navigate("QuizSummaryPage", {
                        token: token, score: score, answeredCorrectly: answeredCorrectly
                        , resultArray: resultArray
                    });
                }, breakAfterQuestion);
                return "DISCONNECTED";
        }
    }, "READY", () => {
        const socket = io(`${API_URL}/quiz`, {
            reconnectionDelayMax: 10000,
            auth: {
                "Token": token,
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
        BackHandler.addEventListener('hardwareBackPress', function () {
            setShowConfirmation(true);
            return true;
        });

        socket.on("error", (error) => {
            console.log("Error: ", error);
        });

        socket.on("new_question", (question) => {
            setCurrentQuestion(question);
            setButtonColors(["white", "white", "white", "white"]);
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

    const handleAnswerSelection = (index) => {
        if (quizState !== "PENDING_ANSWER")
            return;

        setTimeLeft(0);
        setUserAnswer(index);
        dispatch({ type: "ANSWER" });
    }

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    }
    const handleGoBack = () => {
        navigation.navigate("MainPage", { token: token });
    }

    return (
        <>
        <SafeAreaView style={{flex: 0, backgroundColor:'#8ea4d2'}} edges={['right', 'top', 'left']}></SafeAreaView>
        <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
        <Modal
                visible={showConfirmation}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalView}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Do you want to end quiz?
                        </Text>
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={styles.modalButton}
                                onPress={handleGoBack}
                            >
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </Pressable>
                            <Pressable
                                style={styles.modalButton}
                                onPress={handleCloseConfirmation}
                            >
                                <Text style={styles.modalButtonText}>No</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

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

            {currentQuestion["options"] && currentQuestion["options"].length >= 1 && currentQuestion["options"][0] != null
                && (
                    <Pressable style={[styles.answerButton, { backgroundColor: buttonColors[0] }]}
                        onPress={() => handleAnswerSelection(1)}>
                        <Text style={styles.textAnswer}>{currentQuestion["options"][0]}</Text>
                    </Pressable>
                )}

            {currentQuestion["options"] && currentQuestion["options"].length >= 2 && currentQuestion["options"][1] != null
                && (
                    <Pressable style={[styles.answerButton, { backgroundColor: buttonColors[1] }]}
                        onPress={() => handleAnswerSelection(2)}>
                        <Text style={styles.textAnswer}>{currentQuestion["options"][1]}</Text>
                    </Pressable>
                )}

            {currentQuestion["options"] && currentQuestion["options"].length >= 3 && currentQuestion["options"][2] != null
                && (
                    <Pressable style={[styles.answerButton, { backgroundColor: buttonColors[2] }]}
                        onPress={() => handleAnswerSelection(3)}>
                        <Text style={styles.textAnswer}>{currentQuestion["options"][2]}</Text>
                    </Pressable>
                )}

            {currentQuestion["options"] && currentQuestion["options"].length === 4 && currentQuestion["options"][3] != null
                && (
                    <Pressable style={[styles.answerButton, { backgroundColor: buttonColors[3] }]}
                        onPress={() => handleAnswerSelection(4)}>
                        <Text style={styles.textAnswer}>{currentQuestion["options"][3]}</Text>
                    </Pressable>
                )}
        </SafeAreaView>
        </>
    );
};

export default GameQuizPage;
