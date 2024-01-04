import React, { useContext, useState, useEffect } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import { Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, View, Pressable, Image,FlatList } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import GetUserInfo from '../utils/GetUserInfo';
import GetFollowers from '../utils/GetFollowers';
import GetFollowing from '../utils/GetFollowing';



const ProfilePage = ({ navigation, route }) => {
    const { Logout, onPress, title = 'Save' } = useContext(AuthContext);


    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState(null);
    const [points, setPoints] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [followersCount, setFollowersCount] = useState(null);
    const [followingCount, setFollowingCount] = useState(null);
    const [following, setFollowing] = useState(null);
    const [email, setEmail] = useState(null);
    const { token } = route.params

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (token) {
                    // Use the token to fetch user data
                    const data = await GetUserInfo(token);
                    const followers =await GetFollowers(token);
                    const following =await GetFollowing(token);
     


                    if (data) {
                        // Handle the user data
                        setUserData(data);
                        setUsername(data["username"]);
                        setEmail(data["email"]);
                        setPoints(data["totalScore"]);
                    }
                    if(followers){
                        setFollowers(followers);
                        setFollowing(following);
                        setFollowersCount(followers["total"])
                        setFollowingCount(following["total"])

                    }
                }
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    const [selectedTab, setSelectedTab] = useState('points');

    const renderPointsView = () => (
        <View style={{backgroundColor:"white", flex:1,}}>
          {/* Your Points View Content */}
          <Text>Points View</Text>
        </View>
      );
    
      const renderFollowersView = () => (
        <View style={{backgroundColor:"white", flex:1,}}>
           
          <FlatList
                    data={followers["results"]}
                    keyExtractor={(item) => item}
                    renderItem={renderUser}
                />
        </View>
      );
    
      const renderFollowingView = () => (
        <View style={{backgroundColor:"white", flex:1,}}>
           
        <FlatList
                  data={following["results"]}
                  keyExtractor={(item) => item}
                  renderItem={renderUser}
              />
      </View>
      );

      const renderUser = ({ item, index }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'white', borderWidth: 1, borderColor: 'gray', borderRadius:10, alignItems:'center' }}>
             <Image source={require('../assets/profileicon2.png')} style={{width: 40, height: 40,}} />
            <Text style={{ fontSize: 18,justifyContent:'center' }}>{`${item}`}</Text>   

             <TouchableOpacity onPress={() => handleUnfollow(item.username)} style={{ backgroundColor: '#ff453a', borderRadius: 15, padding: 10, marginLeft: 'auto' }}>
                <Text style={{ color: 'white',borderRadius:10 }}>Remove</Text>
              </TouchableOpacity>
        </View>
    );

    const handleUnfollow = async (usernameToUnfollow) => {
        try {
          
        

          const updatedFollowers = await UnfollowUser(currentUser, usernameToUnfollow);
      
          // Update the followers state with the updated list
          setFollowers(updatedFollowers["results"]);
        } catch (error) {
          console.error('Error handling unfollow:', error);
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                    <TouchableOpacity hitSlop={{ top: 50, bottom: 50, left: 50, right: 50 }} onPress={() => {
                        navigation.navigate('MainPage');
                    }}>
                        <Icon name="chevron-back-outline" size={30} color="white" onPress={() => {
                            navigation.navigate('MainPage');
                        }} />

                    </TouchableOpacity>

                    <Text style={styles.profileHeaderText}>{"Profile"}</Text>
                </View>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 10 }}>
                    <Image source={require('../assets/profileicon2.png')} style={styles.profileSettingsImage} />
                    <Text style={{ color: 'white', fontSize: 20, paddingBottom: 15 }}>{username}</Text>

                    <TouchableOpacity style={{ backgroundColor: '#8ea4d2', width: 200, height: 50, alignItems: "center", justifyContent: 'center', borderRadius: 10 }} onPress={() => {
                        navigation.navigate('ProfileSettingsPage', { type: "password", token: token });
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', }}>{"Edit"}</Text>
                    </TouchableOpacity>

                </View>

                <View>
                    {/* Buttons Row */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, height:60 }}>
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: selectedTab === 'points' ? '#7e8793' : '#3e4c5e', padding: 10, borderRadius:10, justifyContent:"center", alignItems:'center' }}
                            onPress={() => setSelectedTab('points')}
                        >
                            <Text style={{ color: 'white',  textAlign: 'center', textAlignVertical: 'center'  }}>{points+"\n points"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: selectedTab === 'followers' ? '#7e8793' : '#3e4c5e', padding: 10, borderRadius:10, justifyContent:"center", alignItems:'center' }}
                            onPress={() => setSelectedTab('followers')}
                        >
                            <Text style={{color: 'white',  textAlign: 'center', textAlignVertical: 'center' }}>{followersCount +"\n Followers"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: selectedTab === 'following' ? '#7e8793' : '#3e4c5e', padding: 10, borderRadius:10, justifyContent:"center", alignItems:'center' }}
                            onPress={() => setSelectedTab('following')}
                        >
                            <Text style={{ color: 'white',  textAlign: 'center', textAlignVertical: 'center' }}>{followingCount +"\n Following"}</Text>
                        </TouchableOpacity>
                    </View>

                    
                </View>
                    {selectedTab === 'points' && renderPointsView()}
                    {selectedTab === 'followers' && renderFollowersView()}
                    {selectedTab === 'following' && renderFollowingView()}









            </View>





        </View>

    )
};

export default ProfilePage;
{/* <BlueButton onPress={() => { Logout(); }} Text="LOGOUT"  />  */ }