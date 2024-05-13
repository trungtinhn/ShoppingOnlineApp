import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import CUSTOM_COLOR from '../../constants/color';
import { IC_Back } from '../../../assets/Admin/icons'
const BackTo = (props: any) => {
  return (
    <View style = {{flexDirection: 'row', marginTop: 5, ...props.style}}>
    <TouchableOpacity 
            onPress={props.onPress}
            style = {{width: 17, height: 17, marginLeft: 18, marginTop: 5}}>
              <Image
                  resizeMode='contain'
                  source={IC_Back}
                  style={{width:'100%',height:'100%'}}
               ></Image>
            </TouchableOpacity>
            <Text style = {{color: CUSTOM_COLOR.Black, fontSize: 18, marginLeft: 10}}>{props.Info}</Text>
    </View>
  )
}

export default BackTo

const styles = StyleSheet.create({})