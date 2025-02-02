import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Badge } from 'react-native-elements';
import { getProductByCategory } from '../../api/ProductApi';
import { BackIcon, ShoppingCartIcon } from '../../../assets/Customer/svgs';
import SortDropdown from '../../components/Admin/SortDropdown';
import ProductView from '../../components/Customer/ProductView';
import SearchInput from '../../components/Customer/SearchInput';
import LoadingComponent from '../../components/LoadingComponent';
import { OrderContext } from '../../context/OrderContext';
import navigation from '../../navigator/Login_SignUp/navigation';

function DetailCategoryScreen({ navigation, route }) {
  const { item } = route.params;
  const { numCart, setNumCart } = useContext(OrderContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  const getDataCategory = async () => {
    const res = await getProductByCategory({ MaDM: item._id });
    if (res.status === 200) {
      setItems(res.data);
      setLoading(false);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    getDataCategory();
  }, []);

  useEffect(() => {
    let filteredData = items;

    // Filter items based on search term
    if (searchTerm) {
      filteredData = items.filter((product) =>
        product.TenSP.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort items based on sort type
    switch (sortType) {
      case 'a-z':
        filteredData.sort((a, b) => a.TenSP.localeCompare(b.TenSP));
        break;
      case 'z-a':
        filteredData.sort((a, b) => b.TenSP.localeCompare(a.TenSP));
        break;
      case 'high-to-low':
        filteredData.sort((a, b) => a.GiaGiam - b.GiaGiam);
        break;
      case 'low-to-high':
        filteredData.sort((a, b) => b.GiaGiam - a.GiaGiam);
        break;
      default:
        break;
    }

    setFilteredItems(filteredData);
  }, [searchTerm, sortType, items]);

  return (
    <View style={{ flex: 1 }}>
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
          <BackIcon />
        </TouchableOpacity>
        <View style={{ width: '75%', height: '70%' }}>
          <SearchInput onSearch={handleSearch} />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShoppingCard');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            borderRadius: 10,
          }}>
          {numCart != 0 ? (
            <Badge
              value={numCart}
              status="error"
              containerStyle={{ position: 'absolute', top: -5, right: -5 }}
            />
          ) : null}
          <ShoppingCartIcon />
        </TouchableOpacity>
        <View style={{ width: '1%', height: '100%' }} />
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
          {item.name}
        </Text>

        <Text
          style={{
            fontSize: 17,
            marginHorizontal: 20,
            fontWeight: 'bold',
            marginBottom: 0,
          }}>
          {item.numProduct} products
        </Text>
      </View>
      <SortDropdown onSelectSort={handleSort} />
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LoadingComponent />
        </View>
      ) : (
        <View style={{ height: '100%' }}>
          <FlatList
            data={filteredItems}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    margin: 0,
                  }}
                  onPress={() => {
                    navigation.navigate('ProductDetail', { id: item._id });
                  }}>
                  <ProductView
                    quantity={item.SoLuongDaBan}
                    source={item.HinhAnhSP[0]}
                    title={item.TenSP}
                    price={item.GiaGiam}
                  />
                </TouchableOpacity>
              );
            }}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
}

export default DetailCategoryScreen;
