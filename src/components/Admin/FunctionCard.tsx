import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FONT_FAMILY from '../../constants/font'
import CUSTOM_COLOR from '../../constants/color'

const FunctionCard = (props: any) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={props.onPress}>
    <View
      style={{
        width: '50%',
        height: '80%',
        backgroundColor: CUSTOM_COLOR.FlushOrange,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{ width: '75%', height: '75%', resizeMode: 'stretch', tintColor: CUSTOM_COLOR.White }}
        source={props.source}
      />
    </View>
    <View style={{ width: '100%', height: 7 }} />
    <Text style={styles.textViewStyle}>{props.text}</Text>
  </TouchableOpacity>
  )
}

export default FunctionCard

const styles = StyleSheet.create({
    iconContainer: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      textViewStyle: {
        fontFamily: FONT_FAMILY.Semibold,
        fontSize: 15,
        color: CUSTOM_COLOR.Black,
      },
})