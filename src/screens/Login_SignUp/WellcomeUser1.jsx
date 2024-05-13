import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { IMG_PexelsPhotobyMarleneLeppanen, IMG_WellcomeUser5 } from '../../../assets/Login_SignUp/images';
import { IC_Ellipse1, IC_Ellipse2 } from '../../../assets/Login_SignUp/icons';
import WellcomeCard from '../../components/Login_SignUp/WellcomeCard';

export default function WellcomeUser1({navigation}) {
  return (
   // <SafeAreaView style={styles.container}>
      <WellcomeCard
        image={IMG_WellcomeUser5}
        title="Fantastic And Modern"
        content="This is scription for all of the app"
        image1={IC_Ellipse1}
        image2={IC_Ellipse2}
        image3={IC_Ellipse2}
        text="Continue"
        onPress={() => navigation.navigate('WellcomeUser2')}
      />
   // </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});