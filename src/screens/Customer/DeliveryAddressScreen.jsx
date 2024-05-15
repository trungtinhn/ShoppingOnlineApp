import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from "react-native";
import { IC_Back, IC_Location, IC_MyLocation} from "../../../assets/Customer/icons"
import Button from "../../components/Customer/Button";
import InputData from "../../components/Customer/InputData";
import CUSTOM_COLOR from "../../constants/color";

function DeliveryAddressScreen({ navigation, route }) {

    const { itemsCheckout, totalMoney, choosePayment, promotion } = route.params

    const [diaChi, setDiaChi] = useState('')
    const [phuongXa, setPhuongXa] = useState('')
    const [quanHuyen, setQuanHuyen] = useState('')
    const [tinhTP, setTinhTP] = useState('')
    const [numberPhone, setNumberPhone] = useState('')
    const [name, setName] = useState('')


    const addDataAddress = async () => {
        // const docRef = await addDoc(collection(Firestore, "DIACHI"), {
        //     DiaChi: diaChi,
        //     PhuongXa: phuongXa,
        //     QuanHuyen: quanHuyen,
        //     TinhThanhPho: tinhTP,
        //     SDT: numberPhone,
        //     TenNguoiMua: name,
        //     MaND: firebase.auth().currentUser.uid
        // });
        // const updateRef = doc(Firestore, "DIACHI", docRef.id);

        // await updateDoc(updateRef, {
        //     MaDC: docRef.id
        // });

        // const loadRef = doc(Firestore, "DIACHI", docRef.id);
        // const docSnap = await getDoc(loadRef);

        // navigation.navigate('Delivery', { itemsCheckout, totalMoney, choosePayment, promotion })


        // return docSnap.data()

    }




    return (
        <View style={styles.container}>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: CUSTOM_COLOR.White,
                height: 40
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
                    onChangeText={(text) => setDiaChi(text)}
                />

                <InputData
                    title='Ward'
                    width='85%'
                    placeholder='Linh Trung'
                    onChangeText={(text) => setPhuongXa(text)}
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
                    onChangeText={(text) => setQuanHuyen(text)}
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
        backgroundColor: CUSTOM_COLOR.White
    }

})

export default DeliveryAddressScreen