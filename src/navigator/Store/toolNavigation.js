import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddNewCategory from '../../screens/Admin/AddNewCategory';
import AddProduct from '../../screens/Admin/AddProduct';
import AddPromotion from '../../screens/Admin/AddPromotion';
import DetailCategory from '../../screens/Admin/DetailsCategory';
import EditProduct from '../../screens/Admin/EditProduct';
import EditPromotion from '../../screens/Admin/EditPromotion';
import ImportProduct from '../../screens/Admin/ImportProduct';
import Order from '../../screens/Admin/Order';
import ReviewScreen from '../../screens/Admin/ReView';
import EditCategory from '../../screens/Admin/EditCategory';
import DetailChatScreen from '../../screens/Admin/DetailChat';
import DeTailDelivery from '../../screens/Customer/DetailDelivery';
import FunctionPermission from '../../screens/Admin/FunctionPermission';
import ToolsScreen from '../../screens/Store/StoreToolScreen';
import ManageStaff from '../../screens/Admin/ManageStaff';
import StroreProduct from '../../screens/Store/StroreProduct';
import StoreCategory from '../../screens/Store/StoreCategory';
import StorePromotionManager from '../../screens/Store/StorePromotion';
import AddStaff from '../../screens/Admin/AddStaff';
const Stack = createNativeStackNavigator();

const ToolsNavitgation = () => {
  return (
    
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="StoreToolScreen">
      <Stack.Screen name="StoreToolScreen" component={ToolsScreen} />
      <Stack.Screen name="StoreProducts" component={StroreProduct} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="AddPromotion" component={AddPromotion} />
      <Stack.Screen name="ImportProduct" component={ImportProduct} />
      <Stack.Screen name="DeTailsDelivery" component={DeTailDelivery} />
      <Stack.Screen name="DetailChat" component={DetailChatScreen} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="OrderScreen" component={Order} />
      <Stack.Screen name="StorePromotion" component={StorePromotionManager} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="EditPromotion" component={EditPromotion} />
      <Stack.Screen name="Categories" component={StoreCategory} />
      <Stack.Screen name="DetailsCategory" component={DetailCategory} />
      <Stack.Screen name="AddNewCategory" component={AddNewCategory} />
      <Stack.Screen name="EditCategory" component={EditCategory} />
      <Stack.Screen name="FunctionPermission" component={FunctionPermission} />
      <Stack.Screen name="DeliveryDetail" component={DeTailDelivery} />
      <Stack.Screen name="ManageStaff" component={ManageStaff}/>
      <Stack.Screen name="AddStaff" component={AddStaff}/>
    </Stack.Navigator>
  );
};

export default ToolsNavitgation;
