import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Login_SignUp/HeaderWithBack';
import HeaderTitlle from '../../components/Login_SignUp/HeaderTitlle';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import FONT_FAMILY from '../../constants/font';
import CUSTOM_COLOR from '../../constants/color';
import HeaderContent from '../../components/Login_SignUp/HeaderContent';
import { IMG_Rectangle182 } from '../../../assets/Login_SignUp/images';
import OTPCard from '../../components/Login_SignUp/OTPCard';

export default function SmartOTPScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_Rectangle182}
        resizeMode="cover"
        style={styles.container}>
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={[styles.unitContainer, {height: '5%'}]}>
          <HeaderTitlle title="Smart OTP" />
        </View>
        <View style={[styles.topContainer, styles.unitContainer]}>
          <HeaderContent content="Please check your phone and type the verification code we sent to 0336******" />
        </View>

        <View style={{width: '100%', height: '8%', top: '8%'}}>
          <OTPCard />
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
                navigation.navigate('ResetPassword')
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
        top: '5%',
      },
      topContainer: {
        height: '8%',
        alignItems: 'center',
      },
      centerContainer: {
        width: '90%',
        height: '5%',
        top: '15%',
        marginHorizontal: '5%',
        flexDirection: 'row',
      },
      containerBot: {
        width: '100%',
        height: '10%',
        bottom: '-45%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        width: '100%',
        height: '100%',
      },
      resendStyles: {
        fontSize: 15,
        fontFamily: FONT_FAMILY.Light,
        color: CUSTOM_COLOR.Black,
        fontWeight: 'bold',
      },
})