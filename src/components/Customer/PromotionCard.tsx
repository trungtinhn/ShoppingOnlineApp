import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CUSTOM_COLOR from "../../constants/color";
import FONT_FAMILY from "../../constants/font";
import {IMG_backgroundCard} from '../../../assets/Customer/images';

const PromotionCard = (props: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.accountContainer}>
        <ImageBackground
          source={IMG_backgroundCard}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.avataContainer}>
            <Image
              source={{uri:props.source}}
              style={{
                width: 200,
                height: 100,
                aspectRatio: 1,
                borderRadius: 20,
                resizeMode: 'cover',
              }}
            />
          </View>

          <View style={{width: '5%', height: '100%'}} />

          <View style={styles.textViewContainer}>
            <Text style={styles.titleStyles}>{props.name}</Text>
            <Text style={styles.contentStyles}>
              {props.type === 'GiamGia'
                ? `Giảm giá ${props.discount}%`
                : 'Miễn phí vẫn chuyển'}
            </Text>
            <Text style={styles.timeStyle}>
              {props.start} - {props.end}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    backgroundColor: CUSTOM_COLOR.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountContainer: {
    //width: '90%',
    height: '80%',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  avataContainer: {
    width: '40%',
    //height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: CUSTOM_COLOR.Alto
    //left: -15,
  },
  textViewContainer: {
    width: '60%',
    height: '100%',
    left: -25,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleStyles: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 22,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
  },
  contentStyles: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 20,
    color: CUSTOM_COLOR.White,
  },
  timeStyle:{
    fontFamily: FONT_FAMILY.CeraPro
  },
  minimumStyles: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: CUSTOM_COLOR.LightGray,
  },
});

export default PromotionCard;
