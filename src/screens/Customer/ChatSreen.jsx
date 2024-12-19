import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  IC_Attachment,
  IC_Back,
  IC_Camera,
  IC_Emo,
  IC_Send,
} from '../../../assets/Customer/icons';
import io from 'socket.io-client';
import Message from '../../components/Customer/Message';
import CUSTOM_COLOR from '../../constants/color';

import {firebase} from '../../../firebase/firebase';
import {getUserType} from '../../api/UserApi';
import { BackIcon } from '../../../assets/Customer/svgs';
import FONT_FAMILY from '../../constants/font';

const socket = io("https://shoppingserver-yhbt.onrender.com", {
  path: "/api/Chat/",
});

function ChatScreen({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userInfo, setUserInfo] = useState();
  const adminId = {_id: "66541fed38d9e79683b0b700"};
  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      const res = await getUserType({userId: user.uid});
      setUserInfo(res.data);
      setupSocketListeners(res.data, adminId);
    };

    const setupSocketListeners = (userInfo, item) => {
      if (userInfo && item) {
        socket.emit('getMessages', {userId: userInfo._id, friendId: item._id});

        socket.on('messages', messages => {
          setMessages(messages);
        });

        socket.on('receiveMessage', message => {
          setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
          socket.off('messages');
          socket.off('receiveMessage');
        };
      }
    };
    fetchUserData();
  }, []);

  const handleSendMessage = () => {
    if (userInfo && adminId) {
      const message = {
        senderId: userInfo._id,
        recipientId: adminId._id,
        message: newMessage,
        timeStamp: new Date().toISOString(),
      };
      socket.emit('sendMessage', message);
      //setMessages(prevMessages => [...prevMessages, message]); // Optimistic update
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{padding: 10}} onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerText}>Customer Support</Text>
      </View>

      <ScrollView style={styles.messageContainer}>
        {messages.map((message, index) => (
          <Message
            key={message._id}
            content={message.message}
            time={new Date(message.timeStamp).toLocaleTimeString()}
            isRight={message.senderId === userInfo._id}
          />
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Image source={IC_Emo} style={styles.emojiIcon} />
          <TextInput
            placeholder="Hello, I have a problem"
            style={styles.textInput}
            onChangeText={setNewMessage}
            value={newMessage}
          />
          <Image source={IC_Attachment} style={styles.attachmentIcon} resizeMode="stretch" />
          <Image source={IC_Camera} style={styles.cameraIcon} />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Image source={IC_Send} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.White,
    paddingVertical: '1%',
  },
  backIcon: {
    width: 10,
    height: 20,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  headerText: {
    marginHorizontal: '5%',
    fontSize: 17,
    fontFamily: FONT_FAMILY.Bold,
    color: CUSTOM_COLOR.Black,
  },
  messageContainer: {
    backgroundColor: CUSTOM_COLOR.Gallery,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.Gallery,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.White,
    paddingHorizontal: '2%',
    borderRadius: 25,
    marginHorizontal: '3%',
    marginVertical: '2%',
    width: '80%',
  },
  emojiIcon: {
    width: 20,
    height: 20,
    marginHorizontal: '2%',
  },
  textInput: {
    width: '70%',
  },
  attachmentIcon: {
    width: 10,
    height: 20,
    marginHorizontal: '2%',
  },
  cameraIcon: {
    width: 22,
    height: 20,
    marginLeft: '2%',
  },
  sendButton: {
    height: 45,
    width: 45,
    borderRadius: 30,
    backgroundColor: CUSTOM_COLOR.ChathamsBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
