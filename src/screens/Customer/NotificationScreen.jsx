import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { IC_Home } from '../../../assets/Customer/icons'
import { IM_AnhGiay1, IM_AnhGiay2, IM_AnhGiay3, IM_AnhGiay4 } from '../../../assets/Customer/images'
import Notify from "../../components/Customer/Notify";
import CUSTOM_COLOR from "../../constants/color";
import MessengerLogo from '../../../assets/Admin/svgs/Messenger.svg'
import ShoppingCartLogo from '../../../assets/Customer/svgs/shopping-cart.svg'
import LogoApp from '../../../assets/Customer/svgs/Logo.svg'
import { Badge } from 'react-native-elements';
import { OrderContext } from "../../context/OrderContext";
import { collection, orderBy, query, where, onSnapshot } from "firebase/firestore";
import LoadingComponent from "../../components/LoadingComponent";
import { Firestore, firebase } from "../../../firebase/firebase";

function NotificationScreen({ navigation }) {
  const [chatUser, setChatUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {numCart} = React.useContext(OrderContext)
  const [notificationPromotion, setNotificationPromotion] = useState([])

  const getDataNotificationPromotion = () => {
    // Lấy UID của người dùng hiện tại
    const userId = firebase.auth().currentUser.uid;
  
    // Tạo truy vấn với điều kiện userId và sắp xếp theo Time
    const q = query(
      collection(Firestore, "notification"), 
      where("userId", "==", userId),
      orderBy("time", 'desc')
    );
  
    // Lắng nghe thay đổi trong truy vấn
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setNotificationPromotion(data);
      setIsLoading(false);
    });
  };

  
  useEffect(() => {
    setIsLoading(true)
    getDataNotificationPromotion()
  }, [])

  return (
    <View style={{
      flex: 1,
      backgroundColor: CUSTOM_COLOR.White
    }}>
      <View
        style={{
          width: '100%',
          height: 70,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <View style={{marginLeft: "5%"}}>
          <LogoApp width={130} height={50}></LogoApp>
        </View>
        <View style= {{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              //backgroundColor: CUSTOM_COLOR.Mercury,/
              borderWidth: 1,
              borderColor: CUSTOM_COLOR.Mercury,
              alignItems: 'center',
              justifyContent: 'center',
              // marginVertical: 10,
              // padding: 8,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate('ChatScreen', { chatUser });
            }}>
            {chatUser && chatUser.SoLuongChuaDocCuaCustomer != 0 ? (
              <Badge
                value={chatUser.SoLuongChuaDocCuaCustomer}
                status="error"
                containerStyle={{ position: 'absolute', top: -5, right: -5 }}
              />
            ) : null}

            <MessengerLogo color={CUSTOM_COLOR.Black} />
          </TouchableOpacity>

          <View style={{ width: 10, height: '100%' }} />

          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderWidth: 1,
              borderColor: CUSTOM_COLOR.Mercury,
              alignItems: 'center',
              justifyContent: 'center',
              // marginVertical: 10,
              // padding: 8,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate('ShoppingCard');
            }}>
                {numCart != 0 ? (
                <Badge
                  value={numCart}
                  status="error"
                  containerStyle={{ position: 'absolute', top: -5, right: -5 }}
                />
              ) : null}
            <ShoppingCartLogo>
            </ShoppingCartLogo>
          </TouchableOpacity>
          <View style={{marginLeft: "5%"}}></View>
        </View>
      </View>
      <View style={{ width: '100%', height: 10 }} />

      {isLoading ? 
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingComponent />
      </View>
      :
      <FlatList
        data={notificationPromotion}
        renderItem={({ item }) => {
          const time = item.time.toDate();
          const hour = time.getHours();
          const minute = time.getMinutes();
          const day = time.getDate();
          const month = time.getMonth() + 1; // Month starts from 0
          const year = time.getFullYear();


          return (
            <TouchableOpacity>
              <Notify
                source={item.image}
                title={item.name}
                content={item.description}
                time={`${day}-${month}-${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
              />

            </TouchableOpacity>
          )
        }}
      />
    }


    </View>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

})

export default NotificationScreen