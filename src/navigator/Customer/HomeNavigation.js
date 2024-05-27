import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/Customer/HomeScreen';
import ProductDetail from '../../screens/Customer/Productdetail';
import ShoppingCard from '../../screens/Customer/ShoppingCard';
import ChatScreen from '../../screens/Customer/ChatSreen';
import PromotionScreen from '../../screens/Customer/PromotionScreen';
import DetailCategoryScreen from '../../screens/Customer/DetailCategoryScreen';
import CheckoutScreen from '../../screens/Customer/CheckOutScreen';
import DeliveryScreen from '../../screens/Customer/DeliveryScreen';
import DeliveryAddressScreen from '../../screens/Customer/DeliveryAddressScreen';
import PaymentMethodScreen from '../../screens/Customer/PaymentMethodScreen';
import CustomerOrder from '../../screens/Customer/CustomerOrder';
import ChangeProfile from '../../screens/Admin/ChangeProfile';
const Stack = createStackNavigator();

const CustomerNavigation = () => {
  return (
    <Stack.Navigator 
      initialRouteName='CustomerHomeScreen' 
      screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="ProductDetail" component={ProductDetail}/>
      <Stack.Screen name="ShoppingCard" component={ShoppingCard}/>
      <Stack.Screen name="CustomerHomeScreen" component={HomeScreen}/>
      <Stack.Screen name="ChatScreen" component={ChatScreen}/>
      <Stack.Screen name="Promotion" component={PromotionScreen}/>
      <Stack.Screen name="DetailCategory" component={DetailCategoryScreen}/>
      <Stack.Screen name="Checkout" component={CheckoutScreen}/>
      <Stack.Screen name="Delivery" component={DeliveryScreen}/>
      <Stack.Screen name="DeliveryAddress" component={DeliveryAddressScreen}/>
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen}/>
      <Stack.Screen name="MyOrder" component={CustomerOrder}/>
      <Stack.Screen name="ChangeProfile" component={ChangeProfile}/>
    </Stack.Navigator>
  )
}

export default CustomerNavigation