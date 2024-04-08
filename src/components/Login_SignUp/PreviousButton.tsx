import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { IC_Left, IC_previous } from '../../../assets/Login_SignUp/icons'
import CUSTOM_COLOR from '../../constants/color'

const PreviousButton = (props: any) => {
  return (
    <View style={styles.container}>
          <TouchableOpacity onPress={props.onPress}>
            <Image source={IC_Left} style={{resizeMode: 'contain'}} />
          </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      borderRadius: 14,
      borderWidth: 1,
      borderColor: CUSTOM_COLOR.Sliver,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: CUSTOM_COLOR.Mercury,
    },
  });
export default PreviousButton