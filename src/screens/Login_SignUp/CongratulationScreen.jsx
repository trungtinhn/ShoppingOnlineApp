import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from '../../components/Login_SignUp/CustomButton';
import { IMG_emojione_fireworks } from '../../../assets/Login_SignUp/images';
import FONT_FAMILY from '../../constants/font';
import CUSTOM_COLOR from '../../constants/color';

export default function CongratulationScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerCenter}>
        <Image
          source={IMG_emojione_fireworks}
          style={{width: '60%', height: '60%', resizeMode: 'contain'}}
        />

        <View style={styles.textView}>
          <Text style={styles.topText}>CONGRATULATION!</Text>
          <Text style={styles.botText}>Your account has been activated</Text>
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
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 15,
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
});