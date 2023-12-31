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



const GameQuizPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryText, setSelectedCategoryText] = useState(null); // New state variable

  const checkedButtonColor = "#aec5d1";
  const uncheckedButtonColor = "#8ea4d2";

  const minQuestions = 5;
  const maxQuestions = 25;
  const initialNumberOfQuestion = 10
  const sliderStep = 1;
  const [currentSliderValue, setCurrentSliderValue] = useState(initialNumberOfQuestion);

  useEffect(() => {
    // Fetch the list of categories
    const fetchCategories = async () => {
      try {
        const categories = await GetCategories();
        // Extract the name from each category element
        const categoryNames = categories.map(category => category[1]);
        setCategories(categoryNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);


  const handleCategoryPress = (category) => {
    // Toggle the selection of a category
    console.log("Category:", category);
    if (selectedCategory === category) {
      setSelectedCategory(null);
      setSelectedCategoryText(null); // Reset the selected category text
    } else {
      setSelectedCategoryText(category); // Update the selected category text first
      setSelectedCategory(category);
    }
    console.log("Selected category:", selectedCategory);
  };

  const handleStartQuiz = () => {
    // Proceed to GameQuiz.js with the selected category
    // You can pass the selected category as props to the GameQuiz component
    // For example: navigation.navigate('GameQuiz', { category: selectedCategory });
  };

  const handleSliderChange = (value) => {
    setCurrentSliderValue(value);
  }


  return (
    <View style={styles.containerCenter}>
      <View style={styles.paddedContainer}>

        <Text style={styles.textStartQuiz}>{}</Text>

      </View>
    </View>
  );
};

export default GameQuizPage;