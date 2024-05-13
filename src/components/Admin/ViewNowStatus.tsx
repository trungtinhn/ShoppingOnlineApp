import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CUSTOM_COLOR from '../../constants/color'

const ViewNowStatus = (props: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text>+{props.number}</Text>
        <Text>{props.status}</Text>
      </View>
    </View>
  )
}

export default ViewNowStatus

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        backgroundColor: CUSTOM_COLOR.LightGray,
        width: 70,
        height: 70,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
})