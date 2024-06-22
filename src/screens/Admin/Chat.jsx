import {View, Text, Image, SafeAreaView, FlatList} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Search from '../../components/Admin/Search';
import UserChat from '../../components/Admin/UserChat';
import CUSTOM_COLOR from '../../constants/color';
import {Acount} from './ViewShopScreen';
import {IC_User} from '../../../assets/Admin/icons';
import {PR_1} from '../../../assets/Customer/images';
import {getAllUsers, getUserType} from '../../api/UserApi';
import {firebase} from '../../../firebase/firebase';
import {getChatSummary} from '../../api/MessageApi';
import { useFocusEffect } from '@react-navigation/native';

function Chat({navigation}) {
  const [imageUrl, setImageUrl] = useState();
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [sumaryChat, setSumaryChat] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  const fetchUsers = async () => {
    try {
      const user = firebase.auth().currentUser;

      const [allUsersRes, userTypeRes] = await Promise.all([
        getAllUsers(),
        getUserType({MaND: user.uid}),
      ]);

      if (allUsersRes.status === 200) {
        setUsers(allUsersRes.data);
      }

      if (userTypeRes.status === 200) {
        setUserInfo(userTypeRes.data);
        const res = await getChatSummary({data: userTypeRes.data})
        setSumaryChat(res.data)
        console.log(res.data)
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <SafeAreaView style={{backgroundColor: CUSTOM_COLOR.White, flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          width: '100%',
          height: 70,
        }}>
        {userInfo.Avatar ? (
          <Image
            source={{uri: userInfo.Avatar}}
            style={{
              aspectRatio: 1,
              borderRadius: 55,
              width: '15%',
              marginLeft: 15,
            }}
          />
        ) : (
          <Image
            source={IC_User}
            style={{
              aspectRatio: 1,
              borderRadius: 55,
              width: '15%',
              marginLeft: 15,
              borderColor: CUSTOM_COLOR.Black,
              borderWidth: 1,
            }}
          />
        )}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 40,
            marginLeft: 10,
            color: CUSTOM_COLOR.Black,
          }}>
          Chat
        </Text>
      </View>
      <View style={{width: '100%', height: 10}} />
      <View style={{width: '90%', height: 45, marginHorizontal: '5%'}}>
        <Search placeholder="Search" onSearch={() => {}} />
      </View>
      <View style={{width: '100%', height: 10}} />
      <View style={{width: '100%', height: '73%'}}>
        <FlatList
          data={sumaryChat}
          renderItem={({item}) => {
            if (item._id === userInfo._id) return null;
            const time = new Date(item.latestTime)
            const hour = time.getHours();
            const minute = time.getMinutes();
            return (
              <UserChat
                key={item._id}
                source={item.Avatar}
                name={item.TenND}
                message={
                  !item.latestMessage
                    ? 'Customer just created an account'
                    : item.latestMessage.senderId === userInfo._id ? `Bạn: ${item.latestMessage.message}`: item.latestMessage.message
                }
                onPress={() => {
                  // setSoLuongChuaDoc(item);

                  navigation.navigate('DetailChat', {item});
                }}
                time={!item.latestMessage ? null : `${hour}:${minute}p`}
                notification={!item.latestMessage ? 0 : item.unreadCount}
                justCreate={
                  !item.latestMessage ? true : false
                }
              />
            );
          }}
          keyExtractor={item => item._id}
        />
      </View>
    </SafeAreaView>
  );
}

export default Chat;
