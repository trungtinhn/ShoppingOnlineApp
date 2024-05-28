import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet,FlatList, TouchableOpacity, Image } from "react-native";
import ProductCheckOut from "../../components/Customer/ProductCheckout";
import { IC_Back } from "../../../assets/Customer/icons";
import { PR_1, PR_2, PR_3, PR_4, PR_5 } from "../../../assets/Customer/images";
import CUSTOM_COLOR from "../../constants/color";
import Button from '../../components/Admin/Button'
import CustomButton from "../../components/Login_SignUp/CustomButton";
import { BackIcon } from "../../../assets/Customer/svgs";
const ShoppingCard = ({navigation, route}) => {
    const { idUser } = route.params
    const [items, setItems] = useState([]);

    const [checkChooseAll, setCheckChooseAll] = useState(false)
    const [totalMoney, setTotalMoney] = useState(0)
    const [itemsCheckout, setItemsCheckout] = useState([])
    
    function getData(){
        const data = [
            {
              MaSP: 1,
              TenSP: 'San Pham 1',
              HinhAnhSP: PR_1,
              GiaSP: 10000
            },
            {
              MaSP: 2,
              TenSP: 'San Pham 2',
              HinhAnhSP: PR_2,
              GiaSP: 10000
            },
            {
              MaSP: 3,
              TenSP: 'San Pham 3',
              HinhAnhSP: PR_3,
              GiaSP: 10000
            },
            {
              MaSP: 4,
              TenSP: 'San Pham 4',
              HinhAnhSP: PR_4,
              GiaSP: 10000
            },
          ];
          setItems(data)
    }
    const updateCheck = (item) => {

        const updateItem = items.map((product) => {
            if (product.MaGH === item.MaGH) {
                product.checkSelect = !item.checkSelect;
            }
            if (product.checkSelect == false) setCheckChooseAll(false)
            return product
        })

        const chooseSelectFull = items.filter((product) => (product.checkSelect == true))
        if (chooseSelectFull.length == items.length) setCheckChooseAll(true)

        const sum = items.reduce((total, product) => {
            if (product.checkSelect) return total + product.GiaTien
            else return total
        }, 0)

        setTotalMoney(sum)

        setItems(updateItem)

        LoadItemsCheckout()
    }

    const ChooseAll = () => {

        const updateItem = items.map((product) => {
            if (checkChooseAll) {
                product.checkSelect = false
                setTotalMoney(0)
            }
            else {
                product.checkSelect = true
                const sum = items.reduce((total, product) => {
                    return total + product.GiaTien
                }, 0)

                setTotalMoney(sum)
            }


            return product
        })

        setCheckChooseAll(!checkChooseAll)


        setItems(updateItem)

        LoadItemsCheckout()
    }

    const resetTotalMoney = () => {
        const sum = items.reduce((total, product) => {
            if (product.checkSelect) return total + product.GiaTien
            else return total
        }, 0)

        setTotalMoney(sum)
    }


    const GoToProduct = (sanPham) => {
        // const unsub = onSnapshot(doc(Firestore, "SANPHAM", sanPham.MaSP), (doc) => {
        //     const item = doc.data();
        //     console.log("Current data: ", doc.data());
        //     navigation.navigate('DetailProduct', { item })
        // });
    }

    


    const UpNumber = (item) => {

        const updateItem = items.map((product) => {
            if (item.MaGH === product.MaGH) {
                product.SoLuong += 1
                product.GiaTien = product.SoLuong * product.GiaSP
                updateNumber(item)
            }

            return product
        })

        setItems(updateItem)
        resetTotalMoney()
    }

    const DownNumber = (item) => {
        const updateItem = items.map((product) => {
            if (item.MaGH === product.MaGH && item.SoLuong > 1) {
                product.SoLuong -= 1
                product.GiaTien = product.SoLuong * product.GiaSP
                updateNumber(item)
            }

            return product
        })

        setItems(updateItem)
        resetTotalMoney()
    }
    const LoadItemsCheckout = () => {
        const data = items.filter((product) => product.checkSelect == true)
        setItemsCheckout(data)
    }

    useEffect(() => {
        getData();
    }, [])
    return(
        <View style={styles.container}>

        <View style={{width: '100%', height: 10}}/>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <TouchableOpacity 
                    style={{padding: 12}}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <BackIcon width={20} height={20}></BackIcon>
                </TouchableOpacity>

                <Text style={{
                    fontSize: 20,
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold'
                }}>Shopping Cart</Text>
            </View>

            <View style={{width:'100%', height: 10}}/>

            <FlatList
                style={{
                    height: 750,
                    flexGrow: 0
                }}
                data={items}
                renderItem={({ item }) => {

                    return (

                        <ProductCheckOut
                            style={{
                                marginVertical: 10
                            }}
                            source={item.HinhAnhSP}
                            title={item.TenSP}
                            color={item.MauSac}
                            size={item.Size}
                            price={item.GiaTien}
                            number={item.SoLuong}
                            show={true}
                            onPress={() => updateCheck(item)}
                            checkSelect={item.checkSelect}
                            onPressUp={() => UpNumber(item)}
                            onPressDown={() => DownNumber(item)}
                            onPressDelete={() => DeleteProduct(item)}
                            onPressProduct={() => { GoToProduct(item) }}
                        />
                    )
                }}
            />
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
                        <TouchableOpacity style={{
                            width: 23,
                            height: 23,
                            borderWidth: 1,
                            borderRadius: 20,
                            marginRight: 20,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                            onPress={() => {
                                ChooseAll()
                            }}
                        >
                            {checkChooseAll ?
                                <View style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 10,
                                    backgroundColor: CUSTOM_COLOR.Black
                                }}>

                                </View> : null}
                        </TouchableOpacity>

                        <Text style={{
                            fontSize: 17,
                            fontWeight: 'bold'
                        }}>Choose all</Text>
                    </View>


                    <Text style={{
                        marginHorizontal: 20,
                        fontSize: 17,
                        fontWeight: 'bold'
                    }}>Total</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginHorizontal: 20,

                }}>
                    <Text style={{
                        fontSize: 17, marginHorizontal: 15
                    }}>1.000.000 đ</Text>
                </View>

                <View style={styles.buttonContainer}>
                <CustomButton
                    type="primary"
                    text="CHECK OUT"
                    onPress={() => {
                        
                    }}
                 />
                        
                </View>
                {/* <View style={{
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: '2%',
                }}>
                    <Button
                    style={{width: 300, height: 50}}
                        title='CHECK OUT'
                        color={CUSTOM_COLOR.FlushOrange}
                        onPress={() => {

                            if (itemsCheckout.length > 0)
                                navigation.navigate('Checkout', { itemsCheckout, totalMoney })
                        }}
                    />
                </View> */}
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
        height: 150,
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