import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Alert } from "react-native";
import ProductCheckOut from "../../components/Customer/ProductCheckout";
import CUSTOM_COLOR from "../../constants/color";
import CustomButton from "../../components/Login_SignUp/CustomButton";
import { BackIcon } from "../../../assets/Customer/svgs";
import { getCartByUser, removeProductFromCart, updateProductInCart } from "../../api/CartApi";
import { firebase } from "../../../firebase/firebase";
import LoadingScreen from "../LoadingScreen";
import CheckBox from "@react-native-community/checkbox";
import { OrderContext } from "../../context/OrderContext";
import FONT_FAMILY from "../../constants/font";
import { formatCurrency } from "../../utils/helpers";
import ViewShop from "../../components/Customer/Shop";

const ShoppingCard = ({ navigation }) => {
  const { product, setProduct, setPromoCode } = useContext(OrderContext);
  const idUser = firebase.auth().currentUser.uid;

  const [items, setItems] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [checkChooseAll, setCheckChooseAll] = useState(false);
  const [totalMoney, setTotalMoney] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    const res = await getCartByUser(idUser);
    if (res.status === 200) {
      const groupedData = res.data.products.reduce((acc, product) => {
        const storeId = product.storeId;
        if (!acc[storeId]) {
          acc[storeId] = [];
        }
        acc[storeId].push({ ...product, checkSelect: false });
        return acc;
      }, {});
      setItems(groupedData);
      setLoading(false);
    } else {
      console.log(res);
    }
  };

  // Lấy thông tin cửa hàng
  const loadStoreDetails = async (storeIds) => {
    const storeData = {};
    await Promise.all(
      storeIds.map(async (storeId) => {
        const res = await getStoreById(storeId);
        if (res.status === 200) {
          storeData[storeId] = res.data;
        }
      })
    );
    setStoreDetails(storeData);
  };

  const updateCheck = (storeId, item) => {
    const updatedStoreItems = items[storeId].map((product) => {
      if (product._id === item._id) {
        product.checkSelect = !product.checkSelect;
      }
      return product;
    });

    const updatedItems = { ...items, [storeId]: updatedStoreItems };
    setItems(updatedItems);
    resetTotalMoney();
    LoadItemsCheckout();
  };

  const ChooseAll = () => {
    const updatedItems = Object.keys(items).reduce((acc, storeId) => {
      const updatedStoreItems = items[storeId].map((product) => ({
        ...product,
        checkSelect: !checkChooseAll,
      }));
      acc[storeId] = updatedStoreItems;
      return acc;
    }, {});

    setCheckChooseAll(!checkChooseAll);
    setItems(updatedItems);
    resetTotalMoney();
    LoadItemsCheckout();
  };

  const resetTotalMoney = () => {
    const sum = Object.values(items).reduce((total, storeItems) => {
      return total + storeItems.reduce((subTotal, product) => {
        return product.checkSelect ? subTotal + product.totalPrice : subTotal;
      }, 0);
    }, 0);
    setTotalMoney(sum);
  };

  const DeleteProduct = async (storeId, item) => {
    const updatedStoreItems = items[storeId].filter((product) => product._id !== item._id);
    const updatedItems = { ...items, [storeId]: updatedStoreItems };
    setItems(updatedItems);

    const data = {
      userId: idUser,
      productId: item.productId._id,
      size: item.size,
      color: item.color,
    };
    const res = await removeProductFromCart({ data });
    if (res.status !== 200) {
      console.log(res.status);
    }
  };

  const updateNumberDB = async (item) => {
    const data = {
      userId: idUser,
      productId: item.productId._id,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      price: item.price,
    };
    const res = await updateProductInCart({ data });
    if (res.status !== 200) {
      console.log(res.status);
    }
  };

  const UpNumber = (storeId, item) => {
    const updatedStoreItems = items[storeId].map((product) => {
      if (product._id === item._id) {
        product.quantity += 1;
        product.totalPrice = product.quantity * product.price;
        updateNumberDB(product);
      }
      return product;
    });
    setItems({ ...items, [storeId]: updatedStoreItems });
    resetTotalMoney();
  };

  const DownNumber = (storeId, item) => {
    const updatedStoreItems = items[storeId].map((product) => {
      if (product._id === item._id && product.quantity > 1) {
        product.quantity -= 1;
        product.totalPrice = product.quantity * product.price;
        updateNumberDB(product);
      }
      return product;
    });
    setItems({ ...items, [storeId]: updatedStoreItems });
    resetTotalMoney();
  };

  const LoadItemsCheckout = () => {
    const data = Object.values(items).flatMap((storeItems) =>
      storeItems.filter((product) => product.checkSelect)
    );
    setProduct(data);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([getData()])
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>

        <View style={{width: '100%', height: 10}}/>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity 
                    style={{padding: 12, widthq: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 10}}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <BackIcon></BackIcon>
                </TouchableOpacity>

                <Text style={{
                    fontSize: 20,
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold'
                }}>Shopping Cart</Text>
            </View>

            <View style={{width:'100%', height: 10}}/>

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {Object.keys(items).map((storeId) => (
          <View key={storeId}>
            <ViewShop idShop={storeId} />
            {items[storeId].map((item) => (
              <ProductCheckOut
                key={item._id}
                style={{ marginVertical: 5 }}
                source={item.image[0]}
                title={item.name}
                color={item.color}
                size={item.size}
                price={item.price}
                number={item.quantity}
                check={true}
                show={true}
                onPress={() => updateCheck(storeId, item)}
                checkSelect={item.checkSelect}
                onPressUp={() => UpNumber(storeId, item)}
                onPressDown={() => DownNumber(storeId, item)}
                onPressDelete={() => DeleteProduct(storeId, item)}
                onPressProduct={() => navigation.navigate("ProductDetail", { id: item.productId._id })}
              />
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.bottomView}>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between',
                    marginHorizontal: 15,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <CheckBox value={checkChooseAll} onValueChange={() => ChooseAll()} onCheckColor={CUSTOM_COLOR.FlushOrange} />

                        <Text style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: CUSTOM_COLOR.Black,
                            fontFamily: FONT_FAMILY.CeraPro
                        }}>Choose all</Text>
                    </View>


                    <Text style={{
                        marginHorizontal: 20,
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: CUSTOM_COLOR.Black,
                        fontFamily: FONT_FAMILY.CeraPro
                    }}>Total</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginHorizontal: 20,

                }}>
                    <Text style={{
                        fontSize: 17, marginHorizontal: 15, color: CUSTOM_COLOR.FlushOrange, fontFamily: FONT_FAMILY.CeraPro
                    }}>{formatCurrency(totalMoney)}đ</Text>
                </View>

                <View style={styles.buttonContainer}>
                <CustomButton
                    type="primary"
                    text="CHECK OUT"
                    onPress={() => {
                        if(product.length > 0){
                            setPromoCode(null)
                            navigation.navigate('Checkout')
                        }
                        else{
                            Alert.alert('Warning', 'Please choose product')
                        }
                    }}
                 />
                </View>
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  title: {
    fontSize: 20,
    color: CUSTOM_COLOR.Black,
    fontWeight: "bold",
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 15,
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.CeraPro,
  },
  bottomView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 130,
    backgroundColor: CUSTOM_COLOR.White,
  },
  summary: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  chooseAll: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chooseAllText: {
    fontSize: 17,
    fontWeight: "bold",
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.CeraPro,
  },
  totalText: {
    marginHorizontal: 20,
    fontSize: 17,
    fontWeight: "bold",
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.CeraPro,
  },
  totalValueContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 20,
  },
  totalValue: {
    fontSize: 17,
    marginHorizontal: 15,
    color: CUSTOM_COLOR.FlushOrange,
    fontFamily: FONT_FAMILY.CeraPro,
  },
  buttonContainer: {
    width: "180%",
    height: "35%",
    top: "13%",
    alignItems: "center",
    justifyContent: "center",
    left: "-40%",
  },
});

export default ShoppingCard;
