import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IC_Back } from "../../../assets/Customer/icons";
import Promotion from "../../components/Customer/Promotion";
import CUSTOM_COLOR from "../../constants/color";



function PromotionScreen({ navigation, route }) {

    const { itemsCheckout, totalMoney, delivery, choosePayment } = route.params

    const [promotion, setPromotion] = useState()

    const [dataKhuyenMai, setDataKhuyenMai] = useState([])

    const getDataKhuyenMai = async () => {
        // const querySnapshot = await getDocs(collection(Firestore, "KHUYENMAI"));
        // const data = []
        // querySnapshot.forEach((doc) => {
        //     data.push({ ...doc.data(), checkSelect: false })
        // });
        // setDataKhuyenMai(data)
        const dataKhuyenMai = [
            {
              id: 1,
              TenKM: "Giảm giá 20%",
              HinhAnhKM: "https://example.com/khuyenmai1.jpg",
              DonToiThieu: 500000, // Số tiền tối thiểu để được giảm giá
              NgayBatDau: new Date("2024-05-01"), // Ngày bắt đầu khuyến mãi
              NgayKetThuc: new Date("2024-05-31"), // Ngày kết thúc khuyến mãi
              checkSelect: false, // Trạng thái chọn khuyến mãi
            },
            {
              id: 2,
              TenKM: "Giảm 50k cho đơn hàng trên 300k",
              HinhAnhKM: "https://example.com/khuyenmai2.jpg",
              DonToiThieu: 300000,
              NgayBatDau: new Date("2024-06-10"),
              NgayKetThuc: new Date("2024-06-30"),
              checkSelect: false,
            },
            {
              id: 3,
              TenKM: "Mua 1 tặng 1",
              HinhAnhKM: "https://example.com/khuyenmai3.jpg",
              DonToiThieu: 0,
              NgayBatDau: new Date("2024-07-01"),
              NgayKetThuc: new Date("2024-07-15"),
              checkSelect: false,
            },
          ];
          setDataKhuyenMai(dataKhuyenMai)
    }

    const updateCheck = (item) => {

        const updateItem = dataKhuyenMai.map((promo) => {
            if (promo.MaKM === item.MaKM) {
                promo.checkSelect = true
                setPromotion(item)
            }
            else promo.checkSelect = false
            return promo
        })
        setDataKhuyenMai(updateItem)



    }

    useEffect(() => {
        getDataKhuyenMai()
        //console.log(dataKhuyenMai)
    }, [])


    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: CUSTOM_COLOR.White,
                height: 40,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>

                <View style={{
                    flexDirection: 'row',

                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Image
                            source={IC_Back}
                            style={{
                                width: '20%',
                                height: '40%',
                                marginHorizontal: 20,
                                marginVertical: '20%'
                            }}
                            resizeMode='stretch'
                        />
                    </TouchableOpacity>


                    <Text style={{
                        fontSize: 20,
                        color: CUSTOM_COLOR.Black,
                        fontWeight: 'bold'
                    }}>Promotion</Text>

                </View>

                <TouchableOpacity style={{
                    marginHorizontal: 15
                }}
                    onPress={promotion ? () => { navigation.navigate('Checkout', { itemsCheckout, totalMoney, delivery, choosePayment, promotion }) } : null}
                >
                    <Text style={{
                        fontSize: 18,
                        color: CUSTOM_COLOR.SeaBuckthorn
                    }}>Done</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={dataKhuyenMai}
                renderItem={({ item }) => {

                    const dayBD = item.NgayBatDau.getDate();
                    const monthBD = item.NgayBatDau.getMonth();
                    const yearBD = item.NgayBatDau.getFullYear();

                    const dayKT = item.NgayKetThuc.getDate();
                    const monthKT = item.NgayKetThuc.getMonth();
                    const yearKT = item.NgayKetThuc.getFullYear();
                    return (
                        <Promotion
                            source={item.HinhAnhKM}
                            title={item.TenKM}
                            minimum={item.DonToiThieu}
                            expiry={`${dayBD}.${monthBD}.${yearBD} - ${dayKT}.${monthKT}.${yearKT}`}
                            onPress={() => updateCheck(item)}
                            checkSelect={item.checkSelect}
                            show={true}
                            style={{
                                margin: 10,

                            }}
                        />
                    )
                }}
            />

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

export default PromotionScreen