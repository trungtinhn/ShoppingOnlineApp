import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import HeaderWithBack from '../../components/Login_SignUp/HeaderWithBack';
import HeaderTitlle from '../../components/Login_SignUp/HeaderTitlle';
import TextInputCard from '../../components/Login_SignUp/TextInputCard';
import PasswordCard from '../../components/Login_SignUp/PasswordCard';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import { IMG_Rectangle182 } from '../../../assets/Login_SignUp/images';
import HeaderContent from '../../components/Login_SignUp/HeaderContent';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
export default function SignUpScreen({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [birth, setBirth] = useState('01/01/2023');

  const handleDateChange = (event, selected) => {
    const currentDate = selected;
    setShowPicker(false);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    console.log('Date of birth: ', fDate);
    setBirth(fDate);
    setDate(selected);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={IMG_Rectangle182}
        resizeMode="cover"
        style={styles.container}>
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={[styles.topContainer, styles.unitContainer]}>
          <HeaderTitlle title="Sign Up" />
        </View>
        <View style={[styles.bodyContainer, styles.unitContainer]}>
          <View style={{flex: 1}}>
            <TextInputCard
              title="Full name*"
              txtInput="Nguyen Van A"
              // value={fullName}
              onChangeText={()=>{}}
            />
          </View>

          <View style={{flex: 1}}>
            <TextInputCard
              title="Email*"
              txtInput="abc@gmail.com"
              onChangeText={()=>{}}
              keyboardType="email-address"
              // value={email}
            />
          </View>

          <View style={{flex: 1}}>
            <TextInputCard
              title="Phone number"
              txtInput="03333333333"
              // value={phoneNumber}
              onChangeText={()=> {}}
            />
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.titleStyle}>Date of birth</Text>

            <View style={styles.dateContainer}>
              <TouchableOpacity
                style={styles.dateStyle}
                onPress={() => {
                  setShowPicker(true);
                }}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.Semibold,
                    fontSize: 15,
                    color: CUSTOM_COLOR.Black,
                    justifyContent: 'center',
                  }}>
                  {' '}
                  {birth}
                </Text>
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date" // Can be "date", "time", or "datetime"
                  display="spinner" // Can be "default", "spinner", or "calendar"
                  onChange={handleDateChange}
                />
              )}
            </View>
          </View>

          <View style={{flex: 1}}>
            <PasswordCard
              title="Password*"
              txtInput="********"
              // value={password}
              onChangeText={()=>{}}
            />
          </View>

          <View style={{flex: 1}}>
            <PasswordCard
              title="Confirm Password*"
              txtInput="********"
              onChangeText={()=>{}
              }
            />
          </View>

          <View style={[styles.checkContainer, styles.unitContainer]}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={()=>{}}
            />
            <HeaderContent content="I agree with this " />
            <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
              <Text style={styles.policyStyles}>Policy</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerBot}>
            <View style={styles.button}>
              <CustomButton
                type="primary"
                text="Sign up now"
                onPress={() => {
                  
                }}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  unitContainer: {
    width: '80%',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
  topContainer: {
    height: 50,
    top: '-1%',
    left: '3%',
  },
  bodyContainer: {
    height: 570,
    top: '0%',
  },
  checkContainer: {
    height: '4%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  containerBot: {
    width: '100%',
    height: 55,
    // marginHorizontal: '10%',
    marginTop: 10,
  },
  button: {
    width: '200%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-50%',
  },
  policyStyles: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.Light,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
  titleStyle: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 20,
    color: CUSTOM_COLOR.Black,
    left: '5%',
  },
  dateContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: CUSTOM_COLOR.Alto,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingLeft: '5%',
  },
  dateStyle: {
    width: '100%',
    height: '100%',
    paddingHorizontal: '5%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
});