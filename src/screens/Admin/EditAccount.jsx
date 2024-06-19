import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import HeaderTitlle from '../../components/Login_SignUp/HeaderTitlle';
import HeaderWithBack from '../../components/Login_SignUp/HeaderWithBack';
import TextInputCard from '../../components/Login_SignUp/TextInputCard';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';


function EditAccount ({navigation, route}) {
  const [status, setStatus] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birth, setBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = route.params?.user;

  useEffect(() => {
    setFullName(user.TenND);
    setEmail(user.Email);
  }, []);

  const updateFullname = async (documentId, newData) => {
    try {


      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updateEmail = async (documentId, newData) => {
    try {
     
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleUpdateEmail = async (uid, newEmail) => {
    try {
     
      Alert.alert('Success', 'Email updated successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDeleteUser = async uid => {
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithBack onPress={() => navigation.goBack()} />
      <View style={[styles.topContainer, styles.unitContainer]}>
        <HeaderTitlle title="Account Information" />
      </View>
      <View style={{width: '100%', height: '1%'}} />
      <View style={[styles.bodyContainer, styles.unitContainer]}>
        <View style={{flex: 1}}>
          <TextInputCard
            title="User ID*"
            txtInput="Nguyen Van A"
            value={user.MaND}
            onChangeText={fullName => setFullName(fullName)}
          />
        </View>

        <View style={{flex: 1}}>
          <TextInputCard
            title="Full name*"
            txtInput="Nguyen Van A"
            value={user.TenND}
            onChangeText={fullName => setFullName(fullName)}
          />
        </View>

        <View style={{flex: 1}}>
          <TextInputCard
            title="Email*"
            txtInput="abc@gmail.com"
            onChangeText={email => setEmail(email)}
            keyboardType="email-address"
            value={user.Email}
          />
        </View>

        <View style={{flex: 1}}>
          <TextInputCard
            title="Phone number"
            txtInput="03333333333"
            value={user.Phone}
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          />
        </View>

        <View style={{flex: 1}}>
          <TextInputCard
            title="Day of birth"
            txtInput="dd/mm/yy"
            value={user.NgaySinh}
            onChangeText={birth => setBirth(birth)}
          />
        </View>

        <View style={{flex: 1}}>
          <TextInputCard
            title="User Type"
            value={user.LoaiND}
            onChangeText={birth => setBirth(birth)}
          />
        </View>
      </View>

      <View style={{width: '100%', height: '1%'}} />

      <View style={styles.containerBot}>
        <View style={styles.button}>
          <CustomButton
            type="primary"
            text="Delete account"
            onPress={() => {
              handleDeleteUser(user.MaND);
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
    top: 7,
    left: '3%',
  },
  bodyContainer: {
    height: 500,
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
    width: '80%',
    height: 55,
    marginHorizontal: '10%',
    // marginTop: 10,
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
});
export default EditAccount;
