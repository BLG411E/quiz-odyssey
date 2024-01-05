import { StyleSheet, Dimensions } from 'react-native';
/// game

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  modalView: {
    marginTop: screenHeight * 0.4,
    width: screenWidth * 60 / 100,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    alignSelf: 'center',
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
    marginTop: screenHeight * 0.01,
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
    questionHeader: {
      flexDirection: 'row',
      justifyContent: 'center',
      verticalAlign: 'center',
      paddingHorizontal:20,
      backgroundColor: '#8ea4d2',
      paddingVertical: screenHeight*0.02, 
    },
    textHeader: {
        fontSize: (screenHeight + screenWidth)*0.03,
        textAlign: 'center',
        color: "#fff",
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 3
    },
    questionHolder: {
      width: screenWidth * 0.75,
      height: screenHeight * 0.2,
      alignSelf: 'center',
      borderRadius: (screenHeight + screenWidth) / 40,
      backgroundColor: 'white',
      marginTop: screenHeight*0.06,
      marginBottom: screenHeight*0.01,
      paddingVertical: screenHeight*0.02,
      paddingHorizontal: screenWidth*0.045,
    },
    textQuestion: {
      fontSize: (screenHeight + screenWidth)*0.014,
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      textAlignVertical: 'center',
      flexWrap: 'wrap',
      fontWeight: 'bold',
    },
    circleTimer: {
      marginTop: screenHeight*0.12,
      marginLeft: screenWidth*0.8,
      position: 'absolute',
      alignItems: 'center',
      borderRadius: screenWidth * 0.2,
      width: screenWidth * 0.15,
      height: screenWidth * 0.15,
      backgroundColor: 'white',
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: screenHeight*0.01,
      },
      shadowOpacity: 0.46,
      shadowRadius: 11.14,
      
      elevation: 17,
    },
    textTimer: {
      color: "red",

      fontSize: (screenHeight + screenWidth)*0.019,
      fontWeight: 'bold',
    },

    answerButton: {
      width: screenWidth * 0.70,
      height: screenHeight * 0.1,
      alignSelf: 'center',
      borderRadius: (screenHeight + screenWidth) / 70,
      backgroundColor: 'white',
      marginTop: screenHeight*0.025,
      paddingVertical: screenHeight*0.02,
      paddingHorizontal: screenWidth*0.05,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    textAnswer: {
      fontSize: (screenHeight + screenWidth)*0.013,
      fontWeight: 'bold',
    },

    containerCenter: {
      fontFamily: 'Inter_400Regular',
        flex: 1,
        backgroundColor: '#3E4C5E',
        alignItems: 'center',
        justifyContent: 'center',
    },

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
