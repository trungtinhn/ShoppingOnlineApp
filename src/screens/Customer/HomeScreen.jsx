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
function HomeScreen({navigation}) {
  const [trending, setTrending] = useState([]);
  const [danhmuc, setDanhMuc] = useState([]);
  const [chatUser, setChatUser] = useState();
  const [loadingChatUser, setLoadingChatUser] = useState(false);
  const [idUser, setIdUser] = useState();
  const [badgeCart, setBadgeCart] = useState(5);
  const [dataPromotion, setDataPromotion] = useState([]);
  const [search, setSearch] = useState(true);
  const [sanpham, setSanPham] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getDanhMuc = async () => {
    const res = await getCategory();
    if(res.status === 200){
      setDanhMuc(res.data);
    }
  }
    
  const getTrending = async () => {
    const res = await getProductTrending();
    if(res.status === 200){
      setTrending(res.data);
    }
  }
  const getSanPhamOnsale = async () => {
    const res = await getProductOnsale();
    if(res.status === 200){
      setSanPham(res.data);
    }
  };
  const getDataPromotion = () => {
    const data = [
      {
        HinhAnhKM: PR_1,
        TenKM: 'Promotion 1',
        TiLe: 0.2, // Discount rate
        DonToiThieu: '$50', // Minimum purchase
        NgayBatDau: new Date('2024-04-20'), // Start date
        NgayKetThuc: new Date('2024-04-30'), // End date
        Loai: 'Sale', // Type of promotion
      },
      {
        HinhAnhKM: PR_2,
        TenKM: 'Promotion 2',
        TiLe: 0.1,
        DonToiThieu: '$30',
        NgayBatDau: new Date('2024-04-15'),
        NgayKetThuc: new Date('2024-04-25'),
        Loai: 'Discount',
      },
      {
        HinhAnhKM: PR_1,
        TenKM: 'Promotion 1',
        TiLe: 0.2, // Discount rate
        DonToiThieu: '$50', // Minimum purchase
        NgayBatDau: new Date('2024-04-20'), // Start date
        NgayKetThuc: new Date('2024-04-30'), // End date
        Loai: 'Sale', // Type of promotion
      },
      {
        HinhAnhKM: PR_2,
        TenKM: 'Promotion 2',
        TiLe: 0.1,
        DonToiThieu: '$30',
        NgayBatDau: new Date('2024-04-15'),
        NgayKetThuc: new Date('2024-04-25'),
        Loai: 'Discount',
      },
      {
        HinhAnhKM: PR_1,
        TenKM: 'Promotion 1',
        TiLe: 0.2, // Discount rate
        DonToiThieu: '$50', // Minimum purchase
        NgayBatDau: new Date('2024-04-20'), // Start date
        NgayKetThuc: new Date('2024-04-30'), // End date
        Loai: 'Sale', // Type of promotion
      },
      {
        HinhAnhKM: PR_2,
        TenKM: 'Promotion 2',
        TiLe: 0.1,
        DonToiThieu: '$30',
        NgayBatDau: new Date('2024-04-15'),
        NgayKetThuc: new Date('2024-04-25'),
        Loai: 'Discount',
      },
      // Add more objects as needed
    ];
    setDataPromotion(data);
  }
  useEffect(() => {
    getTrending();
    getSanPhamOnsale();
    getDataPromotion();
    getDanhMuc();
  }, []);


  const setSoLuongChuaDocCuaCustomer = async () => {}

  const handleSearch = (searchTerm, data) => {
    if (searchTerm === '') {
      setSearch(true);
    }
    else {
      setSearch(false);
      setSearchTerm(searchTerm);
      const filteredItems = data.filter(item =>
        item.TenSP.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredItems(filteredItems);
    }

  };
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
              // marginVertical: 10,
              // padding: 8,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate('ShoppingCard', { idUser });
            }}>
                {badgeCart != 0 ? (
                <Badge
                  value={badgeCart}
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
                  navigation.navigate('Trending');
                }}>
                <Text style={styles.text}>See all</Text>
              </TouchableOpacity>
            </View><View style={{}}>
              <FlatList
                windowSize={10}
                horizontal={true}
                data={trending}
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
                      price={item.GiaGiam} />
                  </TouchableOpacity>
                )}
                />
            </View><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
