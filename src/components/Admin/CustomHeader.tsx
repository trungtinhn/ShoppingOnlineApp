import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PreviousButton from '../Login_SignUp/PreviousButton';
import FONT_FAMILY from '../../constants/font';
import CUSTOM_COLOR from '../../constants/color';


const CustomHeader = (props: any) => {
  return (
    <View style={styles.header}>
      <View style={styles.buttonContainer}>
        <PreviousButton onPress={props.onPress}> </PreviousButton>
      </View>
      <View style={styles.titleConatiner}>
        <Text style={styles.titleStyle}>{props.title}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',

    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  titleConatiner: {
    flex: 7,
    justifyContent: 'center',
  },
  titleStyle: {
    fontFamily: FONT_FAMILY.Medium,
    fontWeight: 'bold',
    fontSize: 18,
    color: CUSTOM_COLOR.Black,
  },
});
export default CustomHeader;
