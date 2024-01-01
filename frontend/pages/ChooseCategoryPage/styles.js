import { StyleSheet, Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    containerCenter: {
        flex: 1,
        backgroundColor: '#3E4C5E',
        alignItems: 'center',
        justifyContent: 'center',
    },

    marginContainer: {
      flex: 1,
      backgroundColor: '#3E4C5E',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: screenHeight * 0.03,
      marginBottom: screenHeight * 0.015,
    },
    scrollViewContainer: {
      flex: 1,
      marginTop: screenHeight * 0.03,
    },
    startGameButton: {
      alignItems: "center", 
      justifyContent: "center",
      paddingVertical: screenHeight * 25 * 3 / 10000,
      paddingHorizontal: screenWidth * 73 * 2 / 10000,
      borderRadius: 10,
      width: screenWidth * 50 / 100,
      height: screenHeight * 10 / 100,
      backgroundColor: '#9bc29b',
      flexDirection: 'row',
    },
    categoryButton: {
      alignItems: "center", 
      justifyContent: "center",
      paddingVertical: screenHeight * 25 * 3 / 10000,
      paddingHorizontal: screenWidth * 73 * 2 / 10000,
      borderRadius: 10,
      width: screenWidth * 50 / 100,
      height: screenHeight * 5 / 100,
      backgroundColor: '#8ea4d2',
      flexDirection: 'row',
      marginVertical: screenHeight * 0.009,
    },
    categoryButtonText: {
      alignContent: 'center',
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 3,
    },
    textStartQuiz: {
      alignContent: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: screenHeight * 0.03,
      lineHeight: 35,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
       textShadowOffset: {width: -1, height: 1},
       textShadowRadius: 3
    },
    questionsNumberSlider: {
      marginTop: screenHeight * 0.02,
      width: screenWidth * 80 / 100,
      height: screenHeight * 5 / 100,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 15,
      alignItems: 'center',
      padding: "8%",
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalButton: {
      borderRadius: 10,
      backgroundColor: '#2196F3',
      width: screenWidth * 40 / 100,
      height: screenHeight * 4 / 100,
      textAlign: 'center',
      alignContent: 'center',
      padding: screenHeight * 0.007,
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: screenHeight*0.01,
      textAlign: 'center',
    },
});

export default styles;