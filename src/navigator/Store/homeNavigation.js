import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InforStoreScreen from '../../screens/Store/InforStoreScreen';
import StoreHomeScreen from '../../screens/Store/StoreHomeScreen';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="StoreHomeScreen">
      <Stack.Screen name="InfoStore" component={InforStoreScreen} />
      <Stack.Screen name="StoreHomeScreen" component={StoreHomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
