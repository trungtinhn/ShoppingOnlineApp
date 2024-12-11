import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { IC_Delete, IC_Next } from '../../../assets/Customer/icons'
import CUSTOM_COLOR from "../../constants/color";
import { DeleteIcon, NextIcon } from "../../../assets/Customer/svgs";
import FONT_FAMILY from "../../constants/font";
import CheckBox from "@react-native-community/checkbox";
import { formatCurrency } from "../../utils/helpers";


const ProductCheckOut = (props: any) => {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 10,
            borderWidth: 1,
            borderColor: CUSTOM_COLOR.LightGray,
            backgroundColor: CUSTOM_COLOR.WhitePorcelain,
            padding: 5,
            borderRadius: 20,
            ...props.style
        }}
            onPress={props.onPressProduct}
        >
            {props.show ?
                <CheckBox value={props.checkSelect} onValueChange={props.onPress} /> : null}
                

            <Image source={{uri:props.source}}
                style={{
                    width: 100,
                    height: 120,
                    borderRadius: 20,
                    marginHorizontal: props.show ? 10 : 20
                }}
            />

            <View style={{ width: props.check ? '50%' : '65%' }}>
                <Text numberOfLines={2} style={{
                    fontSize: 17,
                    fontFamily: FONT_FAMILY.Semibold,
                    color: CUSTOM_COLOR.Black,
                    marginVertical: 2
                }}>{props.title}</Text>
                <Text style={{
                    fontStyle: 'italic',

                }}>Color: {props.color}</Text>
                <Text style={{
                    fontStyle: 'italic',

                }}>Size: {props.size}</Text>
                <Text style={{
                    marginVertical: 2,
                    fontSize: 17,
                    color: CUSTOM_COLOR.FlushOrange,
                    fontFamily: FONT_FAMILY.CeraPro,
                }}>{formatCurrency(props.price)}đ</Text>

                {props.show ?

                    <View style={{
                        flexDirection: 'row',

                        marginVertical: 5,
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                    }}>
                        <TouchableOpacity style={styles.buttonNum}
                            onPress={props.onPressDown}
                        >
                            <Text style={styles.content}>-</Text>
                        </TouchableOpacity>

                        <Text style={{marginRight: 10, fontFamily: FONT_FAMILY.Semibold, fontWeight: 'bold'}}>{props.number}</Text>

                        <TouchableOpacity style={styles.buttonNum}
                            onPress={props.onPressUp}
                        >
                            <Text style={styles.content}>+</Text>
                        </TouchableOpacity>
                    </View> :
                    <View>
                        <Text style={{
                            fontStyle: 'italic'
                        }}>Amount: {props.number}</Text>
                    </View>}
            </View>

            {props.check ?

            <TouchableOpacity style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                backgroundColor: props.show ? CUSTOM_COLOR.White : CUSTOM_COLOR.WhitePorcelain,
                marginHorizontal: props.show ? 5 : 10,
            }}
                onPress={props.onPressDelete}
            >
                {props.show ? <DeleteIcon/> : <NextIcon/>}
            </TouchableOpacity>
            :<View style={{height: 30, width: 30}}></View>
            }
        </TouchableOpacity>
    )

};

const styles = StyleSheet.create({
    buttonNum: {
        width: 30,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: CUSTOM_COLOR.FlushOrange,
        marginRight: 10
    },
    content: {
        fontSize: 20,
        fontWeight: 'bold',
        color: CUSTOM_COLOR.White,
    }
})

export default ProductCheckOut