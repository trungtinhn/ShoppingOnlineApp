import React, { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import { Badge } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import Categories from '../../components/Customer/Categories';
import ProductView from '../../components/Customer/ProductView';
import SearchInput from '../../components/Customer/SearchInput';
import PromotionCard from '../../components/Customer/PromotionCard'
import CUSTOM_COLOR from '../../constants/color';
import { PR_1, PR_2, PR_3, PR_4, PR_5 } from '../../../assets/Customer/images';
import MessengerLogo from '../../../assets/Admin/svgs/Messenger.svg'
import ShoppingCartLogo from '../../../assets/Customer/svgs/shopping-cart.svg'
import LogoApp from '../../../assets/Customer/svgs/Logo.svg'
import { Slider } from 'react-native-elements';
import FONT_FAMILY from '../../constants/font';
import { getCategory } from '../../api/CategoryApi';
import { getProductOnsale, getProductTrending } from '../../api/ProductApi';
import { getPromotionCurrent } from '../../api/PromotionApi';
import { OrderContext } from '../../context/OrderContext';
import { getCartByUser } from '../../api/CartApi';
import {firebase} from '../../../firebase/firebase';
function HomeScreen({navigation}) {
  const uidUser = firebase.auth().currentUser.uid
  const {numCart, setNumCart} = React.useContext(OrderContext);
  const [trending, setTrending] = useState([]);
  const [danhmuc, setDanhMuc] = useState([]);
  const [chatUser, setChatUser] = useState();
  const [loadingChatUser, setLoadingChatUser] = useState(false);
  const [idUser, setIdUser] = useState();
  const [dataPromotion, setDataPromotion] = useState([]);
  const [sanpham, setSanPham] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getDanhMuc = async () => {
    const res = await getCategory();
    if(res.status === 200){
      setDanhMuc(res.data);
    }
  }
  const getDataCart = async () => {
    const res = await getCartByUser(uidUser);
    if(res.status === 200){
      if(res.data.products.length > 0){
        setNumCart(res.data.products.length);
      }else{
        setNumCart(0);
      }
    }
  }
    
  const getTrending = async () => {
    try{
      const res = await getProductTrending();
      if(res.status === 200){
        setTrending(res.data);
      }
    }catch (error){
      console.log(error);
    }
  }
  const getSanPhamOnsale = async () => {
    try{
      const res = await getProductOnsale();
      if(res.status === 200){
        setSanPham(res.data);
      }
    }catch(error){
      console.log(error);
    }
  };
  const getDataPromotion = async () => {
    const res = await getPromotionCurrent();
    if(res.status === 200){
      setDataPromotion(res.data);
    }
  }
  useEffect(() => {
    getTrending();
    getSanPhamOnsale();
    getDataPromotion();
    getDanhMuc();
    getDataCart();
  }, []);


  const setSoLuongChuaDocCuaCustomer = async () => {}

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([getTrending(), getSanPhamOnsale(), getDataPromotion(), getDanhMuc()])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, []);

  return (
    <View
      style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}
      nestedScrollEnabled={true}>
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
              borderWidth: 1,
              borderColor: CUSTOM_COLOR.Mercury,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => {
              setSoLuongChuaDocCuaCustomer();
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


        <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Text style={styles.textView}>On sale</Text><View
              style={{
                height: 175,
              }}>
              <Swiper
                autoplay
                loop
                style={{
                  flexDirection: 'row',

                  height: '90%',
                }}>
                {dataPromotion
                  ? dataPromotion.map((promotion, index) => {
                    const timestampBD = promotion.NgayBatDau;
                    const dateBD = dayjs(timestampBD);

                    const dayBD = dateBD.date();
                    const monthBD = dateBD.month();
                    const yearBD = dateBD.year();

                    const timestampKT = promotion.NgayKetThuc
                    const dateKT = dayjs(timestampKT);

                    const dayKT = dateKT.date();
                    const monthKT = dateKT.month();
                    const yearKT = dateKT.year();

                    return (
                      <PromotionCard
                        source={promotion.HinhAnhKM}
                        name={promotion.TenKM}
                        discount={promotion.TiLe * 100}
                        minimum={promotion.DonToiThieu}
                        start={`${dayBD}/${monthBD}/${yearBD}`}
                        end={`${dayKT}/${monthKT}/${yearKT}`}
                        type={promotion.Loai}
                        key={index} />
                    );
                  })
                  : null}
              </Swiper>
            </View><View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: -40,
              }}>
              <Text style={styles.textView}>Trending now</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AllProduct');
                }}>
                <Text style={styles.text}>See all</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: "5%"}}>
              <FlatList
                horizontal={true}
                data={trending}
                showsHorizontalScrollIndicator={false}
                key={item => item._id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      marginHorizontal: -10,
                    }}
                    onPress={() => {
                      const id = item._id;
                      navigation.navigate('ProductDetail', { id });
                    }}>
                    <ProductView
                      source={item.HinhAnhSP[0]}
                      title={item.TenSP}
                      quantity={item.SoLuongDaBan}
                      price={item.GiaGiam} />
                  </TouchableOpacity>
                )}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.textView}>Orther categories</Text>
              <TouchableOpacity>
                <Text style={styles.text}>Explore now</Text>
              </TouchableOpacity>
            </View>

            {danhmuc
              ? danhmuc.map(item => (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('DetailCategory', { item });
                  }}
                  key={item._id}>
                  <Categories source={item.image} title={item.name} />
                </TouchableOpacity>
              ))
              : null}
          </ScrollView>

    </View>
  );
}
const styles = StyleSheet.create({
  textView: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontFamily: FONT_FAMILY.SemiBoldItalic,
    color: CUSTOM_COLOR.FlushOrange,
    fontSize: 20,
  },
  text:{
    fontFamily: FONT_FAMILY.CeraPro,
    color: CUSTOM_COLOR.Black,
    fontStyle: 'italic',
    padding: 15,
    textDecorationLine: 'underline'
    
  }
});

export default HomeScreen;
