import React, {useState, useEffect, useCallback, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {StyleSheet} from 'react-native';
import CUSTOM_COLOR from '../../constants/color';
import StarRating from '../../components/Customer/StartRating';
import {
  IC_Chat,
  IC_Down,
} from '../../../assets/Customer/icons';
import {Badge} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import ProductView from '../../components/Customer/ProductView';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {
  AddCart,
  BackIcon,
  HeartFillIcon,
  HeartIcon,
  ShoppingCartIcon,
} from '../../../assets/Customer/svgs';
import {getProductById} from '../../api/ProductApi';
import LoadingScreen from '../LoadingScreen';
import FONT_FAMILY from '../../constants/font';
import Button from '../../components/Customer/Button';
import {firebase} from '../../../firebase/firebase';
import {addProductToCart} from '../../api/CartApi';
import {OrderContext} from '../../context/OrderContext';
import {addLike, checkLike, deleteLike} from '../../api/LikeApi';
import {knnRecommendSell} from '../../api/KnnApi';
import { IC_messenger } from '../../../assets/Admin/icons';
import { formatCurrency } from '../../utils/helpers';

function ProductDetail({navigation, route}) {
  const {id} = route.params;
  const userId = firebase.auth().currentUser.uid;
  const [dataSanPham, setDataSanPham] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isLoadingCart, setLoadingCart] = useState(false);
  const [love, setLove] = useState(true);
  const {numCart, setNumCart} = React.useContext(OrderContext);
  const [chooseColor, setChooseColor] = useState('');
  const [chooseSize, setChooseSize] = useState('');
  const [numProduct, setNumProduct] = useState(1);
  const [seeDetails, setSeeDetails] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {product, setProduct} = useContext(OrderContext);
  const [itemsRecommend, setItemsRecommend] = useState([]);
  const [shopData, setShopData] = useState([]);
  const getDataLove = async () => {
    const res = await checkLike({data: {userId: userId, _id: id}});
    if (res.status === 200) {
      const data = res.data.isFavorited;
      setLove(data);
    } else {
      console.log(res);
      setLove(false);
    }
  };
  const setDataLove = async () => {
    if (love) {
      const res = await deleteLike({data: {userId: userId, _id: id}});
      if (res.status === 200) {
        setLove(false);
      } else {
        console.log(res);
      }
    } else {
      const res = await addLike({data: {userId: userId, _id: id}});
      if (res.status === 200) {
        setLove(true);
      } else {
        console.log(res);
      }
    }
  };

  const getDataRecommend = async () => {
    const res = await knnRecommendSell({userId: userId});
    if (res.status === 200) {
      setItemsRecommend(res.data);
    } else {
      console.log(res);
    }
  };

  const setDataGioHang = async () => {
    if (chooseColor === '' || chooseSize === '') {
      Alert.alert('Thông báo', 'Vui lòng chọn màu sắc và kích cỡ');
    } else {
      setLoadingCart(true);
      const data = {
        userId: firebase.auth().currentUser.uid,
        storeId: dataSanPham.storeId,
        productId: id,
        name: dataSanPham.productName,
        image: dataSanPham.productImages,
        quantity: numProduct,
        size: chooseSize,
        color: chooseColor,
        price: dataSanPham.discountPrice,
      };
      console.log(data);
      const res = await addProductToCart({data: data});
      if (res.status === 200) {
        setLoadingCart(false);
        Alert.alert('Thông báo', 'Sản phẩm đã thêm vào giỏ hàng');
        resetType();
        setNumCart(numCart + 1);
      } else {
        console.log(res);
        setLoadingCart(false);
      }
    }
  };

  const resetType = () => {
    setChooseColor('');
    setChooseSize('');
  };

  const getDataById = async id => {
    await getDataLove(id);
    await getDataRecommend();
    try {
      const res = await getProductById({productId: id});
      if (res.status === 200) {
        setDataSanPham(res.data);
        const Store = res.data.storeId;
        setShopData(Store);
        setLoading(false);
        resetType();
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setBuyNow = () => {
    if (chooseColor === '' || chooseSize === '') {
      Alert.alert('Thông báo', 'Vui lòng chọn màu sắc và kích cỡ');
    } else {
      const data = [
        {
          productId: id,
          storeId: dataSanPham.storeId,
          name: dataSanPham.productName,
          image: dataSanPham.productImages,
          quantity: numProduct,
          size: chooseSize,
          color: chooseColor,
          price: dataSanPham.discountPrice,
          totalPrice: dataSanPham.discountPrice * numProduct,
        },
      ];
      setProduct(data);
      navigation.navigate('Checkout');
    }
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([getDataById(id), getDataLove()])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getDataById(id);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={{flex: 1, backgroundColor: CUSTOM_COLOR.White}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={{padding: 12}}
              onPress={() => {
                navigation.goBack();
              }}>
              <BackIcon fill={CUSTOM_COLOR.FlushOrange}></BackIcon>
            </TouchableOpacity>

            <Text
              style={{
                height: 40,
                padding: 7,
                fontSize: 20,
                color: CUSTOM_COLOR.Black,
                fontFamily: FONT_FAMILY.Bold,
                fontWeight: 'bold',
              }}>
              Product
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                setDataLove();
              }}>
              {love ? (
                <HeartFillIcon fill={CUSTOM_COLOR.FlushOrange} />
              ) : (
                <HeartIcon />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate('ShoppingCard', {item: dataSanPham});
              }}>
              {numCart != 0 ? (
                <Badge
                  value={numCart}
                  status="error"
                  containerStyle={{position: 'absolute', top: -5, right: -5}}
                />
              ) : null}
              <ShoppingCartIcon />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
            style={{
              ...styles.container,
            }}>
            <View
              style={{
                width: '100%',
                height: 350,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Swiper loop autoplay>
                {dataSanPham.productImages.map((image, index) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                    key={index}>
                    <Image
                      source={{uri: image}}
                      style={{
                        width: 300,
                        height: 300,
                        borderRadius: 20,
                      }}
                    />
                  </View>
                ))}
              </Swiper>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: CUSTOM_COLOR.LightGray,
                paddingBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      color: CUSTOM_COLOR.FlushOrange,
                      fontFamily: FONT_FAMILY.CeraPro,
                      fontSize: 20,
                    }}>
                    đ
                  </Text>
                  <Text
                    style={{
                      color: CUSTOM_COLOR.FlushOrange,
                      fontFamily: FONT_FAMILY.Semibold,
                      fontSize: 25,
                    }}>
                    {dataSanPham.discountPrice}
                  </Text>
                </View>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 12,
                    color: CUSTOM_COLOR.Sunglow,
                    fontFamily: FONT_FAMILY.CeraPro,
                    textDecorationLine: 'line-through',
                    alignItems: 'flex-end',
                  }}>
                  -đ{dataSanPham.originalPrice}
                </Text>
                <View
                  style={{
                    backgroundColor: CUSTOM_COLOR.Yellow,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: CUSTOM_COLOR.Red,
                      fontWeight: 'bold',
                      margin: 4,
                    }}>
                    -{dataSanPham.discountPrice}%
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  marginRight: 20,
                  fontSize: 12,
                  color: CUSTOM_COLOR.Black,
                }}>
                {dataSanPham.soldQuantity}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: CUSTOM_COLOR.LightGray,
                paddingVertical: 15,
              }}>
              <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  color: CUSTOM_COLOR.Black,
                  fontFamily: FONT_FAMILY.Semibold,
                  fontSize: 18,
                  marginHorizontal: 20,
                }}>
                {dataSanPham.productName}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 15,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: CUSTOM_COLOR.LightGray,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <Text
                  style={{
                    marginRight: 10,
                    fontFamily: FONT_FAMILY.SemiBoldItalic,
                    fontSize: 15,
                    color: CUSTOM_COLOR.FlushOrange,
                  }}>
                  {dataSanPham.rating}
                </Text>
                <StarRating maxStars={5} rating={dataSanPham.rating} />
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Review', {dataSanPham: dataSanPham})
                }>
                <Text
                  style={{
                    fontStyle: 'italic',
                    marginRight: 20,
                  }}>
                  See reviews
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                paddingVertical: 15,
                borderBottomWidth: 0.5,
                borderBottomColor: CUSTOM_COLOR.LightGray,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      marginLeft: 20,
                      marginRight: 20,
                      ...styles.textLarge,
                    }}>
                    Color
                  </Text>

                  {dataSanPham.colors.map(color => (
                    <View
                      style={{
                        ...styles.colorCicle,
                        backgroundColor: color.code,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      key={color.code}>
                      {chooseColor === color.name ? (
                        <View
                          style={{
                            ...styles.colorCicle,
                            width: 10,
                            height: 10,
                            backgroundColor: CUSTOM_COLOR.White,
                            borderWidth: 0,
                          }}></View>
                      ) : null}
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      ...styles.btnCount,
                    }}
                    onPress={() =>
                      numProduct > 1 ? setNumProduct(numProduct - 1) : null
                    }>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: CUSTOM_COLOR.White,
                      }}>
                      -
                    </Text>
                  </TouchableOpacity>

                  <Text>{numProduct}</Text>

                  <TouchableOpacity
                    style={{
                      ...styles.btnCount,
                    }}
                    onPress={() => setNumProduct(numProduct + 1)}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: CUSTOM_COLOR.White,
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    ...styles.textLarge,
                    marginLeft: 20,
                    marginRight: 20,
                  }}>
                  Size
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  {dataSanPham.sizes.map((size, index) => (
                    <View
                      style={{
                        ...styles.sizeCircle,
                        width: 45,
                        marginHorizontal: 5,
                        borderWidth: chooseSize === size ? 1 : 0,
                      }}
                      key={index}>
                      <Text>{size}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{alignSelf: 'flex-end', marginHorizontal: 20}}>
                <Text
                  style={{
                    fontStyle: 'italic',
                  }}>
                  How can I choose my size?
                </Text>
              </TouchableOpacity>
            </View>


            <View style={{flex: 1, paddingHorizontal: 20}}>
              {/* Store Information */}
              <View style={styles.header}>
                <Image
                  source={{uri: shopData.image}}
                  style={styles.logo}
                />
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName}>
                    {shopData.name}
                  </Text>
                  {/* <Text style={styles.storeDetails}>Online 15 phút trước</Text> */}
                  <Text style={styles.location}>📍 TP. Hồ Chí Minh</Text>
                </View>
                <TouchableOpacity style={styles.visitShopButton}>
                  <Text style={styles.visitShopText}>Xem Shop</Text>
                </TouchableOpacity>
              </View>

              {/* Store Stats */}
              <View style={styles.statsContainer}>
                <Text style={styles.statItem}>220 Sản phẩm</Text>
                <Text style={styles.statItem}>4.9 Đánh giá</Text>
                <Text style={styles.statItem}>100% Phản hồi Chat</Text>
              </View>

              {/* Featured and Link Buttons */}
              <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.featuredButton}>
                  {/* <Icon name="star" size={16} color="#FF5E00" /> */}
                  <Text style={styles.featuredText}>Shop Nổi Bật</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton}>
                  <Text style={styles.linkButtonText}>Quần dài nam</Text>
                  {/* <Icon name="arrow-forward" size={16} color="#FF5E00" /> */}
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                marginHorizontal: 35,
              }}>
              <Text
                style={{
                  color: CUSTOM_COLOR.Black,
                  fontFamily: FONT_FAMILY.SemiBoldItalic,
                }}>
                See product details
              </Text>

              <TouchableOpacity
                styles={{}}
                onPress={() => setSeeDetails(!seeDetails)}>
                <Image source={IC_Down} />
              </TouchableOpacity>
            </View>
            {seeDetails ? (
              <View>
                <Text
                  style={{
                    marginHorizontal: 35,
                  }}>
                  {dataSanPham.productDescription}
                </Text>
              </View>
            ) : null}

            {isLoadingCart && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: '5%',
                      marginVertical: '2%',
                    }}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontFamily: FONT_FAMILY.Semibold,
                        color: CUSTOM_COLOR.Black,
                      }}>
                      Choose your style
                    </Text>
                  </View>

                  <View
                    style={{
                      ...styles.flexRow,
                      marginHorizontal: '10%',
                      marginVertical: '3%',
                    }}>
                    <Text style={{...styles.textLarge, fontWeight: 'normal'}}>
                      Color
                    </Text>

                    <View>
                      <FlatList
                        data={dataSanPham.colors}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}) => {
                          return (
                            <View
                              style={{
                                ...styles.flexRow,
                                marginHorizontal: '5%',
                                marginVertical: 3,
                              }}>
                              <TouchableOpacity
                                style={{
                                  ...styles.colorCicle,
                                  backgroundColor: item.code,
                                  borderWidth: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                                onPress={() => setChooseColor(item.name)}>
                                {chooseColor === item.name ? (
                                  <View
                                    style={{
                                      ...styles.colorCicle,
                                      width: 10,
                                      height: 10,
                                      backgroundColor: CUSTOM_COLOR.White,
                                      borderWidth: 0,
                                    }}></View>
                                ) : null}
                              </TouchableOpacity>
                              <Text style={{...styles.textSmall}}>
                                {item.name}
                              </Text>
                            </View>
                          );
                        }}
                        numColumns={2}
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      ...styles.flexRow,
                      marginHorizontal: '10%',
                      marginVertical: '3%',
                    }}>
                    <Text
                      style={{
                        ...styles.textLarge,
                        fontWeight: 'normal',
                        marginHorizontal: '10%',
                        marginVertical: '3%',
                      }}>
                      Size
                    </Text>

                    <View style={{flexDirection: 'row'}}>
                      {dataSanPham.sizes.map((size, index) => (
                        <TouchableOpacity
                          style={{
                            ...styles.sizeCircle,
                            width: 45,
                            marginHorizontal: 5,
                            borderWidth: chooseSize === size ? 1 : 0,
                          }}
                          key={index}
                          onPress={() => setChooseSize(size)}>
                          <Text>{size}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View
                    style={{
                      ...styles.flexRow,
                      justifyContent: 'center',
                      marginVertical: '6%',
                    }}>
                    <Button
                      title="DONE"
                      color={CUSTOM_COLOR.Carnation}
                      onPress={() => setModalVisible(false)}
                    />
                  </View>
                </View>
              </View>
            </Modal>
            <View
              style={{
                backgroundColor: CUSTOM_COLOR.WhitePorcelain,
                alignItems: 'center',
              }}>
              <Text style={styles.textView}>Có thể bạn sẽ thích</Text>
              <FlatList
                data={itemsRecommend}
                scrollEnabled={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.productItemContainer}
                    onPress={() =>
                      navigation.navigate('ProductDetail', {id: item._id})
                    }>
                    <ProductView
                      quantity={item.soldQuantity}
                      source={item.productImages[0]}
                      title={item.productName}
                      price={item.discountPrice}
                    />
                  </TouchableOpacity>
                )}
                numColumns={2}
                keyExtractor={item => item._id}
              />
            </View>
          </View>
        </ScrollView>
        {/* Purchase Button */}
        <View style={styles.purchaseRow}>
          {/* <TouchableOpacity style={styles.chatButton}>
            
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.cartButton} onPress={setDataGioHang}>
            <AddCart width={35} height={35} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Mua với voucher</Text>
            <Text style={styles.price}>{formatCurrency(dataSanPham.discountPrice)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  textLarge: {
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
  },
  colorCicle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 5,
  },
  textSmall: {
    color: CUSTOM_COLOR.Black,
    marginHorizontal: '2%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeCircle: {
    width: 25,
    height: 25,
    borderWidth: 1,
    backgroundColor: CUSTOM_COLOR.LightGray,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  btnCount: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    marginHorizontal: 15,
  },
  textView: {
    marginVertical: 10,
    color: CUSTOM_COLOR.Black,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  btnSize: {
    width: 25,
    height: 25,
    backgroundColor: CUSTOM_COLOR.Alto,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: CUSTOM_COLOR.White,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  storeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  storeDetails: {
    fontSize: 12,
    color: 'gray',
  },
  location: {
    fontSize: 12,
    color: 'gray',
  },
  visitShopButton: {
    borderWidth: 1,
    borderColor: '#FF5E00',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  visitShopText: {
    color: '#FF5E00',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    color: '#FF5E00',
    fontWeight: 'bold',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF6F0',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  featuredButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredText: {
    color: '#FF5E00',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#FF5E00',
  },
  purchaseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E4F2EE',
    borderRadius: 8,
  },
  chatButton: {
    backgroundColor: '#24A99D',
    padding: 8,
    borderRadius: 4,
  },
  cartButton: {
    backgroundColor: '#24A99D',
    padding: 11,
  },
  buyButton: {
    backgroundColor: '#FF5E00',
    padding: 8,
    flex: 1,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  price: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductDetail;