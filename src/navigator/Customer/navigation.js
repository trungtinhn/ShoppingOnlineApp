import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const CustomerNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default CustomerNavigation