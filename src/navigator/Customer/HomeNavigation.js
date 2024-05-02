import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/Customer/HomeScreen';
const Stack = createStackNavigator();
const CustomerNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Customer Home Screen'>
      <Stack.Screen
        name="Customer Home Screen"
        component={HomeScreen}
        options={{ headerShown: true }}
      />

    </Stack.Navigator>
  )
}

export default CustomerNavigation