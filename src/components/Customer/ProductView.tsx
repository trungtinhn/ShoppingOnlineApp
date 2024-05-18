import React from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import FONT_FAMILY from "../../constants/font";
import Size from "../../constants/size";
import CUSTOM_COLOR from "../../constants/color";


const ProductView = (props: any) => {

   return (
      <View style={{
         width: 182,
         height: 230,
         marginHorizontal: 15,
         borderWidth: 1,
         borderRadius: 20,
         borderColor: CUSTOM_COLOR.LightGray,
         backgroundColor: CUSTOM_COLOR.White,
         marginVertical: 5
      }} >

         <Image
            source={props.source}
            style={{
               width: 180,
               height: 165,
               borderTopLeftRadius: 20,
               borderTopRightRadius: 20,

            }} />
         <View style={{ padding: 10 }}>
             <Text style={{
            marginVertical: 4,
            fontFamily: FONT_FAMILY.Light,
            color: CUSTOM_COLOR.Black,
         }}>{props.title}</Text>
         <Text style={{
            fontSize: 14,
            marginTop: -5,
            fontStyle: 'italic',
            //fontFamily: FONT_FAMILY.Bold,
            color: CUSTOM_COLOR.Black,
         }}>{props.price} đ</Text>
         </View>
        

      </View>
   )

};

export default ProductView