
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import { IC_Back } from '../../../assets/Customer/icons';
import ProductView from '../../components/Customer/ProductView';
import SearchInput from '../../components/Customer/SearchInput';
import SortDropdown from '../../components/Customer/SortDropDown';
import CUSTOM_COLOR from '../../constants/color';
import { BackIcon } from '../../../assets/Customer/svgs';
const url = 'https://firebasestorage.googleapis.com/v0/b/shoppingapp-a20a4.appspot.com/o/images%2Fcategories%2Fproduct_1.jpg?alt=media&token=6c835337-a643-4c0d-98bd-34957a39045b'
function DetailCategoryScreen({navigation, route}) {
  const {item} = route.params;

  //const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
  };
  const handleSort = type => {
    setSortType(type);
  };
  const items = [
    {
      MaSP: 1,
      TenSP: 'San Pham 1',
      HinhAnhSP: url,
      GiaSP: '10000'
    },
    {
      MaSP: 2,
      TenSP: 'San Pham 2',
      HinhAnhSP: url,
      GiaSP: '10000'
    },
    {
      MaSP: 3,
      TenSP: 'San Pham 3',
      HinhAnhSP: url,
      GiaSP: '10000'
    },
    {
      MaSP: 4,
      TenSP: 'San Pham 4',
      HinhAnhSP: url,
      GiaSP: '10000'
    },
    {
      MaSP: 5,
      TenSP: 'San Pham 5',
      HinhAnhSP: url,
      GiaSP: '10000'
    },
  ];

  const getDataCategory = async () => {
    // const q = query(
    //   collection(Firestore, 'SANPHAM'),
    //   where('MaDM', '==', item.MaDM),
    //   where('TrangThai', '==', 'Inventory'),
    // );

    // const unsubscribe = onSnapshot(q, querySnapshot => {
    //   const data = [];
    //   querySnapshot.forEach(doc => {
    //     data.push({
    //       ...doc.data(),
    //     });
    //   });
    //   let sortedItems = data;

    //   if (sortType === 'a-z') {
    //     sortedItems = data.sort((a, b) => a.TenSP.localeCompare(b.TenSP));
    //   } else if (sortType === 'z-a') {
    //     sortedItems = data.sort((a, b) => b.TenSP.localeCompare(a.TenSP));
    //   } else if (sortType === 'low-to-high') {
    //     sortedItems = data.sort((a, b) => a.GiaSP - b.GiaSP);
    //   } else if (sortType === 'high-to-low') {
    //     sortedItems = data.sort((a, b) => b.GiaSP - a.GiaSP);
    //   }
    //   console.log(item.MaDM);

    //   let filteredItems = data;
    //   if (searchTerm != null) {
    //     filteredItems = data.filter(item =>
    //       item.TenSP.toLowerCase().includes(searchTerm.toLowerCase()),
    //     );
    //   } else {
    //     setItems(data);
    //   }
    //   setItems(filteredItems);
    // });
  };
  useEffect(() => {
    getDataCategory();
  }, []); // Gọi lại hàm getDataCategory khi component được tạo lần đầu

  useEffect(() => {
    getDataCategory();
  }, [searchTerm, sortType]); // Gọi lại hàm getDataCategory mỗi khi searchTerm thay đổi
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
            <BackIcon/>
        </TouchableOpacity>
        <View style={{width: '1%', height: '100%'}} />
        <View style={{width: '85%', height: '70%'}}>
          <SearchInput onSearch={handleSearch} />
        </View>
        <View style={{width: '5%', height: '100%'}} />
        {/* <TouchableOpacity
          style={{
            backgroundColor: CUSTOM_COLOR.Mercury,
            alignItems: 'center',
            justifyContent: 'center',
            // margin: 10,
            padding: 8,
            borderRadius: 10,
          }}>
          <Image source={IC_ShoppingCart} />
        </TouchableOpacity> */}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 20,
            marginHorizontal: 30,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Quần
        </Text>

        <Text
          style={{
            fontSize: 17,
            marginHorizontal: 20,
            fontWeight: 'bold',
            marginBottom: 0,
          }}>
          9 sản phẩm
        </Text>
      </View>
      <SortDropdown onChangeText={handleSort} />
      <View
        style={{
          height: '100%',
        }}>
        <FlatList
          data={items}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  margin: 0
                }}
                onPress={() => {
                  navigation.navigate('ProductDetail', {item});
                }}>
                <ProductView
                  quantity={1000}
                  source={item.HinhAnhSP}
                  title={item.TenSP}
                  price={item.GiaSP}
                />
              </TouchableOpacity>
            );
          }}
          numColumns={2}
          //keyExtractor={(item) => item.MASP}
        />
      </View>
    </View>
  );
}

export default DetailCategoryScreen;
