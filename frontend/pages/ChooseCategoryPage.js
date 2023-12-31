import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../utils/AuthContext";
import {
  Text,
  View,
  Pressable,
  ScrollView,
  StatusBar,
} from 'react-native';
import Slider from '@react-native-community/slider'
import styles from '../styles';
import GetCategories from '../utils/GetCategories';



const ChooseCategoryPage = () => {
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
    }
    else {
      setSelectedCategoryName(category);
    }
  };

  const isCategoryChecked = (category) => {
    return selectedCategoryName === category;
  };

  const handleSliderChange = (value) => {
    setCurrentSliderValue(value);
  }

  const handleStartQuiz = () => {
    if (selectedCategoryName !== null) {
      const selectedCategory = categories.find(category => category[1] === selectedCategoryName);
      const categoryId = selectedCategory[0];
      console.log("Selected category ID :", categoryId);
    }
    else {
      console.log("No category selected");
    }
  };


  return (
    <View style={styles.containerCenter}>
      <View style={styles.paddedContainer}>

        <View style={styles.startGameButton}>
          <Pressable onPress={() => handleStartQuiz()}>
            <Text style={styles.textStartQuiz}>START{'\n'}QUIZ</Text>
          </Pressable>
        </View>


        <Slider
          style={styles.questionsNumberSlider}
          minimumValue={minQuestions}
          maximumValue={maxQuestions}
          step ={sliderStep}
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
              <View key={category.id} style={{ marginBottom: 10 }}>
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

      </View>
    </View>
  );
};

export default ChooseCategoryPage;
