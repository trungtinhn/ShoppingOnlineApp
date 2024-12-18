import React, { useEffect, useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet,TouchableOpacity, ScrollView, RefreshControl, Alert } from "react-native";
import ProductCheckOut from "../../components/Customer/ProductCheckout";
import CUSTOM_COLOR from "../../constants/color";
import CustomButton from "../../components/Login_SignUp/CustomButton";
import { BackIcon } from "../../../assets/Customer/svgs";
import { getCartByUser, removeProductFromCart, updateProductInCart } from "../../api/CartApi";
import {firebase} from "../../../firebase/firebase"
import LoadingScreen from "../LoadingScreen";
import CheckBox from "@react-native-community/checkbox";
import { OrderContext } from "../../context/OrderContext";
import FONT_FAMILY from "../../constants/font";
import { formatCurrency } from "../../utils/helpers";

const ShoppingCard = ({navigation}) => {
    const {product, setProduct, setPromoCode} = useContext(OrderContext)
    const idUser = firebase.auth().currentUser.uid;
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [checkChooseAll, setCheckChooseAll] = useState(false)
    const [totalMoney, setTotalMoney] = useState(0)
    const [itemsCheckout, setItemsCheckout] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    
    const getData = async () =>{
        const res = await getCartByUser(idUser)
        if(res.status === 200){
            const productsWithCheck = res.data.products.map((product) => {
                return { ...product, checkSelect: false }
            })
            setItems(productsWithCheck)
            setLoading(false)
        }else{
            console.log(res)
        }
    }
    const updateCheck = (item) => {
        const updateItem = items.map((product) => {
            if (product._id === item._id) {
                product.checkSelect = !item.checkSelect;
            }
            if (product.checkSelect == false) setCheckChooseAll(false)
            return product
        })

        const chooseSelectFull = items.filter((product) => (product.checkSelect == true))
        if (chooseSelectFull.length == items.length) setCheckChooseAll(true)
        
        resetTotalMoney()

        setItems(updateItem)

        LoadItemsCheckout()
    }

    const ChooseAll = () => {

        const updateItem = items.map((product) => {
            if (checkChooseAll) {
                product.checkSelect = false
            }
            else {
                product.checkSelect = true
            }
            return product
        })

        resetTotalMoney()

        setCheckChooseAll(!checkChooseAll)

        setItems(updateItem)

        LoadItemsCheckout()
    }

    const resetTotalMoney = () => {
        const sum = items.reduce((total, product) => {
            if (product.checkSelect) return total + product.totalPrice
            else return total
        }, 0)
        setTotalMoney(sum)
    }

    const GoToProduct = (sanPham) => {
        navigation.navigate('ProductDetail', {id: sanPham.productId._id})
    }

    const DeleteProduct = (item) => {
        const updateItem = items.filter((product) => product._id !== item._id)
        deleteItemDB(item)
        setItems(updateItem)
    }

    const UpNumber = (item) => {
        const updateItem = items.map((product) => {
            if (item._id === product._id) {
                product.quantity += 1
                product.totalPrice = product.quantity * product.price
                updateNumberDB(product)
            }
            return product
        })
        setItems(updateItem)
        resetTotalMoney()
    }
    const deleteItemDB = async (item) => {
        const data = {
            userId: idUser,
            productId: item.productId._id,
            size: item.size,
            color: item.color
        }
        const res = await removeProductFromCart({data: data});
        if(res === 200){
            console.log('success')
        }else{
            console.log(res.status)
        }
    }

    const updateNumberDB = async (item) => {
        const data = {
            userId: idUser,
            productId: item.productId._id,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            price: item.price
        }
        const res = await updateProductInCart({data: data});
        if(res === 200){
            console.log('success')
        }else{
            console.log(res.status)
        }
    }

    const DownNumber = (item) => {
        const updateItem = items.map((product) => {
            if (item._id === product._id && item.quantity > 1) {
                product.quantity -= 1
                product.totalPrice = product.quantity * product.price
                updateNumberDB(product)
            }
            return product
        })
        setItems(updateItem)
        resetTotalMoney()
    }
    const LoadItemsCheckout = () => {
        const data = items.filter((product) => product.checkSelect == true)
        setProduct(data)
    }

    

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        Promise.all([getData()])
          .then(() => setRefreshing(false))
          .catch(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getData();
    }, [])

    if(isLoading){
        return(
            <LoadingScreen/>
        )
    }
    else
    return(
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
                    <BackIcon/>
                </TouchableOpacity>

                <Text style={{
                    fontSize: 20,
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold'
                }}>Shopping Cart</Text>
            </View>

            <View style={{width:'100%', height: 10}}/>

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {items.map((item) => (
                    <ProductCheckOut
                        key={item._id}
                        style={{
                            marginVertical: 10
                        }}
                        source={item.image[0]}
                        title={item.name}
                        color={item.color}
                        size={item.size}
                        price={item.price}
                        number={item.quantity}
                        check={true}
                        show={true}
                        onPress={() => updateCheck(item)}
                        checkSelect={item.checkSelect}
                        onPressUp={() => UpNumber(item)}
                        onPressDown={() => DownNumber(item)}
                        onPressDelete={() => DeleteProduct(item)}
                        onPressProduct={() => { GoToProduct(item) }}
                    />
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
}
export default ShoppingCard;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White,
    },
    bottomView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 130,
        backgroundColor: CUSTOM_COLOR.White,
    },
    buttonContainer: {
        width: '180%',
        height: '35%',
        top: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        left: '-40%',
      },
});