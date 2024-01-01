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
import AddPointsToUserSCore from "../../utils/AddPointsToUserScore";




const GameQuizPage = ({ route, navigation }) => {
  const { categoryID, numberOfQuestions } = route.params;
  const { token } = route.params;
  const pointsToAdd = 10;

  const handleUpdateScore = async () => {
    try {
      if (token) {
        const data = await AddPointsToUserSCore(token, pointsToAdd, categoryID);
      }
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <View style={styles.containerCenter}>
      <View style={styles.paddedContainer}>

        <Pressable style={styles.button} 
          onPress={() => {
            handleUpdateScore();
          }}
        >
          <Text style={styles.buttonText}>UPDAte</Text>
        </Pressable>

      </View>
    </View>
  );
};

export default GameQuizPage;