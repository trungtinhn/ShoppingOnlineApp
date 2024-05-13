import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Image, Text, FlatList } from "react-native";
import LoadingComponent from "../../components/LoadingComponent";
import CUSTOM_COLOR from "../../constants/color";
import Size from "../../constants/size";
import Search from "../../components/Admin/Search";
export default function DetailChat({ navigation }) {
  const [users, setUser] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
  };
  const getUser = async item => {
    //item = item.trim();

  };
  const getDataChat = async () => {
    
  };

  const fetchImageUrl = async (documentId, fieldName) => {
    try {
      
    } catch (error) {
      console.error('Error fetching image URL:', error);
      return null;
    }
  };

  return (
    <SafeAreaView
      style={{ backgroundColor: CUSTOM_COLOR.White, height: Size.DeviceHeight }}>
      {imageUrl ? (
        <>
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
            <Search placeholder="Search" onSearch={handleSearch} />
          </View>
          <View style={{ width: '100%', height: 10 }} />
          <View style={{ width: '100%', height: '73%' }}>
            <FlatList
              data={users}
              renderItem={({ item }) => {
                const hour = item.NoiDungMessageMoi
                  ? item.ThoiGian.toDate().getHours()
                  : null;
                const minute = item.NoiDungMessageMoi
                  ? item.ThoiGian.toDate().getMinutes()
                  : null;

                return (
                  <UserChat
                    //key={item.MaChat}
                    source={item.Avatar}
                    name={item.TenND}
                    message={
                      !item.NoiDungMessageMoi
                        ? 'Customer just created an account'
                        : item.NoiDungMessageMoi.NoiDung
                    }
                    onPress={() => {
                      setSoLuongChuaDoc(item);

                      navigation.navigate('ChatScreenStaff', { item });
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
              keyExtractor={item => item.MaChat}
            />
          </View>
        </>
      ) : (
        <LoadingComponent text="Loading data..." />
      )}
    </SafeAreaView>
  );
}
