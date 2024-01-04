import React, { useContext, useState, useEffect } from "react";
import BlueButton from "../components/BlueButton";
import AuthContext from "../utils/AuthContext";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ScrollView, Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert, View, Pressable, Image, FlatList } from 'react-native';
import styles from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import GetUserInfo from '../utils/GetUserInfo';
import { API_URL } from '../utils/AuthContext';



const ProfilePage = ({ navigation, route }) => {
    const { Logout, onPress, title = 'Save' } = useContext(AuthContext);


    const [userData, setUserData] = useState(null);
    const [username, setUsername] = useState(null);
    const [points, setPoints] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [following, setFollowing] = useState(null);
    const [email, setEmail] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [weeklyStats, setWeeklystats] = useState(null);
    const [dailyStreak, setDailyStreak] = useState(null);
    const [showAllTimeDropdown, setShowAtllTimeDropdown] = useState(false);
    const [showWeeklyDropdown, setShowWeeklyDropdown] = useState(false);
    const [fill, setFill] = useState(0);
    const [weeklyfill, setWeeklyFill] = useState(0);
    const { token } = route.params

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (token) {
                    // Use the token to fetch user data
                    const data = await GetUserInfo(token);


                    if (data) {
                        // Handle the user data
                        setUserData(data);
                        setUsername(data["username"]);
                        setEmail(data["email"]);
                        setPoints(data["totalScore"]);
                        setDailyStreak[data["streakCount"]]
                    }
                }
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      const fetchUserStats = async () => {
        // Make a request to the backend to fetch weekly statistics
        if (username) {
          try {
            const response = await fetch(API_URL + '/stats/user_stats/' + username, {
              method: 'GET',
              headers: {
                'Token': token,
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch user statistics');
            }
    
            const data = await response.json();
            setUserStats(data);
          } catch (error) {
            console.error(error);
          }
        }
      };
  
      // Call the fetchUserStats function
      fetchUserStats();
    }, [username]);

    useEffect(() => {
      const fetchWeeklyStats = async () => {
        // Make a request to the backend to fetch user statistics
        if (username) {
          try {
            const response = await fetch(API_URL + '/stats/user_weekly_stats/' + username, {
              method: 'GET',
              headers: {
                'Token': token,
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch user statistics');
            }
    
            const data = await response.json();
            setWeeklystats(data);
          } catch (error) {
            console.error(error);
          }
        }
      };
  
      // Call the fetchUserStats function
      fetchWeeklyStats();
    }, [username]);

    // useEffect(() => {
    //   if (userStats) {
    //     const categoryScore = userStats.total_category_score/points * 100; 
    //     setFill(categoryScore);
    //   }
    // }, [userStats]);


    const [selectedTab, setSelectedTab] = useState('points');
    const toggleAllTimeDropdown = () => {
      setShowAtllTimeDropdown(!showAllTimeDropdown);
      // Hide the weekly dropdown when the all time dropdown is toggled
      if (showWeeklyDropdown) {
        setShowWeeklyDropdown(false);
      }
    };

    const toggleWeeklyDropdown = () => {
      setShowWeeklyDropdown(!showWeeklyDropdown);
      // Hide the all time dropdown when the weekly dropdown is toggled
      if (showAllTimeDropdown) {
        setShowAtllTimeDropdown(false);
      }
    }

    const renderPointsView = () => (
        <View style={{backgroundColor:"white", flex:1,}}>
          {/* Your Points View Content */}
          <TouchableOpacity
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'green',
                padding: 10,
                marginVertical: 5,
                borderRadius: 10,
            }}
            >
            <Text style={{ color: 'white', fontSize: 16 }}>
                Daily Streak: {dailyStreak}
            </Text>
            <Image 
                source={require('../assets/fire-icon.png')} 
                style={{ width: 20, height: 20 }}
            />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleWeeklyDropdown}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                Weekly Stats
              </Text>
            </TouchableOpacity>
            {showWeeklyDropdown && (
              <ScrollView style={styles.scrollView}>
                <FlatList
                  data={weeklyStats.category_stats}
                  keyExtractor={(item) => item.category_name}
                  renderItem={({ item }) => (
                    <View>
                      <Text>{item.category_name}</Text>
                      <View>
                        <AnimatedCircularProgress
                          size={150}
                          width={10}
                          fill={item.total_category_score/points * 100}
                          tintColor="#00e0ff"
                          backgroundColor="#3d5875">
                          {
                            (fill) => (
                              <Text>
                                {item.total_category_score}
                              </Text>
                            )
                          }
                        </AnimatedCircularProgress>
                      </View>
                    </View>
                  )}
                />
              </ScrollView>
            )}

            {/* All time Stats Dropdown */}
            <TouchableOpacity onPress={toggleAllTimeDropdown}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
                All-time Stats
              </Text>
            </TouchableOpacity>
            {showAllTimeDropdown && (
              <ScrollView style={styles.scrollView}>
                <FlatList
                  data={userStats.category_stats}
                  keyExtractor={(item) => item.category_name}
                  renderItem={({ item }) => (
                    <View style={{ marginRight: 10 }}>
                      <Text>{item.category_name}</Text>
                        <AnimatedCircularProgress
                          size={150}
                          width={10}
                          fill={item.total_category_score/points * 100}
                          tintColor= '#8ea4d2'
                          backgroundColor="#3d5875">
                          {
                            (fill) => (
                              <Text>
                                {item.total_category_score}
                              </Text>
                            )
                          }
                        </AnimatedCircularProgress>
                    </View>
                  )}
                />
              </ScrollView>
            )}
        </View>
      );
    
      const renderFollowersView = () => (
        <View style={{backgroundColor:"white", flex:1,}}>
          {/* Your Followers View Content */}
          <Text>Followers View</Text>
        </View>
      );
    
      const renderFollowingView = () => (
        <View style={{backgroundColor:"white", flex:1,}}>

          <Text>Following View</Text>
        </View>
      );

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
                            <Text style={{ color: 'white' }}>Followers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, backgroundColor: selectedTab === 'following' ? '#7e8793' : '#3e4c5e', padding: 10, borderRadius:10, justifyContent:"center", alignItems:'center' }}
                            onPress={() => setSelectedTab('following')}
                        >
                            <Text style={{ color: 'white' }}>Following</Text>
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