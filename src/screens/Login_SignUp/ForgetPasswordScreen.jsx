import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Login_SignUp/HeaderWithBack';
import HeaderTitlle from '../../components/Login_SignUp/HeaderTitlle';
import { IMG_Rectangle182 } from '../../../assets/Login_SignUp/images';
import TextInputCard from '../../components/Login_SignUp/TextInputCard';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';

export default function ForgetPasswordScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_Rectangle182}
        resizeMode="cover"
        style={styles.container}>
        <View style={{width: '100%', height: 20}} />
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={[styles.topContainer, styles.unitContainer]}>
          <HeaderTitlle title="Forgot Password" />
          {/* <HederContent content="Fill some Personal Information" /> */}
        </View>

        <View style={{width: '100%', height: '10%'}} />

        <View style={[styles.centerContainer, styles.unitContainer]}>
          <TextInputCard
            title="Enter your account email"
            txtInput="abc@gmail.com"
            onChangeText={()=>{}}
            keyboardType="email-address"
          />
        </View>

        <View style={{width: '100%', height: '5%'}} />

        <View style={[styles.botContainer, styles.unitContainer]}>
          <View
            style={{
              width: '200%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              left: '-50%',
            }}>
            <CustomButton
              type="primary"
              text="Continue"
              onPress={() => {
                //fogotPassword(email);
                navigation.navigate('SmartOTP')
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
        backgroundColor: CUSTOM_COLOR.White,
      },
      unitContainer: {
        width: '80%',
        marginHorizontal: '10%',
        justifyContent: 'center',
      },
      topContainer: {
        height: 60,
      },
      centerContainer: {
        height: 110,
      },
      botContainer: {
        height: 65,
      },
      italicText: {
        fontFamily: FONT_FAMILY.MediumItalic,
        fontSize: 15,
        color: CUSTOM_COLOR.Black,
        fontStyle: 'italic',
      },
})