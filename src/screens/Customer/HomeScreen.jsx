import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { IC_Chat, IC_ShoppingCart } from '../../../assets/Admin/icons'
import Swiper from 'react-native-swiper';
import Categories from '../../components/Customer/Categories';
import ProductView from '../../components/Customer/ProductView';
import SearchInput from '../../components/Customer/SearchInput';
import PromotionCard from '../../components/Customer/PromotionCard'
import CUSTOM_COLOR from '../../constants/color';
import { PR_1, PR_2, PR_3, PR_4, PR_5 } from '../../../assets/Customer/images';
import { Slider } from 'react-native-elements';
function HomeScreen({navigation}) {
  const [trending, setTrending] = useState([]);
  const [danhmuc, setDanhMuc] = useState([]);
  const [chatUser, setChatUser] = useState();
  const [loadingChatUser, setLoadingChatUser] = useState(false);
  const [idUser, setIdUser] = useState();
  const [badgeCart, setBadgeCart] = useState(0);
  const [dataPromotion, setDataPromotion] = useState([]);
  const [search, setSearch] = useState(true);
  const [sanpham, setSanPham] = useState([]);
  const getDanhMuc = async () => {
    const data = [
      {
        MaDM: 1,
        TenDM: 'Thể thao',
        AnhDM: PR_1,
      },
      {
        MaDM: 2,
        TenDM: 'Nội trợ',
        AnhDM: PR_2,
      },
    ];
    setDanhMuc(data);
  }
  const getTrending = async () => {
    const data = [
      {
        MaSP: 1,
        TenSP: 'San Pham 1',
        HinhAnhSP: PR_1,
        GiaSP: '10000'
      },
      {
        MaSP: 2,
        TenSP: 'San Pham 2',
        HinhAnhSP: PR_2,
        GiaSP: '10000'
      },
      {
        MaSP: 3,
        TenSP: 'San Pham 3',
        HinhAnhSP: PR_3,
        GiaSP: '10000'
      },
      {
        MaSP: 4,
        TenSP: 'San Pham 4',
        HinhAnhSP: PR_4,
        GiaSP: '10000'
      },
      {
        MaSP: 5,
        TenSP: 'San Pham 5',
        HinhAnhSP: PR_5,
        GiaSP: '10000'
      },
    ];
    setTrending(data);
  }
  const getSanPham = async () => {
    const items = [
      {
        MaSP: 1,
        TenSP: 'San Pham 1',
        HinhAnhSP: PR_1,
        GiaSP: '10000'
      },
      {
        MaSP: 2,
        TenSP: 'San Pham 2',
        HinhAnhSP: PR_2,
        GiaSP: '10000'
      },
      {
        MaSP: 3,
        TenSP: 'San Pham 3',
        HinhAnhSP: PR_3,
        GiaSP: '10000'
      },
      {
        MaSP: 4,
        TenSP: 'San Pham 4',
        HinhAnhSP: PR_4,
        GiaSP: '10000'
      },
      {
        MaSP: 5,
        TenSP: 'San Pham 5',
        HinhAnhSP: PR_5,
        GiaSP: '10000'
      },
    ];
    setSanPham(items);
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
    getSanPham();
    getDataPromotion();
    getDanhMuc();
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

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
        }}>
        <View style={{ width: '5%', height: '100%' }} />

        <View style={{ width: '65%', height: 45 }}>

          <SearchInput
            placeholder="Search product"
            style={{
              width: '70%',
              margin: 10,
            }}
            onSearch={(searchTerm) => handleSearch(searchTerm, sanpham)}

          />
        </View>
        <View style={{ width: 10, height: '100%' }} />
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            backgroundColor: CUSTOM_COLOR.Mercury,
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

          <Image source={IC_Chat} />
        </TouchableOpacity>

        <View style={{ width: 10, height: '100%' }} />

        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            backgroundColor: CUSTOM_COLOR.Mercury,
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
          <Image source={IC_ShoppingCart} />
        </TouchableOpacity>
      </View>

      {search ? (
        <>
          <ScrollView>
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
                <Text style={{ margin: 20 }}>See all</Text>
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
                      navigation.navigate('ProductDetail', { item });
                    }}>
                    <ProductView
                      source={item.HinhAnhSP}
                      title={item.TenSP}
                      price={item.GiaSP} />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.MaSP} />
            </View><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.textView}>Orther categories</Text>
              <TouchableOpacity>
                <Text style={{ margin: 20 }}>Explore now</Text>
              </TouchableOpacity>
            </View>
            {/*
          <FlatList


          data={danhmuc}

          renderItem={({ item }) =>
            <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
              onPress={() => { navigation.navigate('DetailCategory', { item }) }}
            >
              <Categories
                source={item.AnhDM}
                title={item.TenDM}
              />
            </TouchableOpacity>


          }
          keyExtractor={item => item.MaDM}
          /> */}
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
                  key={item.MaDM}>
                  <Categories source={item.AnhDM} title={item.TenDM} />
                </TouchableOpacity>
              ))
              : null}
          </ScrollView>
        </>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={searchTerm ? filteredItems : sanpham}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={{
                  flexDirection: 'row',
                  //justifyContent: 'space-around'
                }}
                  onPress={() => { navigation.navigate('ProductDetail', { item }) }}
                >
                  <ProductView
                    source={item.HinhAnhSP}
                    title={item.TenSP}
                    price={item.GiaSP}
                  />
                </TouchableOpacity>
              )
            }}

            numColumns={2}
          //keyExtractor={(item) => item.MASP}
          />
        </View>
      )}

    </View>
  );
}
const styles = StyleSheet.create({
  textView: {
    marginHorizontal: 15,
    marginVertical: 10,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
    fontSize: 20,
  },
});

export default HomeScreen;
