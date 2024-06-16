import { View, Text, Image, SafeAreaView, FlatList } from 'react-native'
import React, { useState } from 'react'
import Search from '../../components/Admin/Search'
import UserChat from '../../components/Admin/UserChat'
import CUSTOM_COLOR from '../../constants/color'
import { Acount } from './ViewShopScreen'
import { IC_User } from '../../../assets/Admin/icons'
import { PR_1 } from '../../../assets/Customer/images'

function Chat({navigation}){
  const [imageUrl, setImageUrl] = useState();
  const [users, setUsers ] = useState();
  
  const clone_users = [
    {
      _id: "666a0efb627c6dd4031fd437",
      Avatar: "https://www.vietscape.com/wp-content/uploads/2024/02/mot-so-hinh-anh-ve-lucas-4.jpg",
      TenND: "Nguyễn Trung Tính",
      NoiDungMessageMoi: null, // Không có tin nhắn mới
      //ThoiGian: new Date("2024-05-18T08:30:00"), // Thời gian tạo tài khoản
      SoLuongChuaDoc: 0, // Số lượng tin nhắn chưa đọc
      MoiKhoiTao: true, // Tài khoản mới được tạo
    },
    {
      _id: "6657db6f3624258be376fd41",
      Avatar: "https://www.vietscape.com/wp-content/uploads/2024/02/mot-so-hinh-anh-ve-lucas-4.jpg",
      TenND: "PhatTran",
      NoiDungMessageMoi: {
        NoiDung: "Hello, how can I help you?", // Tin nhắn mới
      },
      //ThoiGian: new Date("2024-05-18T10:15:00"), // Thời gian gửi tin nhắn
      SoLuongChuaDoc: 2, // Số lượng tin nhắn chưa đọc
      MoiKhoiTao: false, // Không phải tài khoản mới được tạo
    },
    // Thêm dữ liệu cho các người dùng khác nếu cần
  ];
  
    return (
      <SafeAreaView style = {{ backgroundColor: CUSTOM_COLOR.White, flex: 1}}>
        <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              width: '100%',
              height: 70,
            }}>
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                style={{
                  aspectRatio: 1,
                  borderRadius: 55,
                  width: '15%',
                  marginLeft: 15,
                }}
              />
            ) : (
              <Image
                source={PR_1}
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
          <View style={{ width: '100%', height: 10 }} />
          <View style={{ width: '90%', height: 45, marginHorizontal: '5%' }}>
            <Search placeholder="Search" onSearch={()=>{}} />
          </View>
          <View style={{ width: '100%', height: 10 }} />
          <View style={{ width: '100%', height: '73%' }}>
            <FlatList
              data={clone_users}
              renderItem={({ item }) => {
                const hour = null;
                const minute =  null;
                return (
                  <UserChat
                    key={item._id}
                    source={item.Avatar}
                    name={item.TenND}
                    message={
                      !item.NoiDungMessageMoi
                        ? 'Customer just created an account'
                        : item.NoiDungMessageMoi.NoiDung
                    }
                    onPress={() => {
                      // setSoLuongChuaDoc(item);

                      navigation.navigate('DetailChat', { item });
                    }}
                    time={!item.NoiDungMessageMoi ? null : `${hour}:${minute}`}
                    notification={
                      !item.NoiDungMessageMoi ? 0 : item.SoLuongChuaDoc
                    }
                    //notification={item.SoLuongChuaDoc}
                    justCreate={
                      !item.NoiDungMessageMoi
                        ? item.MoiKhoiTao
                        : item.MoiKhoiTao
                    }
                  />
                );
              }}
              keyExtractor={item => item._id}
            />
          </View>
      </SafeAreaView>
    )
  }

export default Chat