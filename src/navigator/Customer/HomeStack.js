import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingCard from '../../screens/Customer/ShoppingCard';
import ChatScreen from '../../screens/Customer/ChatSreen';
import HomeScreen from '../../screens/Customer/HomeScreen';
import DetailCategoryScreen from '../../screens/Customer/DetailCategoryScreen';
import ProductDetail from '../../screens/Customer/Productdetail';
const HomeStack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}} initialRouteName='CustomerHomeScreen'>
      <HomeStack.Screen name='CustomerHomeScreen' component={HomeScreen} />
      <HomeStack.Screen name='ShoppingCard' component={ShoppingCard}/>
      <HomeStack.Screen name='ChatScreen' component={ChatScreen}/>
      <HomeStack.Screen name='DetailCategory' component={DetailCategoryScreen}/>
      <HomeStack.Screen name="ProductDetail" component={ProductDetail}/>
    </HomeStack.Navigator>
  )
}

export default HomeNavigation