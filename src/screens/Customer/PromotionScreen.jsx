import React, { useEffect, useState, useContext } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, RefreshControl, Alert } from "react-native";
import { IC_Back } from "../../../assets/Customer/icons";
import Promotion from "../../components/Customer/Promotion";
import CUSTOM_COLOR from "../../constants/color";
import { BackIcon } from "../../../assets/Customer/svgs";
import { OrderContext } from "../../context/OrderContext";
import { getPromotionCurrent } from "../../api/PromotionApi";
import LoadingScreen from "../LoadingScreen";

function PromotionScreen({ navigation}) {

    const { promoCode , setPromoCode } = useContext(OrderContext);

    const [isLoading, setLoading] = useState(true)

    const [dataKhuyenMai, setDataKhuyenMai] = useState([])

    const getDataKhuyenMai = async () => {
        const res = await getPromotionCurrent();
        if (res.status === 200) {
          const data = res.data.map((promo) => {
            return { ...promo, 
                checkSelect: false }
          })
          setDataKhuyenMai(data);
          setLoading(false);
        } else {
          console.log(res);
        }
    };

    const updateCheck = (item) => {
        const updateItem = dataKhuyenMai.map((promo) => {
            if (promo._id === item._id) {
                promo.checkSelect = true
                setPromoCode(item)
            }
            else promo.checkSelect = false
            return promo
        })
        setDataKhuyenMai(updateItem)

    }

    
      
    useEffect(() => {
        getDataKhuyenMai()
    }, [])

    if(isLoading){
        return <LoadingScreen/>
    }
    else
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
                    }}>Promotion</Text>
                </View>
                <TouchableOpacity style={{
                    marginHorizontal: 15
                }}
                    onPress={() => {
                        if(promoCode){
                            navigation.navigate('Checkout')
                        }
                        else{
                            Alert.alert("Thông báo","Vui lòng chọn khuyến mãi")
                        }
                    }   
                    }>
                    <Text style={{
                        fontSize: 18,
                        color: CUSTOM_COLOR.SeaBuckthorn
                    }}>Done</Text>
                </TouchableOpacity>
            </View>

            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getDataKhuyenMai} />}>
                {dataKhuyenMai.map((item, index) => {
                    const startDate = new Date(item.StartDate);
                    const endDate = new Date(item.EndDate);
                    const dayBD = startDate.getDate();
                    const monthBD = startDate.getMonth() + 1;
                    const yearBD = startDate.getFullYear();
                    const dayKT = endDate.getDate();
                    const monthKT = endDate.getMonth() + 1;
                    const yearKT = endDate.getFullYear();
                        return (
                            <Promotion
                                source={item.PromotionImage}
                                key={index}
                                title={item.PromotionName}
                                minimum={item.MinimumOrder}
                                expiry={`${dayBD}.${monthBD}.${yearBD} - ${dayKT}.${monthKT}.${yearKT}`}
                                onPress={() => updateCheck(item)}
                                checkSelect={item.checkSelect}
                                show={true}
                                style={{
                                    margin: 10,

                                }}
                            />
                        )
                })}
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

export default PromotionScreen