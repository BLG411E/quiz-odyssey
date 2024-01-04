import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import GetAllUserScoreData from '../utils/GetAllUserScoreData';
import GetCategories from '../utils/GetCategories';
import { SafeAreaView } from "react-native-safe-area-context";

const LeaderboardPage = ({ route, navigation }) => {
    const [userList, setUserList] = useState([]);
    const [data,setData] = React.useState([]);
    const [selected, setSelected] = useState("");
    const getUserDataFromDatabase = async () => {
        const users = await GetAllUserScoreData();
        setUserList(users["results"])
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUserDataFromDatabase();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const categories = await GetCategories();

            let newArray = categories.map((item) => {
                return {key: item[0], value: item[1]}
              })
              setData(newArray);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchCategories();
      }, []);

    const renderUser = ({ item, index }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'white' }}>
            <Text style={{ fontSize: 18 }}>{`${index + 1}. ${item.username}`}</Text>
            <Text style={{ fontSize: 18 }}>{`Score: ${item.score}`}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileHeader}>
                <Icon.Button backgroundColor="rgba(0,0,0,0)" name="chevron-back-outline" size={30} color="white" iconStyle={{marginRight: 0}} onPress={() => {
                    navigation.navigate('MainPage');
                }}/>
                <Text style={styles.profileHeaderText}>{"Leaderboards"}</Text>
            </View>

            <View style={{ padding: 10 }}>
                <View style={{ paddingBottom: 10 }}>
                    <SelectList style={{ backgroundColor: "#000", textColor: 'white' }}
                        textColor="white"
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        save="value"
                    />
                </View>
                <FlatList
                    data={userList}
                    keyExtractor={(item) => item.username}
                    renderItem={renderUser}
                />
            </View>
        </SafeAreaView>
    )
};

export default LeaderboardPage;
