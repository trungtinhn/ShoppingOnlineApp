import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import FONT_FAMILY from "../../constants/font";
import CUSTOM_COLOR from "../../constants/color";

const ProductView = (props: any) => {
   return (
      <View style={styles.container}>
         <Image
            source={{uri: props.source}}
            style={styles.image} 
         />
         <View style={styles.content}>
             <Text
               style={styles.title}
               numberOfLines={1}
               ellipsizeMode='tail'
             >
               {props.title}
             </Text>
            <View style={styles.rowContent}>
               <Text style={styles.price}>đ{props.price}</Text>
               <Text style={styles.sold}>Đã bán 1,3k</Text>
            </View>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: 182,
      height: 230,
      marginHorizontal: 15,
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
