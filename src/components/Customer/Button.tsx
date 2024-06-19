import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';

const Button = (props: any) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: props.color,
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginHorizontal: 10,
        minWidth: 150,
        ...props.style,
      }}
      onPress={props.onPress}>
      <Text
        style={{
          color: CUSTOM_COLOR.White,
          fontSize: 17,
          fontFamily: FONT_FAMILY.CeraPro,
        }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
