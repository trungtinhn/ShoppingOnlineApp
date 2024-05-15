import React from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableWithoutFeedback } from "react-native";
import { IC_Search } from "../../../assets/Admin/icons";
import CUSTOM_COLOR from "../../constants/color";

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
          fontWeight: 'bold',
          marginVertical: '2%'
        }}>{props.title} </Text>

        <Text style={{
          color: CUSTOM_COLOR.Carnation
        }}>
          *
        </Text>
      </View>
      <View style={{

      }}>
        <TextInput
          style={{
            width: '100%',
            height: 45,

            borderRadius: 15,
            fontSize: 17,
            paddingHorizontal: 15,
            backgroundColor: CUSTOM_COLOR.Whisper,

          }}

          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
        />
      </View>

    </View>
  )

};

export default InputData