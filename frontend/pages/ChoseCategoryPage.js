import React, { useState, useContext, useEffect } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import {
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  View,
  Pressable,
  Image,
  Parse,
  Dimensions,
  ScrollView,
} from 'react-native';
import styles from '../styles';

// Import GetCategories.js to fetch the list of categories
import GetCategories from '../utils/GetCategories';

const ChoseCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryText, setSelectedCategoryText] = useState(null); // New state variable

  useEffect(() => {
    // Fetch the list of categories
    const fetchCategories = async () => {
      try {
        const categories = await GetCategories();
        // Extract the name from each category element
        const categoryNames = categories.map(category => category[1]);
        console.log("Names:", categoryNames);
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

  return (
    <View style={styles.containerCenter}>
      <ScrollView>
        {categories.map((category, index) => (
          <View key={category.id} style={{ marginBottom: 10 }}>
            <Pressable
              style={[
                styles.categoryButton,
                { backgroundColor: selectedCategory === category ? '#33FF57' : '#000000' },
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
      <BlueButton title="START QUIZ" onPress={handleStartQuiz} />
    </View>
  );
};

export default ChoseCategoryPage;
