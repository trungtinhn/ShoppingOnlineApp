import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './src/navigator/Login_SignUp/navigation'

export default function App() {
  return (
    <MainNavigation></MainNavigation>
  )
}
const styles = StyleSheet.create({})