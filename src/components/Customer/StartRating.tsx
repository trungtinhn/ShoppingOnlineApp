import React from "react";
import { StyleSheet, Text, TextInput, View, Image, ImageBackground, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { IC_StartCorner, IC_StartFull } from "../../../assets/Customer/icons"

import CUSTOM_COLOR from "../../constants/color";


const StarRating = (props: any) =>{


    const star = []

    for (let x = 1; x <= props.nums; x++)
    {
        star.push(
            <TouchableWithoutFeedback key={x}
                onPress ={() => props.fill = x}
            >
                <Image source={x <= props.fill ? IC_StartCorner : IC_StartFull}
                    style ={{
                        width: 17,
                        height: 17,
                        marginHorizontal: 1
                    }}
                />

            </TouchableWithoutFeedback>
        )
    }

    return(
        <View style ={{
            marginTop: 2,
            flexDirection: 'row'
        }}>
            {star}
        </View>
    
    )
   
};

export default StarRating