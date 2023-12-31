import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import DismissKeyboard from '../components/DismissKeyboard';
import styles from '../styles';
import GetCategories from '../utils/GetCategories';
import SubmitAQuestion from '../utils/SubmitAQuestion';
import { SafeAreaView } from "react-native-safe-area-context";


const SubmitQuestionPage = ({ route, navigation }) => {
    const [selected, setSelected] = useState("");
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['', '', '', '']);
    const [checkedAnswers, setCheckedAnswers] = useState([false, false, false, false]);
    const [data,setData] = React.useState([]);
    const { token } = route.params

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

        if (numberOfCheckedAnswers < 1) {


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
        const filledAnswerCount = answers.filter((answer) => answer.trim() !== '').length;


        if (question.length > 10) {
            if (filledAnswerCount>=2) {
                if (numberOfCheckedAnswers === 1) {

                    if (selected) {
                    const checkedQuestionIndex = checkedAnswers.findIndex((isChecked) => isChecked);
                    const selectedCategoryIndex =  data.find(item => item.value === selected);
                    const updatedAnswers = answers.map(answer => answer.trim() !== '' ? answer : null);



                    console.log(selectedCategoryIndex["key"]);
                    const submitData = {
                        category: selectedCategoryIndex["key"],
                        questionText: question,
                        answers: updatedAnswers,
                        correctAnswerIndex: checkedAnswers.findIndex((isChecked) => isChecked)+1,
                        difficulty:1,
                        explanation:question
                      };

                    SubmitAQuestion(token, submitData);
                    Alert.alert('Submission Successful', 'Answers submitted successfully!');
                    } 
                    else {
                        Alert.alert('Error', 'Please select a category');
                    }
                    
                    
                } else {

                    Alert.alert('Error', 'Please select 1 correct answers.');
                }
            }
            else {
                Alert.alert('Error', 'At least two answer fields must be filled.');
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
            <SafeAreaView style={styles.containerCenter}>
                <KeyboardAwareScrollView behavior="position">
                    <View style={styles.container}>
                        <View style={styles.profileHeader}>
                        <Icon.Button backgroundColor="rgba(0,0,0,0)" name="chevron-back-outline" size={30} color="white" iconStyle={{marginRight: 0}} onPress={() => {
                            navigation.navigate('MainPage');
                        }}/>
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
                                   style={[
                                        styles.answerInputField,
                                        checkedAnswers[index] && styles.selectedAnswerInputField,
                                        { backgroundColor: index > 0 && answers[index - 1].trim().length === 0 ? 'grey' : 'white' }
                                    ]}
                                    placeholder={`Answer ${index + 1}`}
                                    onChangeText={(text) => handleInputChange(text, index)}
                                    value={answer}
                                    editable={index === 0 || answers[index - 1].trim().length > 0}
  
                                />


                                {index === 0 || answers[index - 1].trim().length > 0 ? (
                                    <>
                                        {checkedAnswers[index] ? (
                                            <TouchableOpacity onPress={() => handleCheckmarkPress(index)} style={{ padding: 10, backgroundColor: "white", height: 40, borderRadius: 4 }}>
                                                <Icon name="checkmark-outline" size={24} color="green" />
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity onPress={() => handleCheckmarkPress(index)} style={{ padding: 10, backgroundColor: "white", height: 40, borderRadius: 4 }}>
                                                <Icon name="checkmark-outline" size={24} color="transparent" />
                                            </TouchableOpacity>
                                        )}
                                    </>
                                ) : null}
                                

                            </View>
                        ))}
                        <View style={{ padding: 15, alignItems: 'center' }}>
                            <TouchableOpacity style={{ fontSize: 5, backgroundColor: "#8ea4d2", width: 200, height: 50, alignItems: 'center', justifyContent: 'center' }} title="Submit" onPress={handleSubmit}>
                                <Text style={{ fontSize: 15, color: "white", }}>{"SUBMIT"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </DismissKeyboard>
    )
};

export default SubmitQuestionPage;
