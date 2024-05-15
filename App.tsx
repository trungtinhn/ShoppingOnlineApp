import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './src/navigator/Login_SignUp/navigation'
import CustomerNavigation from './src/navigator/Customer/HomeNavigation'
import CustomerBottomTab from './src/navigator/Customer/CustomerBottomNavigation'

export default function App() {
  return (
    <CustomerBottomTab></CustomerBottomTab>
  )
}
const styles = StyleSheet.create({})