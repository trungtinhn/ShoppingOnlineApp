import React from "react";
import { StyleSheet, Text, TextInput, View, Image, ImageBackground } from "react-native";
import CUSTOM_COLOR from "../../constants/color";
import FONT_FAMILY from "../../constants/font";


const Categories = (props: any) => {

  return (
    <View style={{ width: 300, height: 150, borderRadius: 30, marginVertical: 10, marginHorizontal: 50, alignItems: "center", justifyContent: 'center' }}>

      <Image source={props.source}
        resizeMode='cover'
        style={{
          borderRadius: 30,
          borderColor: CUSTOM_COLOR.FlushOrange,
          width: 300,
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          alignSelf: 'center'
        }}
      />

      <View style={{
        width: 300,
        backgroundColor: 'rgba(50, 50, 50, 0.5)',
        alignItems: 'center',
        position: 'absolute',
        bottom: 45,
      }}>
        <Text style={{
          textAlign: 'center',
          fontSize: 30,
          color: CUSTOM_COLOR.White,
          fontFamily: FONT_FAMILY.CeraPro,
          paddingHorizontal: 40,
          paddingVertical: 10,
          shadowOpacity: 1
        }}>{props.title}</Text>
      </View>

    </View>

  )

};

export default Categories