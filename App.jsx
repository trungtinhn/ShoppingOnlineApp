import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from './firebase/firebase';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigator/Login_SignUp/navigation';
import CustomerNavigation from './src/navigator/Customer/HomeStack';
import CustomerBottomTab from './src/navigator/Customer/CustomerBottomNavigation';
import AdminNavigation from './src/navigator/Admin/navigation';
import CustomButton from './src/components/Login_SignUp/CustomButton';
import {getUserType} from './src/api/UserApi';
import StaffNavigation from './src/navigator/Staff/navigation';
import CUSTOM_COLOR from './src/constants/color';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StoreNavigation from './src/navigator/Store/bottomTabNavigation';

function App() {
  const [userType, setUserType] = useState('');
  const [user, setUser] = useState(null);

  const getPropertyValue = async uid => {
    try {
      const res = await getUserType({userId: uid});
      console.log(uid);

      if (res.status == 200) {
        setUserType(res.data.userType);
        console.log('Loai nguoi dung' + res.data);
      } else console.log(res);
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
        setUserType('');
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
  } else if (userType === 'staff') {
    return <StaffNavigation />;
  } else if (userType === 'storeOwner') {
    return <StoreNavigation />;
  }

  // Default case to avoid returning null
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={CUSTOM_COLOR.Gray} />
    </View>
  );
}

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <App />
    </GestureHandlerRootView>
  );
};
