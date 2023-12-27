import React, { useContext } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import { Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, View, Pressable, Image } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';



const ProfileSettingsPage = ({navigation}) => {
    const { Logout, onPress, title = 'Save' } = useContext(AuthContext);
   
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                <TouchableOpacity  hitSlop={{top: 50, bottom: 50, left: 50, right: 50}} onPress={() => {
                            navigation.navigate('MainPage');
                        }}>
                        <Icon name="chevron-back-outline" size={30} color="white" onPress={() => {
                            navigation.navigate('MainPage');
                        }}/>
                          
                    </TouchableOpacity>
                    
                    <Text style={styles.profileHeaderText}>{"Settings"}</Text>
                </View>
                <View style={{display: 'flex',justifyContent: 'center', alignItems: 'center',}}>
                    <Image source={require('../assets/profileicon2.png')} style={styles.profileSettingsImage} />
                </View>

                <View style={styles.settingsPageTitleRow}>
                    <Text style={{color:'white',}}>{"PROFILE"}</Text>
                </View>

                <View style={styles.settingsPageContentRow}>
                    <Text style={{color:'black',fontWeight: 'bold',}}>{"Username"}</Text>
                    <Text style={{color:'black',}}>{"data"}</Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.settingsPageContentRow}>
                    <Text style={{color:'black',fontWeight: 'bold',}}>{"Email"}</Text>
                    <Text style={{color:'black',}}>{"data"}</Text>
                </View>

                <View style={styles.settingsPageTitleRow}>
                    <Text style={{color:'white',}}>{"ACCOUNT"}</Text>
                </View>

                <TouchableOpacity  style={styles.settingsPageChangeContentRow} onPress={() => {
                            navigation.navigate('ProfileChangePage',{type:"username"});
                        }}>
                    <Text style={{color:'black',fontWeight: 'bold',}}>{"Change username"}</Text>
                 </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity  style={styles.settingsPageChangeContentRow} onPress={() => {
                            navigation.navigate('ProfileChangePage',{type:"password"});
                        }}>
                    <Text style={{color:'black',fontWeight: 'bold',}}>{"Change password"}</Text>
                 </TouchableOpacity>

                <View style={{ backgroundColor: '#fd564d', // Customize the background color
                padding: 10,
                position: 'absolute',
                bottom: 40, // Adjust this value as needed
                left: 0,
                right: 0,
                alignItems: 'center',}}>
                    <Text style={{color:'white',fontWeight: 'bold',}}>{"Delete account"}</Text>
                </View>

                     
                




            </View>
            




        </View>

    )
};

export default ProfileSettingsPage;
{/* <BlueButton onPress={() => { Logout(); }} Text="LOGOUT"  />  */ }