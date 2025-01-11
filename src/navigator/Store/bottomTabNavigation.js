import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StoreHomeScreen from '../../screens/Store/StoreHomeScreen';
import {Icon} from 'react-native-elements';
import ToolsNavitgation from './toolNavigation';
import StoreProfileScreen from '../../screens/Store/StoreProfileScreen';
import MessagingScreen from '../../screens/Store/MessagingScreen';

const Tab = createBottomTabNavigator();

const StoreNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          // Thêm icon vào mỗi tab
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-filled';
            } else if (route.name === 'Tools') {
              iconName = focused ? 'task' : 'task';
            } else if (route.name === 'Messages') {
              iconName = focused ? 'chat-bubble' : 'chat-bubble-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // Trả về icon
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007bff', 
          tabBarInactiveTintColor: '#666', 
          tabBarStyle: {
            backgroundColor: '#f8f8f8',
          },
          headerShown: true,
        })}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={StoreHomeScreen} />
        <Tab.Screen name="Tools" component={ToolsNavitgation} />
        <Tab.Screen name="Messages" component={MessagingScreen} />
        <Tab.Screen name="Profile" component={StoreProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default StoreNavigation;
