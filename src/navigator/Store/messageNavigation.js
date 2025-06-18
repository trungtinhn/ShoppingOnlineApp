import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MessagingScreen from '../../screens/Store/MessagingScreen';
import ChatManagement from '../../screens/Store/ChatManagement';
const Stack = createNativeStackNavigator();

const MesageNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ChatManagement">
        <Stack.Screen name="ChatManagement" component={ChatManagement}/>
        <Stack.Screen name="DetailMessage" component={MessagingScreen}/>
    </Stack.Navigator>
  );
};

export default MesageNavigation;
