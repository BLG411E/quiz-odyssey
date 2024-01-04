import React, { useContext, useState, useEffect } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import { Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, View, Pressable, Image } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import DismissKeyboard from '../components/DismissKeyboard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SelectList } from 'react-native-dropdown-select-list'
import GetCategories from '../utils/GetCategories';


const SubmitQuestionPage = ({ route, navigation }) => {

    const { Logout, onPress, title = 'Save' } = useContext(AuthContext);
    const [selected, setSelected] = useState("");


    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [checkedAnswers, setCheckedAnswers] = useState([false, false, false, false]);
    const [data,setData] = React.useState([]);



    const handleInputChange = (text, index) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = text;
        setAnswers(updatedAnswers);
    };

    const handleQuestionInputChange = (text) => {
        const question = text
        setQuestion(question);
    };

    const handleCheckmarkPress = (index) => {
        const numberOfCheckedAnswers = checkedAnswers.filter((isChecked) => isChecked).length;
        const updatedCheckedAnswers = [...checkedAnswers];
        if (numberOfCheckedAnswers < 2) {

            updatedCheckedAnswers[index] = !updatedCheckedAnswers[index];
            setCheckedAnswers(updatedCheckedAnswers);
        }
        else if (updatedCheckedAnswers[index]) {

            updatedCheckedAnswers[index] = !updatedCheckedAnswers[index];
            setCheckedAnswers(updatedCheckedAnswers);
        }
    };




    const handleSubmit = () => {
        const numberOfCheckedAnswers = checkedAnswers.filter((isChecked) => isChecked).length;
        const areAllAnswersFilled = answers.every((answer) => answer.trim() !== '');

        if (question.length > 10) {
            if (areAllAnswersFilled) {
                if (numberOfCheckedAnswers === 1 || numberOfCheckedAnswers === 2) {

                    Alert.alert('Submission Successful', 'Answers submitted successfully!');
                } else {

                    Alert.alert('Error', 'Please select 1 or 2 answers before submitting.');
                }
            }
            else {
                Alert.alert('Error', 'All answer fields must be filled.');
            }

        }
        else {
            Alert.alert('Error', 'Question must be at least 10 characters long');
        }

    };



      useEffect(() => {
        const fetchCategories = async () => {
          try {
            const categories = await GetCategories();

            let newArray = categories.map((item) => {
                return {key: item[0], value: item[1]}
              })

              setData(newArray);

          } catch (error) {
            console.error(error);
          }
          
          
        };
    
        fetchCategories();
      }, []);
    
    
  
    return (

        <DismissKeyboard>
            <View style={styles.containerCenter}>
                <KeyboardAwareScrollView behavior="position">

                    <View style={styles.container}>
                        <View style={styles.profileHeader}>
                            <TouchableOpacity hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }} onPress={() => {
                                navigation.navigate('MainPage');
                            }}>
                                <Icon name="chevron-back-outline" size={30} color="white" onPress={() => {
                                    navigation.navigate('MainPage');
                                }} />

                            </TouchableOpacity>

                            <Text style={styles.profileHeaderText}>{"Submit a question"}</Text>
                        </View>
                        <View style={{ padding: 15 }}>
                            <TextInput
                                style={{ backgroundColor: 'white', height: 180, padding: 10, borderRadius: 4 }}
                                placeholder="Enter your question here"
                                multiline
                                numberOfLines={4}
                                onChangeText={handleQuestionInputChange}
                                value={question}
                            />
                            <View style={{ paddingTop: 15 }}>
                                <Text style={{ fontSize: 15, color: "white" }}>{"Write your question select category and one or two answers"}</Text>
                            </View>
                        </View>

                        <View style={{ paddingBottom: 10 }}>

                            <SelectList style={{ backgroundColor: "#000", textColor: 'white' }}
                                textColor="white"
                                setSelected={(val) => setSelected(val)}
                                data={data}
                                save="value"
                                defaultOption={{ key:'1', value:'All' }}
                            />
                        </View>


                        {answers.map((answer, index) => (
                            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingLeft: 15 }}>
                                <TextInput
                                    style={[styles.answerInputField, checkedAnswers[index] && styles.selectedAnswerInputField]}
                                    placeholder={`Answer ${index + 1}`}
                                    onChangeText={(text) => handleInputChange(text, index)}
                                    value={answer}
                                />


                                {checkedAnswers[index] && (
                                    <TouchableOpacity onPress={() => handleCheckmarkPress(index)} style={{ padding: 10, backgroundColor: "white", height: 40, borderRadius: 4 }}>
                                        <Icon name="checkmark-outline" size={24} color="green" />
                                    </TouchableOpacity>
                                )}
                                {!checkedAnswers[index] && (
                                    <TouchableOpacity onPress={() => handleCheckmarkPress(index)} style={{ padding: 10, backgroundColor: "white", height: 40, borderRadius: 4 }}>
                                        <Icon name="checkmark-outline" size={24} color="transparent" />
                                    </TouchableOpacity>

                                )}
                            </View>
                        ))}


                        <View style={{ padding: 15, alignItems: 'center' }}>
                            <TouchableOpacity style={{ fontSize: 5, backgroundColor: "#8ea4d2", width: 200, height: 50, alignItems: 'center', justifyContent: 'center' }} title="Submit" onPress={handleSubmit}>
                                <Text style={{ fontSize: 15, color: "white", }}>{"SUBMIT"}</Text>

                            </TouchableOpacity>
                        </View>
                    </View>


                </KeyboardAwareScrollView>
            </View>
        </DismissKeyboard>



    )
};

export default SubmitQuestionPage;
