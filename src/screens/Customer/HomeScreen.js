import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { IC_Chat, IC_ShoppingCart} from '../../../assets/Admin/icons'
import Categories from '../../components/Customer/Categories';
import ProductView from '../../components/Customer/ProductView';
import SearchInput from '../../components/Customer/SearchInput';
import CUSTOM_COLOR from '../../constants/color';

function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [danhmuc, setDanhMuc] = useState([]);
  const [chatUser, setChatUser] = useState();
  const [loadingChatUser, setLoadingChatUser] = useState(false);
  const [idUser, setIdUser] = useState();
  const [badgeCart, setBadgeCart] = useState(0);
  const [dataPromotion, setDataPromotion] = useState([]);
  const [search, setSearch] = useState(true);
  const [sanpham, setSanPham] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

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
            borderRadius: 10,
          }}
          onPress={() => {
            // Replace this with your navigation logic
          }}>
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
            borderRadius: 10,
          }}
          onPress={() => {
            // Replace this with your navigation logic
          }}>
          <Image source={IC_ShoppingCart} />
        </TouchableOpacity>
      </View>

      {search ? (
        <>
          <ScrollView>
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
                  onPress={() => { /* Replace this with your navigation logic */ }}
                >
                  <ProductView
                    source={item.HinhAnhSP[0]}
                    title={item.TenSP}
                    price={item.GiaSP}
                  />
                </TouchableOpacity>
              )
            }}
            numColumns={2}
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
