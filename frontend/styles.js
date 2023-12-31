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


    // ChoseCategoryPage.js:
    paddedContainer: {
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
      alignItems: "center", // Arrange children in a row
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
      alignItems: "center", // Arrange children in a row
      justifyContent: "center",
      paddingVertical: screenHeight * 25 * 3 / 10000,
      paddingHorizontal: screenWidth * 73 * 2 / 10000,
      borderRadius: 10,
      width: screenWidth * 50 / 100,
      height: screenHeight * 5 / 100,
      backgroundColor: '#8ea4d2',
      flexDirection: 'row',
    },
    categoryButtonText: {
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
    //-------------------------




    baseText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 18,
        color: "#fff",
    },
    inputText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 20,
        backgroundColor: "#fff",
        width: 339,
        height: 59,
        padding: 17,
        borderRadius: 10,
        verticalAlign: "middle",
        marginBottom: 9,
    },
    titleText: {
        fontSize: 64,
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        marginBottom: 9,
        color: "#fff",
    },
    inputInvalid: {
        borderColor: "#750000",
        borderWidth: 1,
        backgroundColor: "#ffbaba",
        color: "#750000",
    },
    inputValid: {
        backgroundColor: "#fff",
        color: "black",
    },
    link: {
        color: "#0070E0",
        fontFamily: "Inter_400Regular",
        textDecorationLine: "underline",
        fontSize: 18,
    },
    container: {
        flex: 1,
        backgroundColor: "#3e4c5e",

      },
      row: {

        alignItems: "center", 
        marginVertical: 10,
        
      },
      button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        width:200,
        alignItems: "center",
        backgroundColor: 'black',
      },
      buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },

      headerWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:20,
        paddingTop:20,
      },
      footerWrapper:{
        flex: 1,
        justifyContent: 'flex-end',
      },
      buttonMainMenu: {
        alignItems: 'center',
        justifyContent: 'right',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
      textMainMenu: {
        fontSize: 30,
        lineHeight: 35,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
         textShadowOffset: {width: -1, height: 1},
         textShadowRadius: 3
      },
      headerButton: {
        backgroundColor: 'grey',
        padding: 16,
        borderRadius: 8,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      headerImage: {
        width: 40, 
        height: 40, 
        marginRight: 8,
      },
      headerButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerButtonText: {
        flex: 1, 
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      profileHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
      },
      profileHeaderText:{
        color: 'white',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginLeft: -24,
      },
      profileSettingsImage:{
        width: 100, // Adjust the width as needed
        height: 100, // Adjust the height as needed
        
      },
      settingsPageTitleRow:{
        height: 50, // Adjust the height as needed
        backgroundColor: '#8ea4d2',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        padding:10,
      },

      settingsPageContentRow:{
        height: 50, // Adjust the height as needed
        backgroundColor: 'white',

        padding:10,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

      },

      settingsPageChangeContentRow:{
        height: 50, // Adjust the height as needed
        backgroundColor: 'white',

        padding:15,

        alignItems: 'center',


      },
      separator: {
        height: 1,
        backgroundColor: '#cccccc', // Customize the color of the line
        marginHorizontal: 1, // Adjust the margin as needed
      },
      answerInputField:{
        height:40,
         width:290,
          padding:10,
          marginRight: 10,
           borderRadius:4,
            backgroundColor: 'white'
      },
      selectedAnswerInputField:{
        height:40,
         width:290,
          padding:10,
          marginRight: 10,
           borderRadius:4,
            backgroundColor: '#a9e190'
      },
      
      
});

export default styles;
