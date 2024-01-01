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
import styles from '../../styles';
import GetCategories from '../../utils/GetCategories';




const GameQuizPage = ({ route, navigation }) => {
  const { categoryId, numberOfQuestions } = route.params

  return (
    <View style={styles.containerCenter}>
      <View style={styles.paddedContainer}>

        <Text style={styles.textStartQuiz}>{"yes"}</Text>

      </View>
    </View>
  );
};

export default GameQuizPage;