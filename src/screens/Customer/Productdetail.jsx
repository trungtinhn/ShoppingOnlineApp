import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import CUSTOM_COLOR from "../../constants/color";
import StarRating from "../../components/Customer/StartRating";
import { IC_User } from "../../../assets/Customer/icons";
import ColorPicker from "../../components/Customer/ColorPicker";
import { IM_AnhGiay1 } from "../../../assets/Customer/images";
function ProductDeatail({ navigation, route }) {
    //const { item } = route.params
    return (
        <View style={styles.container}>
            <Image source={IM_AnhGiay1} resizeMode="center" style={{ backgroundColor: CUSTOM_COLOR.White, height: 400, width: 400 }} />
            <View style={{ padding: 10, flexDirection: 'row' }}>
                <Text style={styles.productName}>
                    Giày
                </Text>
            </View>
            <View style={styles.flexRow}>
                <View style={{ flexDirection: 'row' }}>
                    <Text> 4.6 </Text>
                    <StarRating
                        nums={5}
                        fill={4.6}
                    />
                </View>
                <Text style={styles.textLarge}> Đánh giá: 2.9k</Text>
                <Text style={styles.textLarge}> Đã bán: 2.4k</Text>
            </View>
            <ColorPicker colors={['red', 'green','blue']}></ColorPicker>
            <View style={styles.text}>
                <View>
                    <Text>Giá tiền:</Text>
                    <Text style={styles.pride}>1000đ</Text>
                </View>
                <View style={{ backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Thêm Vào Giỏ Hàng</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    productName: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
    },
    pride: {
        fontSize: 20,
        color: CUSTOM_COLOR.FlushOrange,
    },
    text: {
        gap: 10,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    textLarge: {
        fontSize: 15,
        fontWeight: 'bold',
        color: CUSTOM_COLOR.Black
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
        marginHorizontal: '2%'
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
        width: '100%',
    },
    sizeCircle: {
        width: 25,
        height: 25,
        backgroundColor: CUSTOM_COLOR.Alto,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginHorizontal: 5
    },

})

export default ProductDeatail