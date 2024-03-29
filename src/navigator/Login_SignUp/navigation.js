import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Screen>
            
        </Stack.Screen>
    </NavigationContainer>
  )
}

export default MainNavigation