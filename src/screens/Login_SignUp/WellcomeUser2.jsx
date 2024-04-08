import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import WellcomeCard from '../../components/Login_SignUp/WellcomeCard'
import { IMG_PexelsPhotobyRAULREYNOSO, IM_WellcomeUser3 } from '../../../assets/Login_SignUp/images'
import { IC_Ellipse1, IC_Ellipse2 } from '../../../assets/Login_SignUp/icons'

export default function WellcomeUser2({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WellcomeCard
        image={IM_WellcomeUser3}
        title="Change your mind"
        content="This is scription for all of the app"
        image1={IC_Ellipse2}
        image2={IC_Ellipse1}
        image3={IC_Ellipse2}
        text="Continue"
        onPress={() => navigation.navigate('WellcomeUser3')}
      />
    </SafeAreaView>
  )
}