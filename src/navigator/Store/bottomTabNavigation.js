import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'react-native-elements';
import ToolsNavitgation from './toolNavigation';
import StoreProfileScreen from '../../screens/Store/StoreProfileScreen';
import MessageNavigation from './messageNavigation';
import HomeNavigation from './homeNavigation';
import Svg, { Path } from 'react-native-svg';

const Tab = createBottomTabNavigator();

const StoreNavigation = () => {
  return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          // Thêm icon vào mỗi tab
          tabBarIcon: ({focused, color, size}) => {
            let iconPath;

            if (route.name === 'Home') {
              iconPath = focused
                ? 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' // Example SVG Path for focused Home
                : 'M12 3L2 12h3v8h14v-8h3L12 3z'; // Example SVG Path for un-focused Home
            } else if (route.name === 'Tools') {
              iconPath = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
            } else if (route.name === 'Messages') {
              iconPath = focused
                ? 'M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm-1-15h2v6h-2zm0 8h2v2h-2z'
                : 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10zM10 7h4v6h-4zm0 8h4v2h-4z';
            } else if (route.name === 'Profile') {
              iconPath = focused
                ? 'M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z'
                : 'M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z';
            }
          
            return(
              <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                <Path d={iconPath} />
              </Svg>)
          },
          tabBarActiveTintColor: '#007bff', 
          tabBarInactiveTintColor: '#666', 
          tabBarStyle: {
            backgroundColor: '#f8f8f8',
          },
          tabBarShowLabel: false,
          headerShown: false,
        })}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={HomeNavigation} />
        <Tab.Screen name="Tools" component={ToolsNavitgation} />
        <Tab.Screen name="Messages" component={MessageNavigation} />
        <Tab.Screen name="Profile" component={StoreProfileScreen} />
      </Tab.Navigator>
  );
};

export default StoreNavigation;
