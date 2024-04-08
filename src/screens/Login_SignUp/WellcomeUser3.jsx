import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { IMG_PexelsPhotobyJeysTubianosa, IM_WellcomeUser4 } from '../../../assets/Login_SignUp/images'
import { IC_Ellipse1, IC_Ellipse2 } from '../../../assets/Login_SignUp/icons'
import WellcomeCardEnd from '../../components/Login_SignUp/WellcomeCardEnd'

export default function WellcomeUser3({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <WellcomeCardEnd
        image={IM_WellcomeUser4}
        title="Level Up Your Style"
        content="Are your ready to make differences ?"
        image1={IC_Ellipse2}
        image2={IC_Ellipse2}
        image3={IC_Ellipse1}
        text="Get Started"a
        onPress={() => navigation.navigate('SignUp')}
        onPress1={() => navigation.navigate('SignIn')}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});