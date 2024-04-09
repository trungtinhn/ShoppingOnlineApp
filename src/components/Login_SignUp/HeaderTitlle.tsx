import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import FONT_FAMILY from '../../constants/font';
import CUSTOM_COLOR from '../../constants/color';

const HeaderTitlle = (props: any) => {
  return (
    <Text style={styles.titleView}>{props.title}</Text>
  )
}
const styles = StyleSheet.create({
    titleView: {
      fontFamily: FONT_FAMILY.CeraPro,
      fontSize: 40,
      color: CUSTOM_COLOR.Black,
      fontWeight: 'bold'
    },
  });
export default HeaderTitlle