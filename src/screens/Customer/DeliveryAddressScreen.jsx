import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Button from "../../components/Customer/Button";
import InputData from "../../components/Customer/InputData";
import CUSTOM_COLOR from "../../constants/color";
import { BackIcon } from "../../../assets/Customer/svgs";
import {firebase} from '../../../firebase/firebase'
import { addAddress } from "../../api/AddressApi";
function DeliveryAddressScreen({ navigation}) {

    const [diaChi, setAddress] = useState('')
    const [phuongXa, setWard] = useState('')
    const [quanHuyen, setDistrict] = useState('')
    const [tinhTP, setTinhTP] = useState('')
    const [numberPhone, setNumberPhone] = useState('')
    const [name, setName] = useState('')


    const addDataAddress = async () => {
        if(diaChi === '' || phuongXa === '' || quanHuyen === '' || tinhTP === '' || numberPhone === '' || name === ''){
            return Alert.alert('Error', 'Please input all information') 
        }
        const data = {
            address: diaChi,
            ward: phuongXa,
            district: quanHuyen,
            city: tinhTP,
            phoneNumber: numberPhone,
            buyerName: name,
            userID: firebase.auth().currentUser.uid
        }
        const res = await addAddress({data: data})
        if(res.status === 200){
            navigation.navigate('Delivery')
        }else{
            console.log(res)
        }
    }

    return (
        <View style={styles.container}>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: CUSTOM_COLOR.White,
                height: 40
            }}>
                <TouchableOpacity 
                    style={{padding: 20}}
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

            <View style={{
                alignItems: 'center'
            }}>
                <InputData
                    title='Name'
                    width='85%'
                    placeholder='Input your name'
                    onChangeText={(text) => setName(text)}
                />

                <InputData
                    title='Address'
                    width='85%'
                    placeholder='Input your address'
                    onChangeText={(text) => setAddress(text)}
                />

                <InputData
                    title='Ward'
                    width='85%'
                    placeholder='Linh Trung'
                    onChangeText={(text) => setWard(text)}
                />
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <InputData

                    title='District'
                    width='40%'
                    placeholder='Binh Thanh'
                    onChangeText={(text) => setDistrict(text)}
                />
                <InputData
                    title='City'
                    width='40%'
                    placeholder='Ho Chi Minh City'
                    onChangeText={(text) => setTinhTP(text)}
                />
            </View>

            <View style={{
                alignItems: 'center'
            }}>
                <InputData
                    title='Phone number'
                    width='85%'
                    placeholder='0334971822'
                    onChangeText={(text) => setNumberPhone(text)}
                />
            </View>



            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 20
            }}>
                <Button
                    title='SAVE'
                    color={CUSTOM_COLOR.FlushOrange}
                    onPress={() => addDataAddress()}
                />
            </View>

        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White,
        paddingTop: 10
    }

})

export default DeliveryAddressScreen