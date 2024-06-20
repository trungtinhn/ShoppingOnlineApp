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
const datasGeneral = [
  {
    id: '1',
    source: IM_AnhGiay1,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },
  {
    id: '2',
    source: IM_AnhGiay1,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },
  {
    id: '3',
    source: IM_AnhGiay1,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },
  {
    id: '4',
    source: IM_AnhGiay1,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },
  {
    id: '5',
    source: IM_AnhGiay1,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },

]

const dataRecomanded = [
  {
    id: '1',
    source: IM_AnhGiay2,
    title: "Thông báo giảm giá",
    content: "Khuyến mãi siêu ưu đãi giảm giá cực sốc",
    time: '11:30 AM'
  },
  {
    id: '2',
    source: IM_AnhGiay2,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },
  {
    id: '3',
    source: IM_AnhGiay4,
    title: "Thông báo giảm giá",
    content: "Khuyến mãi siêu ưu đãi giảm giá cực sốc",
    time: '11:30 AM'
  },
  {
    id: '4',
    source: IM_AnhGiay2,
    title: "Thông báo khuyến mãi",
    content: "Khuyến mãi siêu ưu đãi giảm giá cực sốc",
    time: '11:30 AM'
  },
  {
    id: '5',
    source: IM_AnhGiay3,
    title: "Thông báo giảm giá",
    content: "Khuyến mãi siêu ưu đãi sale lến đến 50%",
    time: '11:30 AM'
  },

]

function NotificationScreen({ navigation }) {
  const [chatUser, setChatUser] = useState();
  const [isGeneral, setIsCeneral] = useState(1)
  const {numCart} = React.useContext(OrderContext)
  const [notificationPromotion, setNotificationPromotion] = useState([])

  const getDataNotificationPromotion = () => {
    const data = [
      {
        TenKM: 'Khuyến mãi 1',
        ChiTietKM: 'Chi tiết khuyến mãi 1',
        HinhAnhKM: IM_AnhGiay1,
        thoiGianTao: new Date(2024, 3, 24, 10, 30) // Ngày 24/04/2024, lúc 10:30 AM
      },
      {
        TenKM: 'Khuyến mãi 2',
        ChiTietKM: 'Chi tiết khuyến mãi 2',
        HinhAnhKM: IM_AnhGiay2,
        thoiGianTao: new Date(2024, 3, 25, 15, 45) // Ngày 25/04/2024, lúc 3:45 PM
      },
    ];
    setNotificationPromotion(data)
  }

  useEffect(() => {
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
      <FlatList
        data={notificationPromotion}
        renderItem={({ item }) => {

          const hour = item.thoiGianTao.getHours();
          const minute = item.thoiGianTao.getMinutes();
          const day = item.thoiGianTao.getDate();
          const month = item.thoiGianTao.getMonth() + 1; // Month starts from 0
          const year = item.thoiGianTao.getFullYear();


          return (
            <TouchableOpacity>

              <Notify
                source={item.HinhAnhKM}
                title={item.TenKM}
                content={item.ChiTietKM}
                time={`${day}-${month}-${year} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
              />

            </TouchableOpacity>
          )
        }}
      />


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