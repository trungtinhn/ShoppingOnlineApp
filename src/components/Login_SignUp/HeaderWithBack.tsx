import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PreviousButton from './PreviousButton'

const HeaderWithBack = (props: any) => {
  return (
    <View style={styles.header}>
      <View style={styles.buttonContainer}>
        <PreviousButton onPress={props.onPress}> </PreviousButton>
      </View>
    </View>
  )
}

export default HeaderWithBack

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
      },
      buttonContainer: {
        width: '12%',
        height: '100%',
        top: '15%',
        left: '8%',
      },
})