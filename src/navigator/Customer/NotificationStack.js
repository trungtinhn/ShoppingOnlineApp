import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationScreen from "../../screens/Customer/NotificationScreen";
import ShoppingCard from "../../screens/Customer/ShoppingCard";
import ChatScreen from "../../screens/Customer/ChatSreen";

const NotificationStack = createNativeStackNavigator();

const NotificationNavigation = () => {
    return (
        <NotificationStack.Navigator screenOptions={{headerShown: false}}>
            <NotificationStack.Screen name="NotificationScreen" component={NotificationScreen}/>
            <NotificationStack.Screen name="ShoppingCard" component={ShoppingCard}/>
            <NotificationStack.Screen name="ChatScreen" component={ChatScreen}/>
        </NotificationStack.Navigator>
    );
};
export default NotificationNavigation
