import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import OverViewScreen from '../../screens/Admin/OverViewScreen';
import ViewShopScreen from '../../screens/Admin/ViewShopScreen';
import ViewShopProduct from '../../screens/Admin/ViewShopProduc';
import ViewDetailsinList from '../../screens/Admin/ViewDetailsinList';
import AddAccount from '../../screens/Admin/AddAccount';
import Promotion from '../../screens/Admin/Promotion';
import AddNewCategory from '../../screens/Admin/AddNewCategory';
import AddProduct from '../../screens/Admin/AddProduct';
import AddPromotion from '../../screens/Admin/AddPromotion';
import ChangeProfile from '../../screens/Admin/ChangeProfile';
import ChatScreenStaff from '../../screens/Admin/ChatScreenStaff';
import DetailCategory from '../../screens/Admin/DetailsCategory';
import EditAccount from '../../screens/Admin/EditAccount';
import EditProduct from '../../screens/Admin/EditProduct';
import EditPromotion from '../../screens/Admin/EditPromotion';
import ImportProduct from '../../screens/Admin/ImportProduct';
import ManageUser from '../../screens/Admin/ManageUser';
import MyProduct from '../../screens/Admin/MyProduct';
import Order from '../../screens/Admin/Order';
import ReviewScreen from '../../screens/Admin/ReView';
import Setting from '../../screens/Admin/Setting';
import Chat from '../../screens/Admin/Chat';
import Categories from '../../screens/Admin/Categories';
import EditCategory from '../../screens/Admin/EditCategory';
import FunctionPermission from '../../screens/Admin/FunctionPermission';
import DetailChatScreen from '../../screens/Admin/DetailChat';
import DeliveryScreen from '../../screens/Customer/DeliveryScreen';
import DeTailDelivery from '../../screens/Customer/DetailDelivery';
import FunctionPermisson from '../../screens/Admin/FunctionPermission';
import ToolsScreen from '../../screens/Store/StoreToolScreen';
const Stack = createNativeStackNavigator();

const ToolsNavitgation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="StoreToolScreen">
      <Stack.Screen name="StoreToolScreen" component={ToolsScreen} />
      <Stack.Screen name="MyProduct" component={MyProduct} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="AddPromotion" component={AddPromotion} />
      <Stack.Screen name="ImportProduct" component={ImportProduct} />
      <Stack.Screen name="DeTailsDelivery" component={DeTailDelivery} />
      <Stack.Screen name="DetailChat" component={DetailChatScreen} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="OrderScreen" component={Order} />
      <Stack.Screen name="Promotion" component={Promotion} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="EditPromotion" component={EditPromotion} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="DetailsCategory" component={DetailCategory} />
      <Stack.Screen name="AddNewCategory" component={AddNewCategory} />
      <Stack.Screen name="EditCategory" component={EditCategory} />
      <Stack.Screen name="FunctionPermission" component={FunctionPermission} />
      <Stack.Screen name="DeliveryDetail" component={DeTailDelivery} />
    </Stack.Navigator>
  );
};

export default ToolsNavitgation;
