import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomerNavigation from './src/navigator/Customer/navigation'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './src/navigator/Login_SignUp/navigation'

export default function App() {
  return (
    <MainNavigation></MainNavigation>
  )
}
const styles = StyleSheet.create({})