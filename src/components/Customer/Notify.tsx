import React from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import CUSTOM_COLOR from "../../constants/color";


const Notify = (props: any) => {

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: CUSTOM_COLOR.LightGray,
      backgroundColor: CUSTOM_COLOR.White,
      padding: 10
    }}>

      <Image source={{uri: props.source}}
        style={{
          width: 60,
          height: 60,
          margin: 10,
        }}
      />

      <View style={{
        width: '75%'
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%'
        }}>
          <Text style={{
            fontSize: 17,
            fontWeight: 'bold',
            
          }}>{props.title}</Text>
        </View>

        <Text>{props.content}</Text>
        <Text style={{


        }}>{props.time}</Text>
      </View>

    </View>
  )

};

export default Notify