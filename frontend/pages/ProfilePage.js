import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { API_URL } from '../utils/AuthContext';
import GetFollowers from '../utils/GetFollowers';
import GetFollowing from '../utils/GetFollowing';
import GetUserInfo from '../utils/GetUserInfo';
import UnfollowUser from '../utils/UnfollowUser';


const ProfilePage = ({ navigation, route }) => {
    const [username, setUsername] = useState(null);
    const [points, setPoints] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [followersCount, setFollowersCount] = useState(null);
    const [followingCount, setFollowingCount] = useState(null);
    const [following, setFollowing] = useState(null);

    const [userStats, setUserStats] = useState(null);
    const [weeklyStats, setWeeklystats] = useState(null);
    const [dailyStreak, setDailyStreak] = useState(0);
    const [showAllTimeDropdown, setShowAtllTimeDropdown] = useState(false);
    const [showWeeklyDropdown, setShowWeeklyDropdown] = useState(false);
  
    const { token } = route.params

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    // Use the token to fetch user data
                    const data = await GetUserInfo(token);
                    const followers = await GetFollowers(token);
                    const following = await GetFollowing(token);
                    if (data) {
                        // Handle the user data
                        setUsername(data["username"]);
                        setPoints(data["totalScore"]);
                        setDailyStreak(data["streakCount"])
                    }
                    if(followers){
                        setFollowers(followers);
                        setFollowing(following);
                        setFollowersCount(followers["total"])
                        setFollowingCount(following["total"])
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
      const fetchUserStats = async () => {
        // Make a request to the backend to fetch weekly statistics
        if (username) {
          try {
            const response = await fetch(API_URL + '/stats/' + username, {
              method: 'GET',
              headers: {
                'Token': token,
                'Content-Type': 'application/json',
              },
            });
    
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
            const response = await fetch(API_URL + '/stats/weekly/' + username, {
              method: 'GET',
              headers: {
                'Token': token,
                'Content-Type': 'application/json',
              },
            });
    
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
              <Text style={{ fontSize: 18, fontWeight: 'bold', backgroundColor: "rgb(142,164,210)", color: "#FFFFFF", padding: 10 }}>
                Weekly Stats
              </Text>
            </TouchableOpacity>
            {showWeeklyDropdown && (
                <FlatList
                  data={weeklyStats != null ? weeklyStats.category_stats : null}
                  numColumns={3}
                  contentContainerStyle={{alignSelf: "center"}}
                  keyExtractor={(item) => item.category_name}
                  renderItem={({ item }) => (
                    <View style={{width: 100, paddingVertical: 10, marginHorizontal: 10}}>
                        <AnimatedCircularProgress
                          size={100}
                          width={10}
                          fill={item.total_category_score/points * 100}
                          tintColor="#00e0ff"
                          backgroundColor="#3d5875">
                          {
                            (fill) => (
                              <Text style={{fontSize: 30}}>
                                {item.total_category_score}
                              </Text>
                            )
                          }
                        </AnimatedCircularProgress>
                      <Text style={{fontSize: 16, fontWeight: "bold", textAlign: "center"}}>{item.category_name}</Text>
                    </View>
                  )}
                />
            )}

            {/* All time Stats Dropdown */}
            <TouchableOpacity onPress={toggleAllTimeDropdown}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', backgroundColor: "rgb(142,164,210)", color: "#FFFFFF", padding: 10, marginTop: 2 }}>
                All-time Stats
              </Text>
            </TouchableOpacity>
            {showAllTimeDropdown && (
                <FlatList
                  data={userStats != null ? userStats.category_stats : null}
                  numColumns={3}
                  contentContainerStyle={{alignSelf: "center"}}
                  keyExtractor={(item) => item.category_name}
                  renderItem={({ item }) => (
                    <View style={{ paddingVertical: 10, width: 100, marginHorizontal: 10}}>
                        <AnimatedCircularProgress
                          size={100}
                          width={10}
                          fill={item.total_category_score/points * 100}
                          tintColor= '#8ea4d2'
                          backgroundColor="#3d5875">
                          {
                              (fill) => (
                                  <Text style={{fontSize: 30}}>
                                {item.total_category_score}
                              </Text>
                            )
                        }
                        </AnimatedCircularProgress>
                        <Text style={{fontSize: 16, fontWeight: "bold", textAlign: "center"}}>{item.category_name}</Text>
                    </View>
                  )}
                />
            )}
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

             <TouchableOpacity onPress={() => handleUnfollow(item)} style={{ backgroundColor: '#ff453a', borderRadius: 15, padding: 10, marginLeft: 'auto' }}>
                <Text style={{ color: 'white',borderRadius:10 }}>Remove</Text>
              </TouchableOpacity>
        </View>
    );

    const handleUnfollow = async (usernameToUnfollow) => {
        try {
          await UnfollowUser(token, usernameToUnfollow);
          const updatedFollowers = await GetFollowing(token);
          // Update the followers state with the updated list
          setFollowing(updatedFollowers["results"]);
          setFollowingCount(updatedFollowers["total"]);
        } catch (error) {
          console.error('Error handling unfollow:', error);
        }
      };

    return (
        <>
        <SafeAreaView style={styles.container} edges={['right', 'top', 'left']}>
            <View style={styles.container}>
                <View style={styles.profileHeader}>
                    <Icon.Button backgroundColor="rgba(0,0,0,0)" name="chevron-back-outline" size={30} color="white" iconStyle={{marginRight: 0}} onPress={() => {
                        navigation.navigate('MainPage');
                    }}/>

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
                            <Text style={{ color: 'white',  textAlign: 'center', textAlignVertical: 'center'  }}>{points+"\n Points"}</Text>
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
        </SafeAreaView>
        <SafeAreaView style={{flex:0, backgroundColor: "#fff"}} edges={['right', 'bottom', 'left']}></SafeAreaView>
        </>
    )
};

export default ProfilePage;
