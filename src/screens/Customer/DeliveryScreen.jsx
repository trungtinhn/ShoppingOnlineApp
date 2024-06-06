import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import CUSTOM_COLOR from "../../constants/color";
import { IC_Back, IC_Add } from "../../../assets/Customer/icons";
import Delivery from "../../components/Customer/Delivery";
import { BackIcon } from "../../../assets/Customer/svgs";
function DeliveryScreen({ navigation, route }) {

    const { itemsCheckout, totalMoney, choosePayment, promotion } = route.params

    const [dataDelivery, setDataDelivery] = useState([
        {
            id: 1,
            TenNguoiMua: "Nguyen Van A",
            SDT: "0901234567",
            PhuongXa: "Phuong 1",
            QuanHuyen: "Quan 1",
            TinhThanhPho: "Thanh Pho Ho Chi Minh",
            DiaChi: "123 Nguyen Trai",
            checkSelect: false
        },
        {
            id: 2,
            TenNguoiMua: "Le Thi B",
            SDT: "0912345678",
            PhuongXa: "Phuong 2",
            QuanHuyen: "Quan 2",
            TinhThanhPho: "Thanh Pho Ho Chi Minh",
            DiaChi: "456 Le Loi",
            checkSelect: true
        },
        {
            id: 3,
            TenNguoiMua: "Tran Van C",
            SDT: "0923456789",
            PhuongXa: "Phuong 3",
            QuanHuyen: "Quan 3",
            TinhThanhPho: "Thanh Pho Ho Chi Minh",
            DiaChi: "789 Tran Hung Dao",
            checkSelect: false
        }
    ])

    const [delivery, setDelivey] = useState()

    const getDataDelivery = () => {
        // const q = query(collection(Firestore, "DIACHI"), where("MaND", "==", firebase.auth().currentUser.uid));

        // const unsubscribe = onSnapshot(q, (querySnapshot) => {
        //     const data = [];

        //     querySnapshot.forEach((doc) => {

        //         data.push({ ...doc.data(), checkSelect: false })
        //     });
        //     setDataDelivery(data)


        // });


    }

    const updateCheck = (item) => {
        const updatedData = dataDelivery.map((delivery) => 
            delivery.id === item.id ? { ...delivery, checkSelect: !delivery.checkSelect } : delivery
        );
        setDataDelivery(updatedData);
    }


    useEffect(() => {
        getDataDelivery()

    }, [])


    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: CUSTOM_COLOR.White,
                height: 40,
                justifyContent: 'space-between',
                marginBottom: 20,
                alignItems: 'center'
            }}>

                <View style={{
                    flexDirection: 'row',

                    alignItems: 'center'
                }}>
                    <TouchableOpacity 
                        style={{ padding: 20 }}
                        onPress={() => {
                            navigation.goBack();
                    }}>
                        <BackIcon/>
                    </TouchableOpacity>


                    <Text style={{
                        fontSize: 20,
                        color: CUSTOM_COLOR.Black,
                        fontWeight: 'bold'
                    }}>Delivery Address</Text>

                </View>

                <TouchableOpacity style={{
                    marginHorizontal: 15
                }}
                    onPress={delivery ? () => navigation.navigate('Checkout', { itemsCheckout, totalMoney, choosePayment, delivery, promotion }) : null}
                >
                    <Text style={{
                        fontSize: 18,
                        color: CUSTOM_COLOR.SeaBuckthorn
                    }}>Done</Text>
                </TouchableOpacity>
            </View>



            <ScrollView>
                {dataDelivery ? dataDelivery.map((item, index) => {

                    return (
                        <Delivery
                            name={item.TenNguoiMua}
                            phoneNumber={item.SDT}
                            ward={item.PhuongXa}
                            district={item.QuanHuyen}
                            city={item.TinhThanhPho}
                            key={index}
                            address={item.DiaChi}
                            checkSelect={item.checkSelect}
                            onPressChoose={() => updateCheck(item)}
                            show={true}
                            style={{
                                paddingHorizontal: 10,
                                margin: 10
                            }}
                        />

                    )
                }) : null}

                <TouchableOpacity style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 15
                }}
                    onPress={() => navigation.navigate('DeliveryAddress', { itemsCheckout, totalMoney, choosePayment, promotion })}
                >
                    <Image
                        source={IC_Add}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: CUSTOM_COLOR.FlushOrange,
                            marginRight: 10
                        }}
                    />

                    <Text style={{
                        color: CUSTOM_COLOR.FlushOrange,
                        fontSize: 16
                    }}>Add new delivery</Text>
                </TouchableOpacity>
            </ScrollView>



        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White,
        paddingTop: 10
    },



})

export default DeliveryScreen