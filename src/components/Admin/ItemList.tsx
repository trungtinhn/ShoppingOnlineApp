import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import CUSTOM_COLOR from '../../constants/color';
import { back } from '../../../assets/Admin/icons';

const ItemList = (props: any) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={props.onPress}
    >
      <View style={styles.infoContainer}>
        <Image
          resizeMode='cover'
          source={{ uri: props.source }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{props.namelist}</Text>
          <Text style={styles.productCount}>{props.numberitem} Product</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={props.onEditPress} style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <Image
          resizeMode='contain'
          source={back}
          style={styles.backIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 9,
    flexDirection: 'row',
    width: '100%',
    height: 70,
    elevation: 3,
    shadowColor: CUSTOM_COLOR.Black,
    backgroundColor: CUSTOM_COLOR.White,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 50,
    width: 50,
    marginLeft: 20,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 30,
  },
  name: {
    color: CUSTOM_COLOR.Black,
    fontSize: 18,
  },
  productCount: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginRight: 10,
  },
  editText: {
    color: CUSTOM_COLOR.DarkOrange,
    fontSize: 16,
  },
  backIcon: {
    width: 10,
    height: 10,
  },
});

export default ItemList;
