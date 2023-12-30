import React, { useState,useContext, useEffect } from "react";
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
    Dimensions
} from 'react-native';
import styles from '../styles';


const ChoseCategoryPage = () => {

      return (
        <View style={styles.containerCenter}>
          {/* History button */}
          <Pressable
            style={[styles.categoryButton, { backgroundColor: '#33FF57'}]}
            onPress={() => {
              // Handle the press event for Button 1
            }}
          >
            <Image source={require('../assets/hourglass_icon.png')} style={styles.categoryButtonImage} />
            <Text style={styles.categoryButtonText}>History</Text>
          </Pressable>
        </View>


      );
};

export default ChoseCategoryPage;
