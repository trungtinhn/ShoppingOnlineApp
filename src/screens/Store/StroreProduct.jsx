import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import BackTo from "../../components/Admin/BackTo";
import Status from "../../components/Admin/Status";
import CUSTOM_COLOR from "../../constants/color";
import SearchButton from "../../components/Admin/SearchButton";
import MyProductOne from "../../components/Admin/MyProductOne";
import { getProductsByStatusAndStoreId } from "../../api/ProductApi";
import { getCurrentUserData } from "../../api/UserApi"; // Import API để lấy user data
import { useFocusEffect } from "@react-navigation/native";
import { firebase } from "../../../firebase/firebase";// Import firebase

export default function StroreProduct({ navigation }) {
  const [inventory, setInventory] = useState(true);
  const [Out, setOut] = useState(false);
  const [Wait, setWait] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataOnWait, setDataOnWait] = useState([]);
  const [dataOutOfStock, setDataOutOfStock] = useState([]);
  const [dataInventory, setDataInventory] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [storeId, setStoreId] = useState(null); // Khởi tạo null
  
  // Function để lấy storeId từ user data
  const fetchStoreId = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const userRes = await getCurrentUserData({ userId: user.uid });
        if (userRes.status === 200) {
          setStoreId(userRes.data.storeId);
        }
      }
    } catch (error) {
      console.log('Error fetching storeId:', error);
    }
  };

  const handleSearch = (searchTerm, data) => {
    if (!searchTerm.trim()) {
      setFilteredItems([]);
      return;
    }
    
    const filtered = data.filter(item =>
      item.productName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // Sử dụng API mới với storeId
  const getDataOnWait = async () => {
    try {
      const res = await getProductsByStatusAndStoreId(storeId, 'onwait');
      if (res.status === 200) {
        setDataOnWait(res.data);
      }
    } catch (error) {
      console.log('Error fetching onwait products:', error);
    }
  };

  const getDataOutOfStock = async () => {
    try {
      const res = await getProductsByStatusAndStoreId(storeId, 'outofstock');
      if (res.status === 200) {
        setDataOutOfStock(res.data);
      }
    } catch (error) {
      console.log('Error fetching outofstock products:', error);
    }
  };

  const getDataInventory = async () => {
    try {
      const res = await getProductsByStatusAndStoreId(storeId, 'available');
      if (res.status === 200) {
        setDataInventory(res.data);
      }
    } catch (error) {
      console.log('Error fetching available products:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Lấy storeId trước, sau đó mới load data
      const loadData = async () => {
        await fetchStoreId();
      };
      loadData();
    }, [])
  );

  // useEffect để load data khi storeId thay đổi
  useEffect(() => {
    if (storeId) {
      getDataInventory();
      getDataOnWait();
      getDataOutOfStock();
    }
  }, [storeId]);

  useEffect(() => {
    // Chỉ re-fetch khi searchTerm thay đổi và đã có storeId
    if (storeId && searchTerm) {
      // Reset filtered items when search term changes
      setFilteredItems([]);
    }
  }, [searchTerm]);

  // Render cho tab Inventory
  if (inventory === true) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: CUSTOM_COLOR.White }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Product" />
          <View
            style={{ width: 20, height: 20, marginLeft: '55%', marginTop: 10 }}>
            <SearchButton
              onSearch={searchTerm => handleSearch(searchTerm, dataInventory)}
            />
          </View>
        </View>
        
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="My Inventory"
            Color={CUSTOM_COLOR.DarkOrange}
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            countProduct={dataInventory.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOut(true);
              setInventory(false);
            }}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(true);
              setInventory(false);
            }}
            title="Hidden"
            countProduct={dataOnWait.length}
          />
        </View>
        
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <FlatList
            data={searchTerm ? filteredItems : dataInventory}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => {
              return (
                <MyProductOne
                  source={item.productImages?.[0]}
                  title={item.productName}
                  price={item.originalPrice}
                  soluongtonkho={item.stockQuantity}
                  soluonglove={item.wishlistCount || 0}
                  soluongview={item.viewCount || 0}
                  soluongban={item.soldQuantity || 0}
                  // Chỉ có chức năng xem - bỏ edit, hide, AddAmount
                  onPress={() => navigation.navigate('ViewProduct', { item })}
                />
              );
            }}
          />
        </View>

        <View style={{ width: '100%', height: 10 }} />
      </SafeAreaView>
    );
  }

  // Render cho tab Out of Stock
  if (Out === true) {
    return (
      <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Product" />
          <View
            style={{ width: 20, height: 20, marginLeft: '55%', marginTop: 10 }}>
            <SearchButton
              onSearch={searchTerm => handleSearch(searchTerm, dataOutOfStock)}
            />
          </View>
        </View>
        
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="My Inventory"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOut(false);
              setInventory(true);
            }}
            countProduct={dataInventory.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(true);
              setOut(false);
            }}
            title="Hidden"
            countProduct={dataOnWait.length}
          />
        </View>
        
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <FlatList
            data={searchTerm ? filteredItems : dataOutOfStock}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => {
              return (
                <MyProductOne
                  source={item.productImages?.[0]}
                  title={item.productName}
                  price={item.originalPrice}
                  soluongtonkho={item.stockQuantity}
                  soluonglove={item.wishlistCount || 0}
                  soluongview={item.viewCount || 0}
                  soluongban={item.soldQuantity || 0}
                  // Chỉ có chức năng xem
                  onPress={() => navigation.navigate('ViewProduct', { item })}
                />
              );
            }}
          />
        </View>

        <View style={{ width: '100%', height: 10 }} />
      </SafeAreaView>
    );
  }

  // Render cho tab Hidden
  if (Wait === true) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: CUSTOM_COLOR.White }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Product" />
          <View
            style={{ width: 20, height: 20, marginLeft: '55%', marginTop: 10 }}>
            <SearchButton
              onSearch={searchTerm => handleSearch(searchTerm, dataOnWait)}
            />
          </View>
        </View>
        
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="My Inventory"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(false);
              setInventory(true);
            }}
            countProduct={dataInventory.length}
          />
          <Status
            onPress={() => {
              setWait(false);
              setOut(true);
            }}
            Color={CUSTOM_COLOR.Black}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="Hidden"
            countProduct={dataOnWait.length}
          />
        </View>
        
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <FlatList
            data={searchTerm ? filteredItems : dataOnWait}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item }) => {
              return (
                <MyProductOne
                  source={item.productImages?.[0]}
                  title={item.productName}
                  price={item.originalPrice}
                  soluongtonkho={item.stockQuantity}
                  soluonglove={item.wishlistCount || 0}
                  soluongview={item.viewCount || 0}
                  soluongban={item.soldQuantity || 0}
                  type="Hidden"
                  // Chỉ có chức năng xem
                  onPress={() => navigation.navigate('ViewProduct', { item })}
                />
              );
            }}
          />
        </View>

        <View style={{ width: '100%', height: 10 }} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});