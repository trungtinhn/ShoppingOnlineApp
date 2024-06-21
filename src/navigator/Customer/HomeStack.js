import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingCard from '../../screens/Customer/ShoppingCard';
import ChatScreen from '../../screens/Customer/ChatSreen';
import HomeScreen from '../../screens/Customer/HomeScreen';
import DetailCategoryScreen from '../../screens/Customer/DetailCategoryScreen';
import ProductDetail from '../../screens/Customer/Productdetail';
import CheckoutScreen from '../../screens/Customer/CheckOutScreen';
import PaymentMethodScreen from '../../screens/Customer/PaymentMethodScreen';
import DeliveryAddressScreen from '../../screens/Customer/DeliveryAddressScreen';
import PromotionScreen from '../../screens/Customer/PromotionScreen';
import DeliveryScreen from '../../screens/Customer/DeliveryScreen';
import ThankScreen from '../../screens/Customer/ThankScreen';
import ReviewScreen from '../../screens/Customer/ReviewScreen';
import AllProductScreen from '../../screens/Customer/AllProductScreen';
const HomeStack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}} initialRouteName='CustomerHomeScreen'>
      <HomeStack.Screen name='CustomerHomeScreen' component={HomeScreen} />
      <HomeStack.Screen name='ShoppingCard' component={ShoppingCard}/>
      <HomeStack.Screen name='ChatScreen' component={ChatScreen}/>
      <HomeStack.Screen name='DetailCategory' component={DetailCategoryScreen}/>
      <HomeStack.Screen name="ProductDetail" component={ProductDetail}/>
      <HomeStack.Screen name="Checkout" component={CheckoutScreen}/>
      <HomeStack.Screen name="PaymentMethod" component={PaymentMethodScreen}/>
      <HomeStack.Screen name="Promotion" component={PromotionScreen}/>
      <HomeStack.Screen name="DeliveryAddress" component={DeliveryAddressScreen}/>
      <HomeStack.Screen name="Delivery" component={DeliveryScreen}/>
      <HomeStack.Screen name="Review" component={ReviewScreen}/>
      <HomeStack.Screen name="ThankScreen" component={ThankScreen}/>
      <HomeStack.Screen name="AllProduct" component={AllProductScreen}/>
    </HomeStack.Navigator>
  )
}

export default HomeNavigation