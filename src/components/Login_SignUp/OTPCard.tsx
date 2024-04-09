import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import FONT_FAMILY from '../../constants/font'
import CUSTOM_COLOR from '../../constants/color'

const OTPCard = ( props: any ) => {
  const [otpValues, setOTPValues] = useState(['', '', '', '']);

  const handleOTPChange = (text: any, index: any) => {
    const newOTPValues = [...otpValues];
    newOTPValues[index] = text;
    setOTPValues(newOTPValues);

    // Gọi hàm callback để truyền giá trị OTP lên component cha
    const otp = newOTPValues.join('');
    props.onOTPChange(otp);
  };

  return (
    <View style={styles.container}>
      {otpValues.map((value, index) => (
        <TextInput
          key={index}
          style={styles.txtInput}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleOTPChange(text, index)}
          value={value}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 20,
  },
  txtInput: {
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.Sliver,
    height: 70,
    width: 70,
    textAlign: 'center',
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 20,
    color: CUSTOM_COLOR.Black,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.White,
    borderRadius: 15,
  },
});

export default OTPCard;
