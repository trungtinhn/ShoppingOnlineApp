import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/Customer/HomeScreen';
import ProductDeatail from '../../screens/Customer/Productdetail';
import ShoppingCard from '../../screens/Customer/ShoppingCard';
const Stack = createStackNavigator();

const CustomerNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Customer Home Screen'>
      <Stack.Screen name="Product Detail" component={ProductDeatail}/>
      <Stack.Screen name="Shopping Card" component={ShoppingCard}/>
      <Stack.Screen name="Customer Home Screen" component={HomeScreen}/>
    </Stack.Navigator>
  )
}

export default CustomerNavigation