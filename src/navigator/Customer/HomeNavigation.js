import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/Customer/HomeScreen';
import ProductDeatail from '../../screens/Customer/Productdetail';
import ShoppingCard from '../../screens/Customer/ShoppingCard';
import ChatScreen from '../../screens/Customer/ChatSreen';
const Stack = createStackNavigator();

const CustomerNavigation = () => {
  return (
    <Stack.Navigator 
      initialRouteName='CustomerHomeScreen' 
      screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="ProductDetail" component={ProductDeatail}/>
      <Stack.Screen name="ShoppingCard" component={ShoppingCard}/>
      <Stack.Screen name="CustomerHomeScreen" component={HomeScreen}/>
      <Stack.Screen name="ChatScreen" component={ChatScreen}/>
    </Stack.Navigator>
  )
}

export default CustomerNavigation