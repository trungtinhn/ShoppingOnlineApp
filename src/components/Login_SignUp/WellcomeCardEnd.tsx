import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CUSTOM_COLOR from '../../constants/color'
import FONT_FAMILY from '../../constants/font'
import CustomButton from './CustomButton'

const WellcomeCardEnd = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground
      source={props.image}
      resizeMode="cover"
      style={styles.image}>
      <View style={styles.botContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.titleStyle}>{props.title}</Text>

          <Text style={styles.contentStyle}>{props.content}</Text>
        </View>

        <View style={styles.chooseContainer}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={props.image1}
              style={{width: '60%', height: '60%', resizeMode: 'contain'}}
            />
          </View>

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={props.image2}
              style={{width: '60%', height: '60%', resizeMode: 'contain'}}
            />
          </View>

          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={props.image3}
              style={{width: '60%', height: '60%', resizeMode: 'contain'}}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            type="primary"
            text={props.text}
            onPress={props.onPress}
          />
        </View>

        <View style={styles.botText}>
          <View
            style={{
              flex: 5,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.botContentStyle}>
              Already have an account?
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={props.onPress1}>
              <Text style={[styles.botContentStyle, {fontWeight: 'bold'}]}>
                {' '}
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  </SafeAreaView>
  )
}

export default WellcomeCardEnd

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        justifyContent: 'center',
      },
      botContainer: {
        backgroundColor: CUSTOM_COLOR.White,
        width: '90%',
        height: '35%',
        marginHorizontal: '5%',
        borderRadius: 25,
        bottom: '-22%',
      },
      textContainer: {
        width: '90%',
        height: '35%',
        marginHorizontal: '5%',
        top: '8%',
      },
      titleStyle: {
        fontSize: 25,
        fontFamily: FONT_FAMILY.Semibold,
        color: CUSTOM_COLOR.Black,
        fontWeight: 'bold',
      },
      contentStyle: {
        fontSize: 18,
        fontFamily: FONT_FAMILY.Light,
        color: CUSTOM_COLOR.Black,
        top: '10%',
      },
      chooseContainer: {
        width: '30%',
        height: '12%',
        marginHorizontal: '35%',
        top: '6%',
        flexDirection: 'row',
      },
      buttonContainer: {
        width: '180%',
        height: '25%',
        top: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        left: '-40%',
      },
      botText: {
        width: '90%',
        height: '10%',
        marginHorizontal: '5%',
        flexDirection: 'row',
        top: '9%',
      },
      botContentStyle: {
        fontSize: 15,
        fontFamily: FONT_FAMILY.Light,
        color: CUSTOM_COLOR.Black,
      },
})