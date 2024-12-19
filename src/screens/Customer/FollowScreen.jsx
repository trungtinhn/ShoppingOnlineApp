import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl
} from 'react-native';
import { Badge } from 'react-native-elements';
import { IC_Heart3X } from '../../../assets/Customer/icons';
import Button from '../../components/Customer/Button';
import ProductView from '../../components/Customer/ProductView';
import SearchInput from '../../components/Customer/SearchInput';
import CUSTOM_COLOR from '../../constants/color';
import { ShoppingCartIcon } from '../../../assets/Customer/svgs';
import MessengerLogo from '../../../assets/Admin/svgs/Messenger.svg';
import { getLikeByUser } from '../../api/LikeApi';
import { firebase } from '../../../firebase/firebase';
import { knnRecommendLike } from '../../api/KnnApi';
import LoadingComponent from '../../components/LoadingComponent';
import { OrderContext } from '../../context/OrderContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInputContainer: {
    width: '65%',
    height: 45,
  },
  iconButton: {
    width: 45,
    height: 45,
    backgroundColor: CUSTOM_COLOR.White,
    borderColor: CUSTOM_COLOR.LightGray,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 17,
    marginVertical: 10,
  },
  productListContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  productItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 0,
  },
  productLikedText: {
    marginLeft: 20,
    marginTop: 15,
    fontSize: 20,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
});

function FollowScreen({ navigation }) {
  const uidUser = firebase.auth().currentUser.uid;
  const [chatUser, setChatUser] = useState();
  const {numCart, setNumCart} = React.useContext(OrderContext);
  const [data, setSanPham] = useState([]);
  const [dataRecommendLike, setDataRecommendLike] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = searchTerm => {
    // Implement search functionality
  };

  const getDataYeuThich = async () => {
    const res = await getLikeByUser(uidUser);
    if (res.status === 200) {
      setSanPham(res.data);
    } else {
      console.log(res);
    }
  };
  const getDataRecommendLike = async () => {
    const res = await knnRecommendLike({ userId: uidUser });
    if (res.status === 200) {
      setDataRecommendLike(res.data);
      setIsLoading(false);
    } else {
      console.log(res);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataYeuThich();
    getDataRecommendLike();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getDataYeuThich();
    await getDataRecommendLike();
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: CUSTOM_COLOR.White }}>
      <View style={styles.header}>
        <View style={{ width: '5%', height: '100%' }} />
        <View style={styles.searchInputContainer}>
          <SearchInput
            placeholder="Search product"
            style={{ width: '70%', margin: 10 }}
            onPressIn={() => navigation.navigate('Searching')}
            onSearch={handleSearch}
          />
        </View>
        <View style={{ width: 10, height: '100%' }} />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            //setSoLuongChuaDocCuaCustomer();
            navigation.navigate('ChatScreen');
          }}>
          {/* {chatUser && chatUser.SoLuongChuaDocCuaCustomer != 0 && (
            <Badge
              value={chatUser.SoLuongChuaDocCuaCustomer}
              status="error"
              containerStyle={{ position: 'absolute', top: -5, right: -5 }}
            />
          )} */}
          <MessengerLogo />
        </TouchableOpacity>
        <View style={{ width: 10, height: '100%' }} />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('ShoppingCard')}>
          {numCart != 0 && (
            <Badge
              value={numCart}
              status="error"
              containerStyle={{ position: 'absolute', top: -5, right: -5 }}
            />
          )}
          <ShoppingCartIcon />
        </TouchableOpacity>
      </View>

      {isLoading && <LoadingComponent />}

      {data.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Image source={IC_Heart3X} style={{ width: 100, height: 100 }} />
          <Text style={styles.noDataText}>Your Love is empty</Text>
          <Button color={CUSTOM_COLOR.FlushOrange} title="SHOP NOW" onPress={() => navigation.goBack()} />
        </View>
      ) : (
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <View>
            <Text style={styles.productLikedText}>Product Liked</Text>
            <View style={styles.productListContainer}>
              <FlatList
                data={data.danhSachSanPham}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.productItemContainer}
                    onPress={() => navigation.navigate('ProductDetail', { id: item._id })}>
                    <ProductView
                      quantity={item.SoLuongDaBan}
                      source={item.HinhAnhSP[0]}
                      title={item.TenSP}
                      price={item.GiaGiam}
                    />
                  </TouchableOpacity>
                )}
                numColumns={2}
                keyExtractor={(item) => item._id}
              />
            </View>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.productLikedText}>Có thể bạn cũng sẽ thích</Text>
            <View style={styles.productListContainer}>
              <FlatList
                data={dataRecommendLike}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.productItemContainer}
                    onPress={() => navigation.navigate('ProductDetail', { id: item._id })}>
                    <ProductView
                      quantity={item.SoLuongDaBan}
                      source={item.HinhAnhSP[0]}
                      title={item.TenSP}
                      price={item.GiaGiam}
                    />
                  </TouchableOpacity>
                )}
                numColumns={2}
                keyExtractor={(item) => item._id}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default FollowScreen;
