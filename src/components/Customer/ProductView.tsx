import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import FONT_FAMILY from "../../constants/font";
import CUSTOM_COLOR from "../../constants/color";
import { formatSoldQuantity } from "../../utils/helpers";

const ProductView = (props: any) => {
   return (
      <View style={styles.container}>
         <Image
            source={{ uri: props.source}}
            style={{
               width: 180,
               height: 165,
               borderTopLeftRadius: 20,
               borderTopRightRadius: 20,
            }} />
         <View style={{ padding: 10 }}>
            <Text numberOfLines={1} ellipsizeMode="tail" style={{
               marginVertical: 4,
               fontFamily: FONT_FAMILY.Medium,
               color: CUSTOM_COLOR.Black,
            }}>{props.title}</Text>
            <View style={styles.rowContent}>
               <Text style={{
                  fontSize: 16,
                  marginTop: -5,
                  color: CUSTOM_COLOR.FlushOrange,
               }}>đ{props.price}</Text>
               <Text style={{fontSize: 10}}>Đã bán {formatSoldQuantity(props.quantity)}</Text>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: 182,
      height: 230,
      marginHorizontal: 5,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: CUSTOM_COLOR.LightGray,
      backgroundColor: CUSTOM_COLOR.White,
      marginVertical: 5
   },
   image: {
      width: 180,
      height: 165,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
   },
   content: {
      padding: 10
   },
   title: {
      marginVertical: 4,
      fontFamily: FONT_FAMILY.Medium,
      color: CUSTOM_COLOR.Black
   },
   rowContent: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   price: {
      fontSize: 14,
      marginTop: -5,
      fontStyle: 'italic',
      color: CUSTOM_COLOR.FlushOrange
   },
   sold: {
      marginTop: -5,
      fontSize: 10
   }
});

export default ProductView;
