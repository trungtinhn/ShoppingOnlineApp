import React, { useEffect, useState } from 'react';
import {
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
import { IC_User } from '../../../assets/Admin/icons';
import LoadingComponent from '../../components/LoadingComponent';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import Search from '../../components/Admin/Search';
import { getAllUsers, getCurrentUserData, getUserType } from '../../api/UserApi';
import { firebase } from '../../../firebase/firebase';

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

function ManageUser({navigation}){
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [users, setUsers] = useState([]);
  const [userAvata, setUserAvata] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
    // const filteredItems = users.filter(item =>
    //   item.TenND.toLowerCase().includes(searchTerm.toLowerCase()),
    // );
    setFilteredItems(filteredItems);
  };

  useEffect(() => {
    setTimeout(() => {
      // Assume data is fetched here
      // const fetchedData = 'Sample Data';
      // setData(fetchedData);
      getUserData();
      handleGetAllUser();
      setIsLoading(false);
    }, 2000);
    // fetchUserData(firebase.auth().currentUser.uid);
    // fetchImageUrl(firebase.auth().currentUser.uid, 'Avatar').then(url =>
    //   setImageUrl(url),
    // );
    
  }, []);

  const handleUserPress = user => {
    navigation.navigate('EditAccount', { user });
  };


  const handleRessetPassword = (item) => {
    navigation.navigate("ForgetPassWord", {item: item});
  };
  const handleGetAllUser = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  }
const getUserData = async () => {
  const user = firebase.auth().currentUser;
  const res =  await getUserType({MaND: user.uid});
  console.log(res.data)
  setUserData(res.data);
};
  const renderUser = ({ item }) => (
    
   (userData._id === item._id)?(<></>) : (<TouchableOpacity onPress={() => handleUserPress(item)}>
      <View style={{}}>
        <AccountCard
          source={{ uri: item.Avatar }}
          name={item.TenND}
          userType={item.LoaiND}
          onPress={() => handleRessetPassword(item)}
        />
      </View>
    </TouchableOpacity>)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', height: 15 }} />

      {userData ? (
        <>
          <View style={styles.accountContainer}>
            <View style={styles.avataContainer}>
              {userData.Avatar ? (
                <Image
                  source={{ uri: userData.Avatar }}
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
            <View style={{ width: 15, height: '100%' }} />
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={[styles.textViewStyles, { fontSize: 20 }]}>
                {userData.TenND}
              </Text>
              <View style={{ width: '100%', height: 5 }} />
              <Text style={[styles.textViewStyles, { fontSize: 15 }]}>
                {userData.LoaiND}
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
              <View style={{ width: '5%', height: '100%' }} />

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
              <View style={{ width: '5%', height: '100%' }} />
              <TouchableOpacity style={styles.butAddContainer}>
                <Text
                  style={{ color: CUSTOM_COLOR.White }}
                  onPress={() => navigation.navigate('AddAccount')}>
                  Add Account
                </Text>
              </TouchableOpacity>
            </View>
          </>

          <>
            <View style={styles.listViewContainer}>
              {/* Lay list nguoi dung ve hien thi */}
              {/* <AccountCard onPress={() => navigation.navigate('EditAccount')} /> */}
              <FlatList
                data={searchTerm ? filteredItems : users}
                renderItem={renderUser}
                keyExtractor={(item, index) => index}
              />
            </View>
          </>
          <View style={{ width: '100%', height: 20 }} />
        </>
      ) : (
        <LoadingComponent text="Loading data..." />
      )}
    </SafeAreaView>
  );
};
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
