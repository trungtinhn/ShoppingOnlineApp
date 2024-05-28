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
               fontFamily: FONT_FAMILY.Medium,
               color: CUSTOM_COLOR.Black,
            }}>{props.title}</Text>
            <View style={styles.rowContent}>
               <Text style={{
                  fontSize: 14,
                  marginTop: -5,
                  fontStyle: 'italic',
                  //fontFamily: FONT_FAMILY.Bold,
                  color: CUSTOM_COLOR.FlushOrange,
               }}>đ{props.price}</Text>
               <Text style={{marginTop: -5, fontSize: 10}}>Đã bán 1,3k</Text>
            </View>
         </View>
        

      </View>
   )

};
const styles = StyleSheet.create({
   rowContent:{
      flexDirection: 'row',
      justifyContent: 'space-between'
   }
})

export default ProductView