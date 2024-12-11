import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMG_Rectangle182, IMG_mditickcircle } from '../../../assets/Login_SignUp/images'
import CustomButton from '../../components/Login_SignUp/CustomButton'
import FONT_FAMILY from '../../constants/font'
import CUSTOM_COLOR from '../../constants/color'

export default function DoneScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerCenter}>
          <Image
            source={IMG_mditickcircle}
            style={{width: '60%', height: '60%', resizeMode: 'contain'}}
          />
          <View style={{width: '100%', height: 5}} />
          <View style={styles.textView}>
            <Text style={styles.topText}>COMPLETE!</Text>
            <View style={{width: '100%', height: 5}} />
            <Text style={styles.botText}>
              Email reset password has been sent.
            </Text>
            <View style={{width: '100%', height: 3}} />
            <Text style={styles.botText}>
              Please check your email for password reset.
            </Text>
          </View>
        </View>

        <View style={styles.containerBot}>
          <View style={styles.button}>
            <CustomButton
              type="primary"
              text="Continue"
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      containerCenter: {
        width: '90%',
        height: '40%',
        top: '20%',
        marginHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textView: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      topText: {
        fontFamily: FONT_FAMILY.Semibold,
        fontSize: 30,
        color: CUSTOM_COLOR.Black,
        fontWeight: 'bold',
      },
      botText: {
        fontFamily: FONT_FAMILY.Light,
        fontSize: 17,
        color: CUSTOM_COLOR.Black,
      },
      containerBot: {
        width: '100%',
        height: '10%',
        bottom: '-40%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        width: '100%',
        height: '100%',
      },
})