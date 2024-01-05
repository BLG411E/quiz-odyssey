import React, { useEffect, useState } from "react";
import { Button, FlatList, Pressable, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import GetAllUserScoreData from '../utils/GetAllUserScoreData';
import GetCategories from '../utils/GetCategories';
import GetLeaderboardData from "../utils/GetLeaderboardData";
import GetUserInfo from '../utils/GetUserInfo';

const LeaderboardPage = ({ route, navigation }) => {
  const [userList, setUserList] = useState([]);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selected, setSelected] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const { token } = route.params;

  const getUserDataFromDatabase = async () => {
    const users = await GetAllUserScoreData(token);
    const userData = await GetUserInfo(token);

    setUserList(users["results"]);
    setUserData(userData);
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
          return { key: item[0], value: item[1] };
        });
        setData(newArray);

      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const fetchLeaderboardData = async (category) => {
    const leaderboardData = await GetLeaderboardData(token, category);
    setUserList(leaderboardData.results);
  };

  useEffect(() => {

    if (selected) {
      const selectedCategoryIndex = data.find(item => item.value === selected);
      // fetchLeaderboardData(selectedCategoryIndex["key"]); // TODO: Endpoint
    }
  }, [selected]);

  const renderUser = ({ item, index }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (index >= startIndex && index < endIndex) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: 'white', backgroundColor: item.username === userData["username"] ? '#ffc15e' : 'white', }}>
          <Pressable onPress={() => { navigation.navigate("ProfilePage", { viewed_user: item.username }) }}>
            <Text style={{ fontSize: 18 }}>{`${index + 1}. ${item.username}`}</Text>
            <Text style={{ fontSize: 18 }}>{`Score: ${item.score}`}</Text>
          </Pressable>
        </View>
      );
    }

    return null;
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(userList.length / itemsPerPage);
    setCurrentPage(currentPage + 1 > totalPages ? totalPages : currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Icon.Button backgroundColor="rgba(0,0,0,0)" name="chevron-back-outline" size={30} color="white" iconStyle={{ marginRight: 0 }} onPress={() => {
          navigation.navigate('MainPage');
        }} />
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Previous Page" onPress={handlePrevPage} disabled={currentPage === 1} />
          <Button title="Next Page" onPress={handleNextPage} disabled={currentPage * itemsPerPage >= userList.length} />
        </View>
      </View>
    </SafeAreaView>
  )
};

export default LeaderboardPage;