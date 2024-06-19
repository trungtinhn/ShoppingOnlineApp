import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FollowScreen from "../../screens/Customer/FollowScreen";
import ShoppingCard from "../../screens/Customer/ShoppingCard";
import ProductDetail from "../../screens/Customer/Productdetail";
import ChatScreen from "../../screens/Customer/ChatSreen";
import CheckoutScreen from "../../screens/Customer/CheckOutScreen";
import PaymentMethodScreen from "../../screens/Customer/PaymentMethodScreen";

const LoveStack = createNativeStackNavigator();

const LoveNavigation = () => {
    return (
        <LoveStack.Navigator screenOptions={{headerShown: false}}>
            <LoveStack.Screen name="FollowScreen" component={FollowScreen} />
            <LoveStack.Screen name="ShoppingCard" component={ShoppingCard}/>
            <LoveStack.Screen name="Chat" component={ChatScreen} />
            <LoveStack.Screen name="ProductDetail" component={ProductDetail} />
            <LoveStack.Screen name="Checkout" component={CheckoutScreen}/>
            <LoveStack.Screen name="PaymentMethod" component={PaymentMethodScreen}/>
        </LoveStack.Navigator>
    );
}
export default LoveNavigation