import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';


import HeaderWithBack from '../../components/Login_SignUp/HeaderWithBack.js';
import HeaderTitlle from '../../components/Login_SignUp/HeaderTitlle.js';
import TextInputCard from '../../components/Login_SignUp/TextInputCard.js';
import CustomButton from '../../components/Login_SignUp/CustomButton.js';
import CUSTOM_COLOR from '../../constants/color.js';
import FONT_FAMILY from '../../constants/font.js';
import { IC_Selected } from '../../../assets/Admin/icons/index.js';

const AddAccount = props => {
  const {navigation} = props;
  const [status, setStatus] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birth, setBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setuserType] = useState('staff');
  const [avatar, setAvatar] = useState(
    'https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fusers%2FuserCustomer.png?alt=media&token=16225e3a-c284-4a14-bdc6-710ae891f34b',
  );
  const [address, setAddress] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  const isValidName = fullName => {
    if (fullName === '') {
      return false;
    }
    return true;
  };

  const isValidEmail = email => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  const [errorMessage, setErrorMessage] = useState('');

  const isValidForm = (fullName, email) => {
    let isValid = true;

    if (fullName === '' && email === '') {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Please enter your information then click sign up');
    } else if (fullName === '') {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Please enter your full name');
    } else if (email === '') {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Please enter your email');
    } else if (!isValidEmail(email)) {
      isValid = false;
      setShowDialog(true);
      setErrorMessage('Your email is not valid');
    }

    setShowDialog(false);
    return isValid;
  };

  const handleUserTypeSelection = value => {
    setuserType(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack onPress={() => navigation.goBack()} />
      <View style={{width: '100%', height: '2%'}} />
      <View style={[styles.topContainer, styles.unitContainer]}>
        <HeaderTitlle title="Add new account" />
      </View>
      <View style={{width: '100%', height: '2%'}} />
      <View style={styles.bodyContainer}>
        <View style={styles.textInputContainer}>
          <TextInputCard
            title="Full name*"
            txtInput="Nguyen Van A"
            onChangeText={fullName => setFullName(fullName)}
          />
        </View>

        <View style={styles.textInputContainer}>
          <TextInputCard
            title="Email*"
            txtInput="abc@gmail.com"
            onChangeText={email => setEmail(email)}
            keyboardType="email-address"
          />
        </View>

        <View
          style={{
            width: '100%',
            height: 210,
            flexDirection: 'column',
          }}>
          <View style={[styles.unitUserTypeContainer, {flex: 1}]}>
            <Text style={styles.titleStyle}>UserType*</Text>
          </View>
          <View style={[styles.unitUserTypeContainer, {flex: 3}]}>
            <TouchableOpacity onPress={() => handleUserTypeSelection('admin')}>
              <View
                style={
                  userType === 'admin' ? styles.selectedOption : styles.option
                }>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text>Admin</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Image
                    style={
                      userType === 'admin'
                        ? {width: 20, height: 20}
                        : {width: 0, height: 0}
                    }
                    source={IC_Selected}
                    resizeMode="cover"
                  />
                </View>
                <View style={{width: 20, height: '100%'}} />
              </View>
            </TouchableOpacity>
            <View style={{width: '100%', height: 10}} />
            <TouchableOpacity onPress={() => handleUserTypeSelection('staff')}>
              <View
                style={
                  userType === 'staff' ? styles.selectedOption : styles.option
                }>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text>Staff</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Image
                    style={
                      userType === 'staff'
                        ? {width: 20, height: 20}
                        : {width: 0, height: 0}
                    }
                    source={IC_Selected}
                    resizeMode="cover"
                  />
                </View>
                <View style={{width: 20, height: '100%'}} />
              </View>
            </TouchableOpacity>
            <View style={{width: '100%', height: 10}} />
            <TouchableOpacity
              onPress={() => handleUserTypeSelection('customer')}>
              <View
                style={
                  userType === 'customer'
                    ? styles.selectedOption
                    : styles.option
                }>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text>Customer</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Image
                    style={
                      userType === 'customer'
                        ? {width: 20, height: 20}
                        : {width: 0, height: 0}
                    }
                    source={IC_Selected}
                    resizeMode="cover"
                  />
                </View>
                <View style={{width: 20, height: '100%'}} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{width: '100%', height: '2%'}} />

      <View style={styles.containerBot}>
        <View style={styles.button}>
          <CustomButton
            type="primary"
            text="Add new account"
            onPress={() => {
              if (isValidForm(fullName, email)) {
                navigation.goBack();
              } else {
                Alert.alert('Error', errorMessage);
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
    height: 90,
  },
  option: {
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.LightGray,
    width: '100%',
    height: 50,
    borderRadius: 25,
    paddingLeft: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  selectedOption: {
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.LightBlue,
    width: '100%',
    height: 50,
    borderRadius: 25,
    paddingLeft: 15,
    justifyContent: 'center',
    backgroundColor: CUSTOM_COLOR.LightGray,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
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
    width: '80%',
    height: 400,
    marginHorizontal: '10%',
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
    width: '80%',
    height: 65,
    marginHorizontal: '10%',
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
  unitUserTypeContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  titleStyle: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 20,
    color: CUSTOM_COLOR.Black,
    left: '5%',
  },
});
export default AddAccount;
