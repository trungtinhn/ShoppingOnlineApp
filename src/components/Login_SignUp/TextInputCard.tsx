import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import FONT_FAMILY from '../../constants/font';
import CUSTOM_COLOR from '../../constants/color';
import Size from '../../constants/size';

const TextInputCard = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{props.title}</Text>

      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textinputStyle}
          placeholder={props.txtInput}
          // placeholderTextColor='CUSTOM_COLOR.Black'
          onChangeText={props.onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={props.keyboardType}
          value={props.value}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    titleStyle: {
      fontFamily: FONT_FAMILY.Medium,
      fontSize: 20,
      color: CUSTOM_COLOR.Black,
    },
    textInputContainer: {
      width: '100%',
      height: '50%',
      backgroundColor: CUSTOM_COLOR.White,
      borderRadius: Size.BorderRadius,
      borderWidth: 1,
      borderColor: CUSTOM_COLOR.Sliver,
      flexDirection: 'row',
      top: '1%'
    },
    textinputStyle: {
      fontFamily: FONT_FAMILY.Semibold,
      fontSize: 15,
      color: CUSTOM_COLOR.Black,
      left: '25%',
      justifyContent: 'center',
    },
  });
export default TextInputCard
