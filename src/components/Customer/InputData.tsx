import React from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback } from "react-native";
import { IC_Search } from "../../../assets/Admin/icons";
import CUSTOM_COLOR from "../../constants/color";
import FONT_FAMILY from "../../constants/font";

const InputData = (props: any) => {

  return (
    <View style={{
      marginHorizontal: 10,
      width: props.width,
      ...props.style,
      marginVertical: 5

    }}>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Text style={{
          color: CUSTOM_COLOR.Black,
          fontSize: 17,
          fontFamily: FONT_FAMILY.Bold,
          marginVertical: '2%',
        }}>{props.title} </Text>

        <Text style={{
          color: CUSTOM_COLOR.Red
        }}>
          *
        </Text>
      </View>
      <View style={{

      }}>
        <TextInput
          style={{
            width: '100%',
            height: 65,
            borderRadius: 15,
            fontSize: 17,
            paddingHorizontal: 15,
            backgroundColor: CUSTOM_COLOR.LightGray,
            fontFamily: FONT_FAMILY.Medium
          }}

          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
        />
      </View>

    </View>
  )

};

export default InputData