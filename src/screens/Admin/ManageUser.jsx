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
import {
  getAllStoreOwners,
  getAllUsers,
  getCurrentUserData,
  getUserType,
} from '../../api/UserApi';
import {firebase} from '../../../firebase/firebase';
import {getStoreById, updateStore} from '../../api/StroreApi';
import { act } from 'react-test-renderer';

function ManageUser({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [users, setUsers] = useState([]);
  const [userAvata, setUserAvata] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [filteredItems, setFilteredItems] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  const filterUsers = async () => {
    try {
      // Create new array for filtered results
      const filtered = [];

      // Process each user
      for (const user of users) {
        // Skip users without storeId
        if (!user.storeId) continue;

        // Fetch store data
        const res = await getStoreById({storeId: user.storeId});
        if (!res || !res.data) continue;

        const store = res.data;

        // Filter based on store status
        switch (activeTab) {
          case 'pending':
            if (store.status === 'pending') filtered.push(user);
            break;
          case 'active':
            if (store.status === 'active') filtered.push(user);
            break;
          case 'stop':
            if (store.status === 'stop') filtered.push(user);
            break;
        }
      }
      setFilteredUsers(filtered);
    } catch (error) {
      console.error('Error filtering users:', error);
    }
  };
  useEffect(() => {
    filterUsers();
  }, [activeTab, users]);

  const TabBar = () => (
    <View style={styles.tabContainer}>
      {['pending', 'active', 'stop'].map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => {
            setActiveTab(tab);
          }}>
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
    const filteredItems = users.filter(item =>
      item.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredItems(filteredItems);
  };

  useEffect(() => {
    getUserData();
    handleGetAllUser();
    setIsLoading(false);
  }, []);

  const handleUserPress = user => {
    navigation.navigate('EditAccount', {user});
  };

  const handleActiveAccount = async item => {
    const res = await getStoreById({storeId: item.storeId});
    const store = res.data;
    if (store.status === 'pending') {
      Alert.alert(
        'Active Account',
        'Are you sure to active this account?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const res = await getCurrentUserData({userId: item.userId});
              if (res.data.userType === 'storeOwner') {
                const res = await getStoreById({storeId: item.storeId});
                const store = res.data;
                store.status = 'active';
                await updateStore({storeId: item.storeId, data: store});
              }
              handleGetAllUser();
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      Alert.alert(
        'Stop Account',
        'Are you sure to stop this account?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async () => {
              const res = await getUserType({userId: item.userId});
              if (res.data.userType === 'storeOwner') {
                const res = await getStoreById({storeId: item.storeId});
                const store = res.data;
                store.status = 'stop';
                await updateStore({storeId: item.storeId, data: store});
              }
              handleGetAllUser();
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const handleGetAllUser = async () => {
    const res = await getAllStoreOwners();
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
            isActived={activeTab === 'pending'}
            onPress={() => handleActiveAccount(item)}
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
            </View>
          </>
          <>
            <TabBar />
           <View style={styles.listViewContainer}>
              <FlatList
                data={searchTerm ? filteredItems : filteredUsers}
                renderItem={renderUser}
                keyExtractor={item => item._id}
              />
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
    width: '100',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: CUSTOM_COLOR.FlushOrange,
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
});
export default ManageUser;
