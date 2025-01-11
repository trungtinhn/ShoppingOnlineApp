import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import HeaderWithBack from '../../components/Login_SignUp/HeaderWithBack';
import HeaderTitlle from '../../components/Login_SignUp/HeaderTitlle';
import TextInputCard from '../../components/Login_SignUp/TextInputCard';
import PasswordCard from '../../components/Login_SignUp/PasswordCard';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import HeaderContent from '../../components/Login_SignUp/HeaderContent';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import CheckBox from '@react-native-community/checkbox';
import DateInputCard from '../../components/Login_SignUp/DateInputCard'
import Size from '../../constants/size';
import { avatarDefault, isValidEmail, isValidPassword } from '../../utils/helpers';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {firebase} from '../../../firebase/firebase.js'
import { registerUser } from '../../api/UserApi';
export default function SignUpScreen({navigation}) {
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birth, setBirth] = useState('01/01/2023');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setuserType] = useState('customer');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [isStoreAccount, setIsStoreAccount] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  const isValidForm = (fullName, email, password, confirmPassword, toggleCheckBox) => {
    if (fullName === '' && email === '' && password === '' && confirmPassword === '') {
      return 'Please enter your information then click sign up';
    } else if (fullName === '') {
      return 'Please enter your full name';
    } else if (email === '') {
      return 'Please enter your email';
    } else if (!isValidEmail(email)) {
      return 'Your email is not valid';
    } else if (password === '') {
      return 'Please enter your password';
    } else if (!isValidPassword(password)) {
      return 'Your password must be longer than 8 characters';
    } else if (password !== confirmPassword) {
      return 'Confirm password does not match the password';
    } else if (confirmPassword === '') {
      return 'Please enter your confirm password';
    } else if (!toggleCheckBox) {
      return 'Please check agree with policy';
    }
    return null;
  };
  const handleRegister = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async(userCredential) => {
          // Signed in
        const user = userCredential.user;
        console.log('Register success: ', user);
          // ...
        try{
          const data = {
            fullName: fullName,
            email: email,
            phone: phoneNumber,
            dateOfBirth: birth,
            userId: user.uid,
            userType: isStoreAccount ? 'storeOwner' : 'customer',
            avatar: avatarDefault,
            storeId: '',
            address: '',
            gender: '',
          }
          console.log(data);
          const res = await registerUser({data: data});
          if (res.status === 201) {
            Alert.alert('Success', 'Account created successfully');
            navigation.navigate('Congratulation');
          } else {
            console.log(res);
            Alert.alert("Error", 'Failed to create account');
          }
          
        }catch(error){
          console.log(error);
        } 
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Register failed: ', errorMessage);
        });
  }
  const handleDateChange = (date) => {
    // Xử lý khi người dùng chọn ngày
    setBirth(date);
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
              onChangeText={fullName => setFullName(fullName)}
            />
          </View>
          <View style={{flex: 1}}>
            <TextInputCard
              title="Email*"
              txtInput="abc@gmail.com"
              onChangeText={email => setEmail(email)}
              keyboardType="email-address"
            />
          </View>
          <View style={{flex: 1}}>
            <TextInputCard
              title="Phone number"
              txtInput="03333333333"
              onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />
          </View>
          <View style={{flex: 1}}>
            <DateInputCard title="Select Date" onDateChange={handleDateChange} />
          </View>
          <View style={{flex: 1}}>
            <PasswordCard
              title="Password*"
              txtInput="********"
              onChangeText={password => setPassword(password)}
            />
          </View>
          <View style={{flex: 1}}>
            <PasswordCard
              title="Confirm Password*"
              txtInput="********"
              onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
            />
          </View>

          <View style={[styles.checkContainer, styles.unitContainer]}>
            <CheckBox
              disabled={false}
              value={isStoreAccount}
              onValueChange={newValue => setIsStoreAccount(newValue)}
            />
            <HeaderContent content="I want to create a store account" />
          </View>

          <View style={[styles.checkContainer, styles.unitContainer]}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            />
            <HeaderContent content="I agree with this " />
            <TouchableOpacity onPress={() => navigation.navigate('Policy')}>
              <Text style={styles.policyStyles}>Privacy Policies</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerBot}>
            <View style={styles.button}>
              <CustomButton
                type="primary"
                text="Sign up now"
                onPress={() => {
                  const errorMessage = isValidForm(fullName, email, password, confirmPassword, toggleCheckBox);
                  if (errorMessage) {
                    Alert.alert('Error', errorMessage);
                  } else {
                    handleRegister();
                  }
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
    marginBottom: 10,
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