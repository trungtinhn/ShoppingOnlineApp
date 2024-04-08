import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import FONT_FAMILY from '../../constants/font'
import CUSTOM_COLOR from '../../constants/color'

export default function OTPCard() {
  return (
    <View style={styles.container}>
      <View style={{flex: 2}} />

      <View style={{flex: 2}}>
        <TextInput style={styles.txtInput} />
      </View>

      <View style={{flex: 1}}></View>

      <View style={{flex: 2}}>
        <TextInput style={styles.txtInput}></TextInput>
      </View>

      <View style={{flex: 1}}></View>

      <View style={{flex: 2}}>
        <TextInput style={styles.txtInput}></TextInput>
      </View>

      <View style={{flex: 1}}></View>

      <View style={{flex: 2}}>
        <TextInput style={styles.txtInput}></TextInput>
      </View>

      <View style={{flex: 2}}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      txtInput: {
        fontFamily: FONT_FAMILY.Semibold,
        fontSize: 20,
        color: CUSTOM_COLOR.White,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CUSTOM_COLOR.White,
        width: '100%',
        height: '100%',
        borderRadius: 15,
      },
})