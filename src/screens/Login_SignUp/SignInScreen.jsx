import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { IMG_Rectangle182, IMG_Separator } from '../../../assets/Login_SignUp/images'
import TextInputCard from '../../components/Login_SignUp/TextInputCard'
import PasswordCard from '../../components/Login_SignUp/PasswordCard'
import CustomButton from '../../components/Login_SignUp/CustomButton'
import HeaderContent from '../../components/Login_SignUp/HeaderContent'
import HeaderWithBack from '../../components/Login_SignUp/HeaderWithBack'
import HeaderTitlle from '../../components/Login_SignUp/HeaderTitlle'
import FONT_FAMILY from '../../constants/font'
import CUSTOM_COLOR from '../../constants/color'
import LogoButton from '../../components/Login_SignUp/LogoButton'
import Size from '../../constants/size'
export default function SignInScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground
        source={IMG_Rectangle182}
        resizeMode="cover"
        style={styles.container}> */}
        <View style={{width: '100%', height: 10}}/>
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={{width: '100%', height: Size.DeviceHeight*0.05}} />
        <View style={[styles.unitContainer, {height: 50}]}>
          <HeaderTitlle title="Login" />
          <View style={{width: '100%', height: '5%'}}/>
          <HeaderContent content="Login to accsess your Namu account"/>
        </View>

        <View style={{width: '100%', height: Size.DeviceHeight*0.05}} />

        <View style={[styles.unitContainer, styles.bodyContainer]}>
          <View style={{width: '100%', height: 110}}>
            <TextInputCard
              title="Email*"
              txtInput="abc@gmail.com"
              onChangeText={()=>{}}
              keyboardType="email-address"
            />
          </View>

          <View style={{width: '100%', height: 110}}>
            <PasswordCard
              title="Password*"
              txtInput="********"
              onChangeText={()=>{}}
            />
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.contentStyle}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>

        <>
          <View style={{width: '80%', height: 65, marginHorizontal: '10%'}}>
            <View style={styles.buttonContainer}>
              <CustomButton
                type="primary"
                text="Login"
                onPress={() => {
                }}
              />
            </View>
          </View>
        </>
        <View style={[styles.unitContainer, styles.botContainer]}>
          <View
            style={{flex: 5, justifyContent: 'center', alignItems: 'flex-end'}}>
            <HeaderContent content="Don't you have an account ? " />
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.contentStyle}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.logoContainer]}>
            <LogoButton type='google' onPress={()=>{}}></LogoButton>
            <LogoButton type='facebook' onPress={()=>{}}></LogoButton>
            <LogoButton type='twitter' onPress={()=>{}}></LogoButton>
        </View>
      
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White
  },
  unitContainer: {
    width: '80%',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
  bodyContainer: {
    height: 270,
    flexDirection: 'column',
  },
  containerBot: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '200%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-50%',
  },
  botContainer: {
    height: '5%',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  logoContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: '20%'
  },
  contentStyle: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
});