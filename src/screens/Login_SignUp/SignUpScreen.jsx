import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
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
import DateInputCard from '../../components/Login_SignUp/DateInputCard'
import Size from '../../constants/size';
export default function SignUpScreen({navigation}) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Xử lý giá trị ngày ở đây
    console.log('Selected date:', date);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={{width: '100%', height: 10}} />
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={{width: '100%', height: Size.DeviceHeight*0.03}} />
        <View style={[styles.unitContainer, {height: 50}]}>
          <HeaderTitlle title="Sign Up" />
          <View style={{width: '100%', height: '5%'}}/>
          <HeaderContent content="Create a new account"/>
        </View>
        <View style={{width: '100%', height: Size.DeviceHeight*0.03}} />
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
            <DateInputCard title="Select Date" onDateChange={handleDateChange} />
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
                onValueChange={()=>{

                }}
              />
              <HeaderContent content="I agree with this " />
              <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
                <Text style={styles.policyStyles}>Privary Policies</Text>
              </TouchableOpacity>
            </View>

          <View style={styles.containerBot}>
            <View style={styles.button}>
              <CustomButton
                type="primary"
                text="Sign up now"
                onPress={() => {
                  navigation.navigate('SmartOTPEmail')
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White
  },
  scrollview:{
    width:'100%',
    height: '100%',
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
    height: 780,
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
});