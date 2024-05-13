
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {IC_Back} from '../../../assets/Admin/icons';

import CUSTOM_COLOR from '../../constants/color';
import ProductView from '../../components/Admin/ProductView';
import SearchInput from '../../components/Admin/SearchInput';
import SortDropdown from '../../components/Admin/SortDropdown';
function DetailCategory({navigation, route}) {
  const {category} = route.params;

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortType, setSortType] = useState('');

  const handleSearch = searchTerm => {
    setSearchTerm(searchTerm);
  };
  const handleSort = type => {
    setSortType(type);
  };

  const getDataCategory = async () => {
    
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
        backgroundColor: CUSTOM_COLOR.White,
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
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={IC_Back}
            style={{
              width: 10,
              height: 20,
              margin: 20,
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <View style={{width: '85%', height: '80%'}}>
          <SearchInput onSearch={handleSearch} />
        </View>
        <View style={{width: '5%', height: '100%'}} />
        {/* <TouchableOpacity
          style={{
            backgroundColor: CUSTOM_COLOR.Mercury,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
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
          {category.TenDM}
        </Text>

        <Text
          style={{
            fontSize: 17,
            marginHorizontal: 20,
            fontWeight: 'bold',
            marginBottom: 0,
          }}>
          {items.length} sản phẩm
        </Text>
      </View>
      <SortDropdown onSelectSort={handleSort} />
      <View
        style={{
          height: '80%',
        }}>
        <FlatList
          data={items}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  //justifyContent: 'space-around'
                }}
                onPress={() => {
                  navigation.navigate('ViewShop2', {item});
                }}>
                <ProductView
                  source={item.HinhAnhSP[0]}
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

export default DetailCategory;
