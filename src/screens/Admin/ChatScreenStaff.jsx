import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text, ScrollView, TextInput, StyleSheet } from "react-native";
import { IC_Back, IC_Emo, IC_Send, IC_Attachment, IC_Camera } from "../../../assets/Admin/icons";
import CUSTOM_COLOR from "../../constants/color";
import Message from '../../components/Admin/Message';

function ChatScreenStaff({navigation, route}) {
  const {item} = route.params;

  const [message, setMessage] = useState([]);
  const [chat, setChat] = useState('');

  const getDataMessage = async () => {
   
  };

  const getSoLuongChuaDocCuaCustomer = async () => {

    // Trả về giá trị mặc định của hàm, nếu không có dữ liệu trả về từ getDoc()
    return 0;
  };

  const SendMessage = async () => {

    setChat('');
  };

  useEffect(() => {
    getDataMessage();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: CUSTOM_COLOR.White,
          paddingVertical: '1%',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={IC_Back}
            style={{
              width: 10,
              height: 20,
              marginHorizontal: 20,
              marginVertical: 15,
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <Image
          style={{
            width: 45,
            height: 45,
            borderRadius: 30,
          }}
          source={{uri: item.Avatar}}
        />

        <Text
          style={{
            marginHorizontal: '5%',
            fontSize: 17,
            fontWeight: 'bold',
          }}>
          {item.TenND}
        </Text>
      </View>

      <ScrollView
        style={{
          backgroundColor: CUSTOM_COLOR.Gallery,
        }}>
        {message.map((message, index) => {
          const hour = message.ThoiGian.toDate().getHours();
          const minute = message.ThoiGian.toDate().getMinutes();

          return (
            <Message
              key={index}
              content={message.NoiDung}
              time={`${hour}:${minute}`}
              isRight={!message.LaNguoiMua}
            />
          );
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',

          backgroundColor: CUSTOM_COLOR.Gallery,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: CUSTOM_COLOR.White,
            paddingHorizontal: '2%',
            borderRadius: 25,
            marginHorizontal: '3%',
            marginVertical: '2%',
            width: '80%',
          }}>
          <Image
            style={{
              width: 20,
              height: 20,
              marginHorizontal: '2%',
            }}
            source={IC_Emo}
          />

          <TextInput
            placeholder="Hello, I have a problem"
            style={{
              width: '70%',
            }}
            onChangeText={text => setChat(text)}
            value={chat}
          />

          <Image
            style={{
              width: 10,
              height: 20,
              marginHorizontal: '2%',
            }}
            resizeMode="stretch"
            source={IC_Attachment}
          />
          <Image
            style={{
              width: 22,
              height: 20,
              marginLeft: '2%',
            }}
            source={IC_Camera}
          />
        </View>

        <TouchableOpacity
          style={{
            height: 45,
            width: 45,
            borderRadius: 30,
            backgroundColor: CUSTOM_COLOR.ChathamsBlue,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            SendMessage();
          }}>
          <Image source={IC_Send} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: CUSTOM_COLOR.White
  },
});

export default ChatScreenStaff;