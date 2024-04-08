import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FONT_FAMILY from '../../constants/font'
import CUSTOM_COLOR from '../../constants/color'

const HeaderContent = (props: any) => {
  return (
    <Text style={styles.contentView}>{props.content}</Text>
  )
}

export default HeaderContent

const styles = StyleSheet.create({
    contentView: {
        fontFamily: FONT_FAMILY.Light,
        fontSize: 15,
        color: CUSTOM_COLOR.Black,
      },
})