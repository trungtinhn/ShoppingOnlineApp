import React from "react";
import { StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from "react-native";
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CUSTOM_COLOR from "../../constants/color";
import CustomerNavigation from "./HomeNavigation";
import NotificationScreen from "../../screens/Customer/NotificationScreen";
import AccountScreen from "../../screens/Customer/AccountScreen";
import FollowScreen from "../../screens/Customer/FollowScreen";
import HeartIcon from '../../../assets/Customer/svgs/Heart.svg'
import HomeIcon from '../../../assets/Customer/svgs/house.svg'
import BellIcon from '../../../assets/Customer/svgs/bell-ringing.svg'
import AccountIcon from '../../../assets/Customer/svgs/user.svg'
const TabBottom = createBottomTabNavigator()


function CustomerBottomTab() {

    return (
        <NavigationContainer>
            <TabBottom.Navigator

                screenOptions={
                    {
                        tabBarStyle: {
                            position: 'absolute',
                            bottom: 0,
                        },

                        tabBarShowLabel: false,

                        headerShown: false,


                    }

                }



            >
                <TabBottom.Screen name='CustomerNavigation' component={CustomerNavigation} options={({ route }) => ({

                    tabBarLabel: 'Home',
                    tabBarStyle: { display: getTabBarVisibility(route) },
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <HomeIcon fill={focused ? CUSTOM_COLOR.FlushOrange : CUSTOM_COLOR.Black}/>

                            </View>
                        )


                    }

                })} />

                <TabBottom.Screen name='Notification' component={NotificationScreen} options={{
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <BellIcon fill={focused ? CUSTOM_COLOR.FlushOrange : CUSTOM_COLOR.Black}></BellIcon>

                            </View>
                        )


                    }
                }}

                />

                <TabBottom.Screen name = 'FollowScreen' component={FollowScreen} 
                            options = {{
                                tabBarLabel: 'Follow',
                                tabBarIcon: ({focused}) =>{
                                    return( 
                                        <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                                            <HeartIcon fill={focused ? CUSTOM_COLOR.FlushOrange : CUSTOM_COLOR.Black}/>
                                        </View>
                                )
                                
                                    
                                }
                            }}
                    />

                <TabBottom.Screen name = 'AccountScreen' component={AccountScreen} 
                options = {{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({focused}) =>{
                        return( 
                            <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                                <AccountIcon fill={focused ? CUSTOM_COLOR.FlushOrange : CUSTOM_COLOR.Black}/>
                            </View>
                    )           
                    }
                }}
            />

            </TabBottom.Navigator>
        </NavigationContainer>

    )
}


const getTabBarVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed'

    if (routeName == 'CustomerHomeScreen' || routeName == 'Feed') {
        return 'flex'
    }
    return 'none'
}

export default CustomerBottomTab