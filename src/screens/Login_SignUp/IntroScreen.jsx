import { View, Text, ImageBackground, SafeAreaView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import FONT_FAMILY from '../../constants/font';
import CUSTOM_COLOR from '../../constants/color';
import { IC_Line } from '../../../assets/Login_SignUp/icons';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import { IMG_Rectangle, IMG_Rectangle2, IMG_image1 } from '../../../assets/Login_SignUp/images';
import LoadingComponent from '../../components/LoadingComponent';
import Line from '../../../assets/Login_SignUp/svg/Line.svg'
export default function IntroScreen({navigation}) {

  const [isLoading, setLoading] = useState('true');

  useEffect(() => {
    const timer = setTimeout(() => {
      // Chuyển đến màn hình tiếp theo sau 2 giây
      setLoading(false);
      navigation.navigate('WellcomeUser1'); // Thay thế màn hình hiện tại
    }, 2000); // 2 giây

    // Xóa timeout khi component unmount để tránh memory leak
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <>
        <ImageBackground
          source={IMG_image1}
          resizeMode="cover"
          style={styles.image}>
          <ImageBackground
            source={IMG_Rectangle}
            resizeMode="cover"
            style={styles.image}>
            <>
              <View style={styles.containeTop}>
                <View style={styles.viewTop}>
                  <Line width={'100%'} height={15}></Line>
                  <Text style={styles.baseText}>NAMU</Text>
                </View>

                <View style={styles.viewBot}>
                  <View style={styles.flexbot}>
                    <Image
                      source={IC_Line}
                      style={{width: '100%', height: '10%'}}
                    />
                  </View>

                  <View style={styles.flexbot}>
                    <Text style={styles.botBaseText}>CLOTHING</Text>
                  </View>

                  <View style={styles.flexbot}>
                    <Image
                      source={IC_Line}
                      style={{width: '100%', height: '10%'}}
                    />
                  </View>
                </View>
              </View>
            </>

            <>
              {isLoading? <LoadingComponent></LoadingComponent> : 
               <View style={styles.buttonContainer}>
                <CustomButton
                  type="primary"
                  text="Continue"
                  onPress={() => navigation.navigate('WellcomeUser1')}
                />
              </View> }
             
              
              <View style={styles.containeBottom}>
                <Text style={styles.botBaseText}>
                  Build the better world in fashion
                </Text>
              </View>
            </>
          </ImageBackground>
        </ImageBackground>
      </>
      {/* {isLoading ? (
      ) : (
        navigation.navigate('WellcomeUser1')
      )} */}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  containeTop: {
    width: '90%',
    height: '23%',
    top: '-10%',
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTop: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '65%',
  },
  baseText: {
    fontSize: 85,
    fontFamily: FONT_FAMILY.Recoleta,
    color: CUSTOM_COLOR.White,
  },
  viewBot: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
  },
  flexbot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botBaseText: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.CeraPro,
    color: CUSTOM_COLOR.White,
  },
  botBaseTextBlack:{
    fontSize: 20,
    fontFamily: FONT_FAMILY.CeraPro,
    color: CUSTOM_COLOR.Black,
  },
  buttonContainer: {
    width: '180%',
    height: '10%',
    bottom: '-25%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-40%',
  },
  containeBottom: {
    width: '90%',
    height: '15%',
    bottom: '-20%',
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});