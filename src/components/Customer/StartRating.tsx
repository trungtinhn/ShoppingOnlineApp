// components/StarRating.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StarIcon, StarFullIcon, StarHaftIcon } from '../../../assets/Customer/svgs';
import CUSTOM_COLOR from '../../constants/color';
const StarRating = (props: any) => {
  const maxStars = props.maxStars;
  const rating = props.rating;  
  const renderStar = (starNumber : number) => {
    if (rating >= starNumber) {
      return <StarFullIcon fill={CUSTOM_COLOR.FlushOrange} width={20} height={20}/>;
    } else if (rating >= starNumber - 0.5) {
      return <StarHaftIcon fill={CUSTOM_COLOR.FlushOrange} width={20} height={20}/>;
    } else {
      return <StarIcon fill={CUSTOM_COLOR.FlushOrange} width={20} height={20}/>;
    }
  };

  return (
    <View style={styles.starContainer}>
      {[...Array(maxStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
            <View key={index}>
                {renderStar(starNumber)}
            </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
});

export default StarRating;
