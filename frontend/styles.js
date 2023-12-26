import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    containerCenter: {
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

        alignItems: "center", // Center items vertically
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
      playButton: {
        backgroundColor: "green",
      },
      settingsButton: {
        backgroundColor: "blue",
      },
      quitButton: {
        backgroundColor: "red",
      },
      profileButton: {
        backgroundColor: "purple",
        position: "absolute",
        top: -200, // Adjust the top position
        right: 10, // Adjust the right position
      },
      submitButton: {
        backgroundColor: "orange",
      },
      dailyChallengeButton: {
        backgroundColor: "yellow",
        marginRight: 10,
      },
      leaderboardButton: {
        backgroundColor: "cyan",
      },
      logoutButton: {
        backgroundColor: "gray",
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
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
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
        width: 40, // Adjust the width as needed
        height: 40, // Adjust the height as needed
        marginRight: 8,
      },
      headerButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerButtonText: {
        flex: 1, // Allow text to wrap
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
      },
      
});

export default styles;
