import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import OverViewScreen from '../../screens/Admin/OverViewScreen';
import ViewShopScreen from '../../screens/Admin/ViewShopScreen';
import ViewShopProduct from '../../screens/Admin/ViewShopProduc';
import ViewDetailsinList from '../../screens/Admin/ViewDetailsinList';

const Stack = createNativeStackNavigator();

const AdminNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{headerShown: false}}
          initialRouteName='OverView'>
            <Stack.Screen name='OverView' component={OverViewScreen}/>
            <Stack.Screen name='ViewShopScreen' component={ViewShopScreen}/>
            <Stack.Screen name='ViewShopProduct' component={ViewShopProduct}/>
            <Stack.Screen name='ViewDetailsinList' component={ViewDetailsinList}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AdminNavigation