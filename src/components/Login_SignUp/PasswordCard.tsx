import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import FONT_FAMILY from '../../constants/font';
import CUSTOM_COLOR from '../../constants/color';
import { IC_visibility, IC_visibility1 } from '../../../assets/Login_SignUp/icons';

const PasswordCard = (props: any) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <View style={styles.textInputContainer}>
        <View style={{flex: 5}}>
          <TextInput
            style={styles.textinputStyle}
            placeholder={props.txtInput}
            // placeholderTextColor='CUSTOM_COLOR.Black'
            secureTextEntry={!isPasswordVisible}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={props.onChangeText}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              width: '80%',
              height: '80%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={togglePasswordVisibility}>
            <Image
              style={styles.iconStyle}
              source={isPasswordVisible ? IC_visibility : IC_visibility1}
            />
          </TouchableOpacity>

          {/* <Image
            source={IC_visibility1}
            style={{width: '60%', height: '60%', resizeMode: 'contain'}}
          /> */}
        </View>
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
      left: '5%',
    },
    textInputContainer: {
      width: '100%',
      height: '50%',
      backgroundColor: CUSTOM_COLOR.Alto,
      borderRadius: 40,
      flexDirection: 'row',
    },
    textinputStyle: {
      fontFamily: FONT_FAMILY.Semibold,
      fontSize: 15,
      color: CUSTOM_COLOR.Black,
      left: '5%',
      justifyContent: 'center',
    },
    iconStyle: {
      width: '60%',
      height: '60%',
      resizeMode: 'contain',
    },
  });
export default PasswordCard