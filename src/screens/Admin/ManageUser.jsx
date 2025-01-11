import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AccountCard from '../../components/Admin/AccountCard';
import {IC_User} from '../../../assets/Admin/icons';
import LoadingComponent from '../../components/LoadingComponent';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import Search from '../../components/Admin/Search';
import {getAllUsers, getCurrentUserData, getUserType} from '../../api/UserApi';
import {firebase} from '../../../firebase/firebase';

export const Acount = {
  name: 'Nguyen Trung Tinh',
  avartar:
    'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
  id: '21520115',
  address: 'Binh Tan, Ho Chi Minh',
  phone: '0704408389',
  sex: 'male',
  day: '16/12/2003',
  background:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9z5m7BtaVEQCqDkL5UI2QrBqr1EiCI6-YXA&usqp=CAU',
};

function ManageUser({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [users, setUsers] = useState([]);
  const [userAvata, setUserAvata] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activatedUsers, setActivatedUsers] = useState([]);
  const [unactivatedUsers, setUnactivatedUsers] = useState([]);

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
    const filteredItems = users.filter(item =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredItems(filteredItems);
  };

  // useEffect(() => {
  //   getUserData();
  //   handleGetAllUser();
  //   setIsLoading(false);
  // }, []);
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // const response = await axios.get('https://your-api-url.com/api/users');
      const response = await getAllUsers();
      const users = response.data;

      const activated = users.filter(user => user.storeID);
      const unactivated = users.filter(user => !user.storeID);

      setActivatedUsers(activated);
      setUnactivatedUsers(unactivated);
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to fetch user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const activateUser = async (userId) => {
    try {
      // await axios.put(`https://your-api-url.com/api/users/${userId}/activate`);
      Alert.alert('Success', 'User activated successfully.');
      fetchUsers();
    } catch (error) {
      console.error('Error activating user:', error);
      Alert.alert('Error', 'Failed to activate user. Please try again.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserPress = user => {
    navigation.navigate('EditAccount', {user});
  };

  const handleFunctionPermisson = item => {};
  const handleGetAllUser = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };
  const getUserData = async () => {
    const user = firebase.auth().currentUser;
    const res = await getCurrentUserData({userId: user.uid});
    setUserData(res.data);
  };
  const renderUser = ({item}) =>
    userData._id === item._id ? (
      <></>
    ) : (
      <TouchableOpacity onPress={() => handleUserPress(item)}>
        <View style={{}}>
          <AccountCard
            source={{uri: item.avatar}}
            name={item.fullName}
            userType={item.userType}
            onPress={() => handleFunctionPermisson(item)}
          />
        </View>
      </TouchableOpacity>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%', height: 15}} />
      {users ? (
        <>
          <View style={styles.accountContainer}>
            <View style={styles.avataContainer}>
              {userData.avatar ? (
                <Image
                  source={{uri: userData.avatar}}
                  style={{
                    width: '80%',
                    height: '80%',
                    aspectRatio: 1,
                    borderRadius: 50,
                    resizeMode: 'center',
                    borderColor: CUSTOM_COLOR.Black,
                    borderWidth: 1,
                  }}
                />
              ) : (
                <Image
                  source={IC_User}
                  style={{
                    width: '100%',
                    height: '100%',
                    aspectRatio: 1,
                    borderRadius: 50,
                    resizeMode: 'center',
                    borderColor: CUSTOM_COLOR.Black,
                    borderWidth: 1,
                  }}
                />
              )}
            </View>
            <View style={{width: 15, height: '100%'}} />
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <Text style={[styles.textViewStyles, {fontSize: 20}]}>
                {userData.fullName}
              </Text>
              <View style={{width: '100%', height: 5}} />
              <Text style={[styles.textViewStyles, {fontSize: 15}]}>
                {userData.userType}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              height: 10,
              backgroundColor: CUSTOM_COLOR.SlateGray,
            }}
          />

          <>
            <View style={styles.searchContainer}>
              <View style={{width: '5%', height: '100%'}} />

              <View style={styles.searchViewContainer}>
                <Search
                  placeholder="Search"
                  style={{
                    width: 200,
                    height: 35,
                    backgroundColor: CUSTOM_COLOR.White,
                  }}
                  onSearch={handleSearch}
                />
              </View>
              <View style={{width: '5%', height: '100%'}} />
              <TouchableOpacity style={styles.butAddContainer}>
                <Text
                  style={{color: CUSTOM_COLOR.White}}
                  onPress={() => navigation.navigate('AddAccount')}>
                  Add Account
                </Text>
              </TouchableOpacity>
            </View>
          </>

          <>
            <View style={styles.listViewContainer}>
              {/* <FlatList
                data={searchTerm ? filteredItems : users}
                renderItem={renderUser}
                keyExtractor={(item, index) => index}
              /> */}
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color={CUSTOM_COLOR.FlushOrange}
                  style={styles.loading}
                />
              ) : (
                <>
                  <Text style={styles.sectionTitle}>Activated Users</Text>
                  <FlatList
                    data={activatedUsers}
                    keyExtractor={item => item.id}
                    renderItem={item =>
                      renderUserItem({...item, isActivated: true})
                    }
                    style={styles.list}
                  />

                  <Text style={styles.sectionTitle}>Unactivated Users</Text>
                  <FlatList
                    data={unactivatedUsers}
                    keyExtractor={item => item.id}
                    renderItem={item =>
                      renderUserItem({...item, isActivated: false})
                    }
                    style={styles.list}
                  />
                </>
              )}
            </View>
          </>
          <View style={{width: '100%', height: 20}} />
        </>
      ) : (
        <LoadingComponent text="Loading data..." />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
    flexDirection: 'column',
  },
  accountContainer: {
    width: '100%',
    height: 120,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avataContainer: {
    width: '33%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textViewStyles: {
    fontFamily: FONT_FAMILY.Semibold,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
  },
  searchContainer: {
    width: '100%',
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchViewContainer: {
    width: '60%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  butAddContainer: {
    width: '25%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: CUSTOM_COLOR.FlushOrange,
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    borderRadius: 5,
    borderWidth: 1,
  },
  listViewContainer: {
    flex: 10,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ManageUser;
