import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, RefreshControl, Alert } from "react-native";
import CUSTOM_COLOR from "../../constants/color";
import { IC_Add } from "../../../assets/Customer/icons";
import Delivery from "../../components/Customer/Delivery";
import { BackIcon } from "../../../assets/Customer/svgs";
import { OrderContext } from "../../context/OrderContext";
import { getAddressByuserId } from "../../api/AddressApi";
import {firebase} from "../../../firebase/firebase"
import LoadingScreen from "../LoadingScreen";
function DeliveryScreen({ navigation }) {
    const { address, setAddress } = useContext(OrderContext);
    const [isLoading, setLoading] = useState(true)
    const [dataDelivery, setDataDelivery] = useState([])

    const getDataDelivery = async() => {
        const res = await getAddressByuserId({userId: firebase.auth().currentUser.uid})
        if(res.status === 200){
            const data = res.data.map((delivery) => {
                return { ...delivery, checkSelect: false }
            })
            setDataDelivery(data)
            setLoading(false)
        }else{
            console.log(res)
        }
    }

    const updateCheck = (item) => {
        const updateItem = dataDelivery.map((diachi) => {
            if (diachi._id === item._id) {
                diachi.checkSelect = true
                setAddress(diachi)
            }
            else diachi.checkSelect = false
            return diachi
        })
        setDataDelivery(updateItem)
    }

    useEffect(() => {
        getDataDelivery()
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
                    onPress={()=>{
                        if(address){
                            navigation.navigate('Checkout')
                        }else{
                            Alert.alert('Vui lòng chọn địa chỉ nhận hàng')
                        }
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        color: CUSTOM_COLOR.SeaBuckthorn
                    }}>Done</Text>
                </TouchableOpacity>
            </View>



            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={getDataDelivery} />}>
                {dataDelivery ? dataDelivery.map((item, index) => {
                    return (
                        <Delivery
                            name={item.buyerName}
                            phoneNumber={item.phoneNumber}
                            ward={item.ward}
                            district={item.district}
                            city={item.city}
                            key={index}
                            address={item.address}
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
                    onPress={() => navigation.navigate('DeliveryAddress')}
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