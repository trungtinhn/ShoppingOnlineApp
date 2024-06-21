import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import { formatCurrency } from '../../utils/helpers';

const OneOrder = (props: any) => {
  return (
    <View style={styles.orderContainer}>
      <View style={styles.orderDetails}>
        <Image
          source={{ uri: props.source }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{props.title}</Text>
          <Text style={styles.productPrice}>{formatCurrency(props.price)} VND</Text>
          <Text>x{props.number}, {props.color}, {props.size} </Text>
          {/* <Text>Color: {props.color}</Text>
          <Text>Size: {props.size}</Text> */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>{props.totalPrice} VND</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OneOrder;

const styles = StyleSheet.create({
  orderContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  orderDetails: {
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: CUSTOM_COLOR.LightGray,
    flexDirection: 'row',
    padding: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 35,
  },
  productInfo: {
    flexDirection: 'column',
    marginLeft: 10,
    width: 250,
  },
  productTitle: {
    fontFamily: FONT_FAMILY.CeraPro,
    color: CUSTOM_COLOR.Black,
    fontSize: 20,
  },
  productPrice: {
    color: CUSTOM_COLOR.FlushOrange,
  },
  totalContainer: {
    marginTop: 5,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: CUSTOM_COLOR.Black,
    fontWeight: '600'
  },
  totalPrice: {
    //fontWeight: 'bold',
    marginRight: 20,
    fontFamily: FONT_FAMILY.CeraPro,
    color: CUSTOM_COLOR.FlushOrange,
  },
});
