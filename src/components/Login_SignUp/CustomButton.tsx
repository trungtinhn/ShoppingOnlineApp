import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import CUSTOM_COLOR from '../../constants/color'
import FONT_FAMILY from '../../constants/font'

const CustomButton = (props: any) => {
  return (
    <View style={styles.container}>
    <TouchableOpacity
      style={[
        styles.button,
        props.type === 'primary'
          ? styles.buttonPrimary
          : styles.buttonSecondary,
      ]}
      onPress={props.onPress}>
      <Text
        style={[
          styles.textButton,
          props.type === 'primary'
            ? styles.textButtonPrimary
            : styles.textButtonSecondary,
        ]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    button: {
      width: '50%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      alignSelf: 'center',
    },
  
    buttonPrimary: {
      backgroundColor: CUSTOM_COLOR.FlushOrange,
    },
  
    buttonSecondary: {
      backgroundColor: CUSTOM_COLOR.Carnation,
    },
  
    textButton: {
      fontFamily: FONT_FAMILY.CeraPro,
      fontSize: 20,
    },
  
    textButtonPrimary: {
      color: CUSTOM_COLOR.White,
    },
  
    textButtonSecondary: {
      color: CUSTOM_COLOR.White,
    },
  });
  