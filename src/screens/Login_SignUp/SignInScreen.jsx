import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { IMG_Rectangle182, IMG_Separator } from '../../../assets/Login_SignUp/images'
import TextInputCard from '../../components/Login_SignUp/TextInputCard'
import PasswordCard from '../../components/Login_SignUp/PasswordCard'
import CustomButton from '../../components/Login_SignUp/CustomButton'
import HeaderContent from '../../components/Login_SignUp/HeaderContent'
import HeaderWithBack from '../../components/Login_SignUp/HeaderWithBack'
import HeaderTitlle from '../../components/Login_SignUp/HeaderTitlle'
import FONT_FAMILY from '../../constants/font'
import CUSTOM_COLOR from '../../constants/color'
import LogoButton from '../../components/Login_SignUp/LogoButton'
import Size from '../../constants/size'
import {firebase} from '../../../firebase/firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
export default function SignInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().languageCode = 'it';
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    });
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // IdP data available in result.additionalUserInfo.profile.
        // ...
        console.log("success")
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(error)
      // ...
    });    
  }
  const handleLoginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'Người dùng đã hủy đăng nhập';
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Không thể lấy access token';
      }

      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      const userCredential = await firebase.auth().signInWithCredential(facebookCredential);
      const user = userCredential.user;
      console.log(user);
    } catch (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        const pendingCred = error.credential;
        const email = error.email;

        const methods = await firebase.auth().fetchSignInMethodsForEmail(email);

        if (methods.length) {
          Alert.alert(
            'Account Exists',
            `An account already exists with the email address ${email}. Please sign in using one of the following methods: ${methods.join(', ')}`
          );

          // Implement sign-in with one of the existing providers.
          // For example, if methods[0] === 'password', you need to ask the user to sign in with their password.
        }
      } else {
        console.error('Facebook Login Error:', error);
        Alert.alert('Login Error', error.message);
      }
    }
  };
  

  const loginUser = async (email, password) => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log('User signed in successfully!', response.user.uid);
    } catch (error) {
      console.log('Error signing in:', error.message);
      Alert.alert('Error', 'Account does not exist!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={{width: '100%', height: 10}}/>
        <HeaderWithBack onPress={() => navigation.goBack()} />
        <View style={{width: '100%', height: Size.DeviceHeight*0.05}} />
        <View style={[styles.unitContainer, {height: 50}]}>
          <HeaderTitlle title="Login" />
          <View style={{width: '100%', height: '5%'}}/>
          <HeaderContent content="Login to accsess your Namu account"/>
        </View>

        <View style={{width: '100%', height: Size.DeviceHeight*0.05}} />

        <View style={[styles.unitContainer, styles.bodyContainer]}>
          <View style={{width: '100%', height: 110}}>
            <TextInputCard
              title="Email*"
              txtInput="abc@gmail.com"
              onChangeText={email => setEmail(email)}
              keyboardType="email-address"
            />
          </View>

          <View style={{width: '100%', height: 110}}>
            <PasswordCard
              title="Password*"
              txtInput="********"
              onChangeText={password => setPassword(password)}
            />
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.contentStyle}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>

        <>
          <View style={{width: '80%', height: 65, marginHorizontal: '10%'}}>
            <View style={styles.buttonContainer}>
              <CustomButton
                type="primary"
                text="Login"
                onPress={() => {
                  loginUser(email, password)
                }}
              />
            </View>
          </View>
        </>
        <View style={[styles.unitContainer, styles.botContainer]}>
          <View
            style={{flex: 5, justifyContent: 'center', alignItems: 'flex-end'}}>
            <HeaderContent content="Don't you have an account ? " />
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.contentStyle}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.logoContainer]}>
            <LogoButton type='google' onPress={handleLoginWithGoogle}></LogoButton>
            <LogoButton type='facebook' onPress={handleLoginWithFacebook}></LogoButton>
            <LogoButton type='twitter' onPress={()=>{}}></LogoButton>
        </View>
      
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White
  },
  unitContainer: {
    width: '80%',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
  bodyContainer: {
    height: 270,
    flexDirection: 'column',
  },
  containerBot: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '200%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-50%',
  },
  botContainer: {
    height: '5%',
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  logoContainer:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    paddingHorizontal: '20%'
  },
  contentStyle: {
    fontFamily: FONT_FAMILY.Light,
    fontSize: 15,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
});