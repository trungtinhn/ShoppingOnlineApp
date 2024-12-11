import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import BackTo from "../../components/Admin/BackTo";
import ButtonDetail from "../../components/Admin/ButtonDetail";
import Status from "../../components/Admin/Status";
import CUSTOM_COLOR from "../../constants/color";
import SearchButton from "../../components/Admin/SearchButton";
import MyProductOne from "../../components/Admin/MyProductOne";
import { getProductAvailable, getProductOnwait, getProductOutofstock, setProductStatus } from "../../api/ProductApi";
export default function MyProduct({navigation}) {
  const [inventory, setinventory] = useState(true);
  const [Out, setOut] = useState(false);
  const [Wait, setWait] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataOnWait, setDataOnWait] = useState([]);
  const [dataOutOfStock, setDataOutOfStock] = useState([]);
  const [dataInventory, setDataInventory] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const handleSearch = (searchTerm, data) => {
    
  };
  const ConfirmProduct = item => {
    
  };

  const HideSanPham = async item => {
    const res = await setProductStatus({productId: item._id, status: "onwait"});
    if(res.status === 200){
     getDadaOnWait();
    }else{
      console.log(res);
    }
  };
  const ShowSanPham = async item => {
    const res = await setProductStatus({productId: item._id, status: "available"});
    if(res.status === 200){
      getDadaInventory();
    }else{
      console.log(res);
    }
  };

  const getDadaOnWait = async () => {
    const res = await getProductOnwait();
    setDataOnWait(res.data);
  };

  const getDadaOutOfStock = async () => {
    const res = await getProductOutofstock();
    setDataOutOfStock(res.data);
  };

  const getDadaInventory = async () => {
    const res = await getProductAvailable();
    setDataInventory(res.data);
    if(res.status === 200){
      
    }else{
      console.log(res.err)
    }
  };

  useEffect(() => {
    getDadaInventory()
    getDadaOnWait()
    getDadaOutOfStock();
  }, [dataOnWait.length, dataInventory.length, dataOutOfStock.length, searchTerm]);

  if (inventory == true) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: CUSTOM_COLOR.White}}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Product" />
          <View
            style={{width: 20, height: 20, marginLeft: '55%', marginTop: 10}}>
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
            title="My inventory"
            Color={CUSTOM_COLOR.DarkOrange}
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            countProduct={dataInventory.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOut(true), setinventory(false);
            }}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(true), setinventory(false);
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
            horizontal="true"
            data={searchTerm ? filteredItems : dataInventory}
            renderItem={({item}) => {
              return (
                <MyProductOne
                  source={item.ProductImages[0]}
                  title={item.ProductName}
                  price={item.OriginalPrice}
                  soluongtonkho={item.StockQuantity}
                  soluonglove={item.WishlistCount}
                  soluongview={item.ViewCount}
                  soluongban={item.SoldQuantity}
                  edit={() => navigation.navigate('EditProduct', {item})}
                  hide={() => HideSanPham(item)}
                  AddAmount={() => navigation.navigate('ImportProduct', {item})}
                />
              );
            }}
          />
        </View>

        <View style={{width: '100%', height: 10}} />
        <>
          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: CUSTOM_COLOR.White,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: 55,
                flexDirection: 'row',
                marginHorizontal: '5%',
                backgroundColor: CUSTOM_COLOR.White,
              }}>
              <ButtonDetail
                style={{width: '100%', height: '90%'}}
                color={CUSTOM_COLOR.DarkOrange}
                title="ADD A NEW PRODUCT"
                onPress={() => navigation.navigate('AddProduct')}
              />
            </View>
          </View>
        </>
      </SafeAreaView>
    );
  }
  if (Out == true) {
    return (
      <SafeAreaView style={{backgroundColor: CUSTOM_COLOR.White, flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Product" />
          <View
            style={{width: 20, height: 20, marginLeft: '55%', marginTop: 10}}>
            <SearchButton
              onSearch={searchTerm => handleSearch(searchTerm, dataOutOfStock)}
            />
          </View>

          {/* <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={SearchIcon}
              style={{width: 20, height: 20, marginLeft: '70%', marginTop: 10}}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
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
            title="My invantory"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOut(false), setinventory(true);
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
              setWait(true), setOut(false);
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
            horizontal="true"
            data={searchTerm ? filteredItems : dataOutOfStock}
            renderItem={({item}) => {
              return (
                <MyProductOne
                  source={item.ProductImages[0]}
                  title={item.ProductName}
                  price={item.OriginalPrice}
                  soluongtonkho={item.StockQuantity}
                  soluonglove={item.WishlistCount}
                  soluongview={item.ViewCount}
                  soluongban={item.StockQuantity}
                  edit={() => navigation.navigate('EditProduct')}
                />
              );
            }}
          />
        </View>

        <View style={{width: '100%', height: 10}} />
        <>
          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: CUSTOM_COLOR.White,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: 55,
                flexDirection: 'row',
                marginHorizontal: '5%',
                backgroundColor: CUSTOM_COLOR.White,
              }}>
              <ButtonDetail
                style={{width: '100%', height: '90%'}}
                color={CUSTOM_COLOR.DarkOrange}
                title="ADD A NEW PRODUCT"
                onPress={() => navigation.navigate('AddProduct')}
              />
            </View>
          </View>
        </>
      </SafeAreaView>
    );
  }
  if (Wait == true) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: CUSTOM_COLOR.White}}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 15,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Product" />
          <View
            style={{width: 20, height: 20, marginLeft: '55%', marginTop: 10}}>
            <SearchButton
              onSearch={searchTerm => handleSearch(searchTerm, dataOnWait)}
            />
          </View>

          {/* <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={SearchIcon}
              style={{width: 20, height: 20, marginLeft: '70%', marginTop: 10}}
              resizeMode="contain"
            />
          </TouchableOpacity> */}
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
            title="My invantory"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setWait(false), setinventory(true);
            }}
            countProduct={dataInventory.length}
          />
          <Status
            onPress={() => {
              setWait(false), setOut(true);
            }}
            Color={CUSTOM_COLOR.Black}
            title="Out of Stock"
            countProduct={dataOutOfStock.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="Hidđen"
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
            horizontal="true"
            data={searchTerm ? filteredItems : dataOnWait}
            renderItem={({item}) => {
              return (
                <MyProductOne
                  source={item.ProductImages[0]}
                  title={item.ProductName}
                  price={item.OriginalPrice}
                  soluongtonkho={item.StockQuantity}
                  soluonglove={item.WishlistCount}
                  soluongview={item.ViewCount}
                  soluongban={item.StockQuantity}
                  type="Hidden"
                  show={() => ShowSanPham(item)}
                />
              );
            }}
          />
        </View>

        <View style={{width: '100%', height: 10}} />
        <>
          <View
            style={{
              width: '100%',
              height: 60,
              backgroundColor: CUSTOM_COLOR.White,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                height: 55,
                flexDirection: 'row',
                marginHorizontal: '5%',
                backgroundColor: CUSTOM_COLOR.White,
              }}>
              <ButtonDetail
                style={{width: '100%', height: '90%'}}
                color={CUSTOM_COLOR.DarkOrange}
                title="ADD A NEW PRODUCT"
                onPress={() => navigation.navigate('AddProduct')}
              />
            </View>
          </View>
        </>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
