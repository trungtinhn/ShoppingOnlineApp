import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MenuIcon = (props: any) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={props.onPress}>
      <Image
        style={{width: '100%', height: '100%', resizeMode: 'stretch'}}
        source={props.source}
      />
    </TouchableOpacity>
  )
}

export default MenuIcon

const styles = StyleSheet.create({
    iconContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
})