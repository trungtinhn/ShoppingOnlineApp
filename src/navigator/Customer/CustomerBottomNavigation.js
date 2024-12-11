import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CUSTOM_COLOR from '../../constants/color';
import CustomerNavigation from './HomeStack';
import NotificationScreen from '../../screens/Customer/NotificationScreen';
import AccountScreen from '../../screens/Customer/AccountScreen';
import FollowScreen from '../../screens/Customer/FollowScreen';
import HeartIcon from '../../../assets/Customer/svgs/Heart.svg';
import HomeIcon from '../../../assets/Customer/svgs/house.svg';
import BellIcon from '../../../assets/Customer/svgs/bell-ringing.svg';
import AccountIcon from '../../../assets/Customer/svgs/user.svg';
import HomeNavigation from './HomeStack';
import NotificationNavigation from './NotificationStack';
import LoveNavigation from './LoveStack';
import AccountNavigation from './AccountStack';
import {
  BellFillIcon,
  HeartFillIcon,
  HomeFillIcon,
  UserFillIcon,
} from '../../../assets/Customer/svgs';
import {OrderProvider} from '../../context/OrderContext';
import {StripeProvider} from '@stripe/stripe-react-native';
const TabBottom = createBottomTabNavigator();

function CustomerBottomTab() {
  return (
    <StripeProvider
      publishableKey="pk_test_51PPShQAeyMMyXyX6hJzFCoORKaJxa3DOO82rBHEogafgCF7pyIjzfS7AmiMeigkPdpdZDMc9rvvpTRmes35iEuVK00quslxsWi"
      urlScheme="your-url-scheme"
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}"
    >
      <OrderProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <NavigationContainer>
            <TabBottom.Navigator
              screenOptions={{
                tabBarStyle: {
                  position: 'absolute',
                  bottom: 0,
                },

                tabBarShowLabel: false,

                headerShown: false,
              }}>
              <TabBottom.Screen
                name="HomeNavigation"
                component={HomeNavigation}
                options={({route}) => ({
                  tabBarLabel: 'Home',
                  tabBarStyle: {display: getTabBarVisibility(route)},
                  tabBarIcon: ({focused}) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {focused ? (
                          <HomeFillIcon fill={CUSTOM_COLOR.FlushOrange} />
                        ) : (
                          <HomeIcon fill={CUSTOM_COLOR.Black} />
                        )}
                      </View>
                    );
                  },
                })}
              />

              <TabBottom.Screen
                name="NotificationNavigation"
                component={NotificationNavigation}
                options={({route}) => ({
                  tabBarLabel: 'Notification',
                  tabBarStyle: {display: getTabBarVisibility(route)},
                  tabBarIcon: ({focused}) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {focused ? (
                          <BellFillIcon fill={CUSTOM_COLOR.FlushOrange} />
                        ) : (
                          <BellIcon fill={CUSTOM_COLOR.Black} />
                        )}
                      </View>
                    );
                  },
                })}
              />

              <TabBottom.Screen
                name="FollowNavigation"
                component={LoveNavigation}
                options={({route}) => ({
                  tabBarLabel: 'Follow',
                  tabBarStyle: {display: getTabBarVisibility(route)},
                  tabBarIcon: ({focused}) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {focused ? (
                          <HeartFillIcon fill={CUSTOM_COLOR.FlushOrange} />
                        ) : (
                          <HeartIcon fill={CUSTOM_COLOR.Black} />
                        )}
                      </View>
                    );
                  },
                })}
              />

              <TabBottom.Screen
                name="AccountNavigation"
                component={AccountNavigation}
                options={({route}) => ({
                  tabBarLabel: 'Account',
                  tabBarStyle: {display: getTabBarVisibility(route)},
                  tabBarIcon: ({focused}) => {
                    return (
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        {focused ? (
                          <UserFillIcon fill={CUSTOM_COLOR.FlushOrange} />
                        ) : (
                          <AccountIcon fill={CUSTOM_COLOR.Black} />
                        )}
                      </View>
                    );
                  },
                })}
              />
            </TabBottom.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </OrderProvider>
    </StripeProvider>
  );
}

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  if (
    routeName == 'CustomerHomeScreen' ||
    routeName == 'NotificationScreen' ||
    routeName == 'FollowScreen' ||
    routeName == 'AccountScreen' ||
    routeName == 'Feed'
  ) {
    return 'flex';
  }
  return 'none';
};

export default CustomerBottomTab;
