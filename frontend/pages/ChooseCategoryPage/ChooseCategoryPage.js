import React, { useState, useContext, useEffect, route } from "react";
import AuthContext from "../../utils/AuthContext";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import Slider from '@react-native-community/slider'
import styles from "./styles";
import GetCategories from '../../utils/GetCategories';



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

  const [categoryID, setCategoryID] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      navigation.navigate('GameQuizPage', { token: token, categoryID: category[0], numberOfQuestions: currentSliderValue });
    } else {
      setModalVisible(true); // Show error message if no category is selected
    }
  };

  const handleOKButton = () => {
    setShowErrorMessage(false); // Hide error message when OK button is pressed
  };

  return (
    <View style={styles.containerCenter}>
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
              <View key={category.id}>
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
    </View>
  );
};


export default ChooseCategoryPage;
