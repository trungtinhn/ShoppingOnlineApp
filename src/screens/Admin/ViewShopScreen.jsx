import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CUSTOM_COLOR from '../../constants/color';
import scale from '../../constants/responsive';
import SortDropdown from '../../components/Admin/SortDropdown';
import ProductView from '../../components/Customer/ProductView';
import ItemList from '../../components/Admin/ItemList';
import { backto } from '../../../assets/Admin/icons';
import Search from '../../components/Admin/Search';
import { getAllProducts } from '../../api/ProductApi';
import { getCategory } from '../../api/CategoryApi';

export const Account = {
  name: 'Nguyen Trung Tinh',
  avatar: 'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
  id: '21520115',
  address: 'Binh Tan, Ho Chi Minh',
  phone: '0704408389',
  sex: 'male',
  day: '16/12/2003',
  background: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9z5m7BtaVEQCqDkL5UI2QrBqr1EiCI6-YXA&usqp=CAU',
};

export default function ViewShopScreen({ navigation }) {
  const avatar = 'https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png';
  const [detail, setDetail] = useState(false);
  const [product, setProduct] = useState(true);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleGetProduct = async () => {
    const res = await getAllProducts();
    setProductList(res.data);
    setSearchResults(res.data); // Initialize search results with all products
  }

  const handleGetCategories = async () => {
    const res = await getCategory();
    setCategoryList(res.data);
  }

  useEffect(() =>{
    handleGetCategories();
    handleGetProduct();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setSearchResults(productList); // If query is empty, show all products
      return;
    }
    const filteredProducts = productList.filter(product =>
      product.ProductName.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  if (product && !detail) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <Search onSearch={handleSearch} />
          </View>
          <Image
            style={styles.avatar}
            source={{ uri: Account.avatar }}
            resizeMode="contain"
          />
          <Text style={styles.shopName}>FAUGET</Text>
          <Text style={styles.shopAddress}>{Account.address}</Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>Product</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setProduct(false)} style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>List Item</Text>
          </TouchableOpacity>
        </View>
        <SortDropdown onSelectSort={handleSearch} />
        <View style={styles.productListContainer}>
          <FlatList
            nestedScrollEnabled={true}
            data={searchResults}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductView
                onPress={() => {
                  navigation.navigate('ViewShopProduct', { item });
                }}
                source={item.ProductImages[0]}
                title={item.ProductName}
                price={item.OriginalPrice}
                quantity={item.SoldQuantity}
              />
            )}
          />
        </View>
      </SafeAreaView>
    );
  } else if (!product && !detail) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            {/* <Search onSearch={handleSearch} /> */}
          </View>
          <Image
            style={styles.avatar}
            source={{ uri: Account.avatar }}
            resizeMode="contain"
          />
          <Text style={styles.shopName}>FAUGET</Text>
          <Text style={styles.shopAddress}>{Account.address}</Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setProduct(true)} style={styles.inactiveTab}>
            <Text style={styles.inactiveTabText}>Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>List Item</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%', height: '65%' }}>
          <FlatList
            data={categoryList}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.categoryItem}>
                <ItemList
                  source={item.image}
                  namelist={item.name}
                  numberitem={item.numProduct}
                  onPress={() => navigation.navigate('ViewDetailsinList', { item })}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          {/* <Search onSearch={handleSearch} /> */}
          <Image
            style={styles.avatar}
            source={{ uri: Account.avatar }}
            resizeMode="contain"
          />
          <Text style={styles.shopName}>FAUGET</Text>
          <Text style={styles.shopAddress}>{Account.address}</Text>
        </View>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={() => setDetail(false)} style={styles.backButton}>
            <Image resizeMode="contain" source={backto} style={styles.backButtonImage} />
          </TouchableOpacity>
          <Text style={styles.backButtonText}>List Item</Text>
        </View>
        <View>
          <FlatList
            horizontal={false}
            data={searchResults}
            key={2}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductView
                onPress={() => navigation.navigate('ViewShop2', { item })}
                source={item.ProductImages[0]}
                title={item.ProductName}
                price={item.OriginalPrice}
              />
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: CUSTOM_COLOR.White,
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.LavenderBlush,
  },
  searchContainer: {
    width: '90%',
    height: 50,
    marginHorizontal: '5%',
  },
  avatar: {
    width: scale(72),
    height: scale(72),
    aspectRatio: 1,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: CUSTOM_COLOR.Black,
    marginTop: 5,
  },
  shopName: {
    color: CUSTOM_COLOR.Black,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  shopAddress: {
    color: CUSTOM_COLOR.Gray,
    fontSize: 16,
    marginTop: 2,
  },
  tabContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
  },
  activeTab: {
    width: '50%',
    height: '100%',
    borderBottomWidth: 2,
    borderColor: CUSTOM_COLOR.Red,
    alignItems: 'center',
  },
  inactiveTab: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
  },
  activeTabText: {
    marginTop: 5,
    color: CUSTOM_COLOR.DarkOrange,
    fontSize: 20,
  },
  inactiveTabText: {
    marginTop: 5,
    fontSize: 20,
  },
  productListContainer: {
    width: '100%',
    height: '90%',
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
  },
  backButtonContainer: {
    width: '100%',
    height: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  backButton: {
    width: 17,
    height: 17,
    marginLeft: 18,
    marginTop: 5,
  },
  backButtonImage: {
    width: '100%',
    height: '100%',
  },
  backButtonText: {
    color: CUSTOM_COLOR.Black,
    fontSize: 18,
    marginLeft: 10,
  },
});
