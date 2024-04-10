import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import HeaderWithBack from '../../components/Login_SignUp/HeaderWithBack';
import HeaderTitlle from '../../components/Login_SignUp/HeaderTitlle';
import HeaderContent from '../../components/Login_SignUp/HeaderContent';
import PasswordCard from '../../components/Login_SignUp/PasswordCard';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import Size from '../../constants/size';

export default function ResetPasswordScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%', height: 10}}/>
      <HeaderWithBack onPress={() => navigation.goBack()} />
      <View style={[styles.topContainer, styles.unitContainer]}>
        <HeaderTitlle title="Reset Password" />
        <HeaderContent content="Your dentify has been vertified" />
        <HeaderContent content="Create your new password" />
      </View>

      <View style={[styles.centerContainer, styles.unitContainer]}>
        <View style={{width: '100%', height: '40%'}}>
          <PasswordCard
            title="New Password"
            txtInput="********"
            onChangeText={()=>{}
            }
          />
        </View>

        <View style={{width: '100%', height: '40%'}}>
          <PasswordCard
            title="Confirm your new Password"
            txtInput="********"
            onChangeText={()=>{}}
          />
        </View>
      </View>

      <View style={[styles.botContainer, styles.unitContainer]}>
        <View
          style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <HeaderContent content="I lost my phone and I cant receive the code" />
          <TouchableOpacity>
            <Text style={styles.italicText}>Help center</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
          <CustomButton
            type="primary"
            text="Continue"
            onPress={() => navigation.navigate('Done')}
          />
        </View>
      </View>
      
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
    height: Size.DeviceHeight*0.15,
    top: Size.DeviceHeight*0.01,
  },
  centerContainer: {
    height: Size.DeviceHeight*0.3,
    top: Size.DeviceHeight*0.07,
  },
  botContainer: {
    height: Size.DeviceHeight*0.17,
    bottom: '-20%',
  },
  italicText: {
    fontFamily: FONT_FAMILY.MediumItalic,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
    fontStyle: 'italic',
  },
});