import Slider from '@react-native-community/slider';
import React, { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import GetCategories from '../../utils/GetCategories';
import styles from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";


const ChooseCategoryPage = ({route, navigation}) => {
  const { token } = route.params;
  const checkedButtonColor = "#aec5d1";
  const uncheckedButtonColor = "#8ea4d2";

  const [categories, setCategories] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

  const [selectedCategoryName, setSelectedCategoryName] = useState(null);

  const minQuestions = 5;
  const maxQuestions = 25;
  const initialNumberOfQuestion = 10;
  const sliderStep = 1;
  const [currentSliderValue, setCurrentSliderValue] = useState(initialNumberOfQuestion);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Fetch the list of categories
    const fetchCategories = async () => {
      try {
        const categories = await GetCategories();
        // Extract the name from each category element
        const categoryNames = categories.map(category => category[1]);
        setCategoryNames(categoryNames);
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryPress = (category) => {
    if (selectedCategoryName === category) {
      setSelectedCategoryName(null);
    } else {
      setSelectedCategoryName(category);
    }
  };

  const isCategoryChecked = (category) => {
    return selectedCategoryName === category;
  };

  const handleSliderChange = (value) => {
    setCurrentSliderValue(value);
  };


  const handleStartQuiz = () => {
    if (selectedCategoryName !== null) {
      setSelectedCategoryName(null);
      const category = categories.find(category => category[1] === selectedCategoryName);
      navigation.navigate('GameQuizPage', { token: token, categoryID: category[0], numberOfQuestions: currentSliderValue,
                                            currentQuestionNumber: 1});
    } else {
      setModalVisible(true); // Show error message if no category is selected
    }
  };

  const handleOKButton = () => {
    setShowErrorMessage(false); // Hide error message when OK button is pressed
  };

  return (
    <SafeAreaView style={styles.containerCenter}>
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
      }}>
                    <Icon.Button backgroundColor="rgba(0,0,0,0)" name="chevron-back-outline" size={30} color="white" iconStyle={{marginRight: 0}} onPress={() => {
                        navigation.navigate('MainPage');
                    }}/>

                    <Text style={{
        color: 'white',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginLeft: -36,
      }}>{"Choose a category"}</Text>
                </View>
      <View style={styles.marginContainer}>

      <View style={styles.startGameButton}>
          <Pressable onPress={() => handleStartQuiz()}>
            <Text style={styles.textStartQuiz}>START{'\n'}QUIZ</Text>
          </Pressable>
        </View>

        
        
        <Slider
          style={styles.questionsNumberSlider}
          minimumValue={minQuestions}
          maximumValue={maxQuestions}
          step={sliderStep}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#6fa3f7"
          value={initialNumberOfQuestion}
          onValueChange={(value) => {
            handleSliderChange(value);
          }}
        />

        <View style={styles.questionsNumberText}>
          <Text style={styles.textStartQuiz}>Number of questions:</Text>
          <Text style={styles.textStartQuiz}>{currentSliderValue}</Text>
        </View>



        <View style={styles.scrollViewContainer}>
          <StatusBar barStyle="default" />
          <ScrollView
            showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            {categoryNames.map((category, index) => (
              <View  key={category}>
                <Pressable
                  style={[styles.categoryButton,
                    { backgroundColor: isCategoryChecked(category) ? checkedButtonColor : uncheckedButtonColor },
                  ]}
                  onPress={() => handleCategoryPress(category)}
                >
                  <Text style={styles.categoryButtonText}>{category}</Text>
                </Pressable>
              </View>
            ))}
        </ScrollView>
        </View>


        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(false);
        }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Select category first!</Text>
              <Pressable
                style={[styles.modalButton]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.modalButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
};


export default ChooseCategoryPage;
