import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import IntroScreen from '../../screens/Login_SignUp/IntroScreen';
import WellcomeUser1 from '../../screens/Login_SignUp/WellcomeUser1';
import WellcomeUser2 from '../../screens/Login_SignUp/WellcomeUser2';
import WellcomeUser3 from '../../screens/Login_SignUp/WellcomeUser3';
import SignInScreen from '../../screens/Login_SignUp/SignInScreen';
import SignUpScreen from '../../screens/Login_SignUp/SignUpScreen';
import ForgetPasswordScreen from '../../screens/Login_SignUp/ForgetPasswordScreen';
import SmartOTPScreen from '../../screens/Login_SignUp/SmartOTPScreen';
import ResetPasswordScreen from '../../screens/Login_SignUp/ResetPasswordScreen';
import CongratulationScreen from '../../screens/Login_SignUp/CongratulationScreen';
import SmartOTPEmailScreen from '../../screens/Login_SignUp/SmartOTPEmail';
import DoneScreen from '../../screens/Login_SignUp/DoneScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName='Intro'>
          <Stack.Screen name='Intro' component={IntroScreen} />
          <Stack.Screen name='WellcomeUser1' component={WellcomeUser1}/>
          <Stack.Screen name='WellcomeUser2' component={WellcomeUser2}/>
          <Stack.Screen name='WellcomeUser3' component={WellcomeUser3}/>
          <Stack.Screen name='SignIn' component={SignInScreen}/>
          <Stack.Screen name='SignUp' component={SignUpScreen}/>
          <Stack.Screen name='ForgotPassword' component={ForgetPasswordScreen}/>
          <Stack.Screen name='SmartOTP' component={SmartOTPScreen}/>
          <Stack.Screen name='SmartOTPEmail' component={SmartOTPEmailScreen}/>
          <Stack.Screen name='Congratulation' component={CongratulationScreen}/>
          <Stack.Screen name='ResetPassword' component={ResetPasswordScreen}/>
          <Stack.Screen name='Done' component={DoneScreen}/>
        </Stack.Navigator>
       
    </NavigationContainer>
  )
}

export default MainNavigation