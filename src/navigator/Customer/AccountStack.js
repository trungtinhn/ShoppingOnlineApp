import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../../screens/Customer/AccountScreen";
import CustomerOrder from "../../screens/Customer/CustomerOrder";
import ChangeProfile from "../../screens/Admin/ChangeProfile";
import ResetPasswordScreen from "../../screens/Login_SignUp/ResetPasswordScreen";

const AccountStack = createNativeStackNavigator();

const AccountNavigation = () => {
    return (
        <AccountStack.Navigator screenOptions={{headerShown: false}}>
            <AccountStack.Screen name="AccountScreen" component={AccountScreen} />
            <AccountStack.Screen name="MyOrder" component={CustomerOrder}/>
            <AccountStack.Screen name="ChangeProfile" component={ChangeProfile}/>
            <AccountStack.Screen name ="ChangePassword" component={ResetPasswordScreen}/>
        </AccountStack.Navigator>
    );
};

export default AccountNavigation