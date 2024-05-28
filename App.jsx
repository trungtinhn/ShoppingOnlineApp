import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import {firebase} from './firebase/firebase'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './src/navigator/Login_SignUp/navigation'
import CustomerNavigation from './src/navigator/Customer/HomeNavigation'
import CustomerBottomTab from './src/navigator/Customer/CustomerBottomNavigation'
import AdminNavigation from './src/navigator/Admin/navigation'
import CustomButton from './src/components/Login_SignUp/CustomButton'
import { getUserType } from './src/api/UserApi'
import StaffNavigation from './src/navigator/Staff/navigation'

function App() {
  const [userType, setUserType] = useState('');
  const [user, setUser] = useState(null);

  const getPropertyValue = async uid => {
    try {
      const res = await getUserType({MaND: uid});
      console.log(uid);

      if(res.status == 200){
        setUserType(res.data.LoaiND)
        console.log("Loai nguoi dung" + res.data)
      }
      else
        console.log(res)
    } catch (error) {
      console.log('Error getting property value:', error.message);
    }
  };


  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in:', user.uid);
        setUser(user);
        getPropertyValue(user.uid);
      } else {
        console.log('User is not signed in');
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (user === null) {
    return <MainNavigation />;
  }

  if (userType === 'customer') {
    return <CustomerBottomTab />;
  } else if (userType === 'admin') {
    return <AdminNavigation />;
  } else if(userType === 'staff'){
    return <StaffNavigation/>
  }

  // Default case to avoid returning null
  return null;
}

export default () => {
  return <App />;
};