import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import {React, useState} from 'react'
import HeaderWithBack from '../../components/Login_SignUp/HeaderWithBack';
import HeaderTitlle from '../../components/Login_SignUp/HeaderTitlle';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import FONT_FAMILY from '../../constants/font';
import CUSTOM_COLOR from '../../constants/color';
import HeaderContent from '../../components/Login_SignUp/HeaderContent';
import { IMG_Rectangle182 } from '../../../assets/Login_SignUp/images';
import OTPCard from '../../components/Login_SignUp/OTPCard';
import Size from '../../constants/size';

export default function SmartOTPEmailScreen({navigation}) {
    const [otp, setOTP] = useState('');

    const handleOTPChange = (otpValue) => {
      setOTP(otpValue);
      
    };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_Rectangle182}
        resizeMode="cover"
        style={styles.container}>
        <View style={{width: '100%', height: 10}} />
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={[styles.unitContainer, {height: 50}]}>
          <HeaderTitlle title="Smart OTP" />
        </View>
        <View style={[styles.topContainer, styles.unitContainer]}>
          <HeaderContent content="Please check your phone and type the verification code we sent to tr***@gmail.com" />
        </View>

        <View style={{width: '100%', height: Size.DeviceHeight*0.08, top: Size.DeviceHeight*0.08}}>
        <OTPCard onOTPChange={handleOTPChange} />
        </View>

        <View style={styles.centerContainer}>
          <View
            style={{flex: 3, justifyContent: 'center', alignItems: 'flex-end'}}>
            <HeaderContent content="You don’t receive the code?  " />
          </View>

          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity>
              <Text style={styles.resendStyles}>Resend (After 2:00)</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerBot}>
          <View style={styles.button}>
            <CustomButton
              type="primary"
              text="Continue"
              onPress={() => {
                Alert.alert('OTP', otp);
                navigation.navigate('Congratulation')
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      unitContainer: {
        width: '80%',
        marginHorizontal: '10%',
        justifyContent: 'center',
        top: Size.DeviceHeight*0.05,
      },
      topContainer: {
        height: Size.DeviceHeight*0.08,
        alignItems: 'center',
      },
      centerContainer: {
        width: '100%',
        height: Size.DeviceHeight*0.05,
        top: Size.DeviceHeight*0.08,
        flexDirection: 'row',
      },
      containerBot: {
        height: Size.DeviceHeight*0.1,
        bottom: -Size.DeviceHeight*0.45,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      button: {
        width: '150%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      },
      resendStyles: {
        fontSize: 15,
        fontFamily: FONT_FAMILY.Light,
        color: CUSTOM_COLOR.Black,
        fontWeight: 'bold',
      },
})