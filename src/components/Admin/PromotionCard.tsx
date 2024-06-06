import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {IMG_backgroundCard} from '../../../assets/Admin/images';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';

const PromotionCard = (props: any) => {
  const {navigation} = props;

  // Function to parse date strings and determine the promotion status
  const getPromotionStatus = (start: string, end: string) => {
    const currentDate = new Date();
    const startDate = new Date(start.split('/').reverse().join('-'));
    const endDate = new Date(end.split('/').reverse().join('-'));

    if (currentDate < startDate) {
      return 'Sắp diễn ra'; // Upcoming
    } else if (currentDate > endDate) {
      return 'Đã hết hạn'; // Expired
    } else {
      return 'Đang diễn ra'; // Ongoing
    }
  };

  const status = getPromotionStatus(props.start, props.end);

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.accountContainer}>
        <ImageBackground
          source={IMG_backgroundCard}
          resizeMode="cover"
          style={styles.image}>
          <View style={styles.avataContainer}>
            <Image
              source={{uri: props.source}}
              style={{
                width: '80%',
                height: '80%',
                aspectRatio: 1,
                borderRadius: 50,
                resizeMode: 'center',
              }}
            />
          </View>

          <View style={{width: '5%', height: '100%'}} />

          <View style={styles.textViewContainer}>
            <Text style={styles.titleStyles}>{props.name}</Text>

            <Text style={styles.contentStyles}>
              {props.type === 'GiamGia'
                ? `Giảm giá ${props.discount}%`
                : 'Miễn phí vận chuyển'}
            </Text>
            <Text style={styles.minimumStyles}>
              Đơn tối thiểu {props.minimum}
            </Text>
            <Text style={styles.timeStyles}>
              {props.start} - {props.end}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{status}</Text>
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
    width: '90%',
    height: '80%',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative', // Required to position the status container
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  avataContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: CUSTOM_COLOR.White,
  },
  timeStyles: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 20,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
  },
  minimumStyles: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: CUSTOM_COLOR.LightGray,
  },
  statusContainer: {
    position: 'absolute',
    top: 15,
    left: 0,
    backgroundColor: CUSTOM_COLOR.Red, // Color for status label background
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
    transform: [{rotate: '-30deg'}],
  },
  statusText: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 15,
    color: CUSTOM_COLOR.White,
  },
});

export default PromotionCard;
