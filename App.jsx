import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {firebase} from './firebase/firebase';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigator/Login_SignUp/navigation';
import CustomerNavigation from './src/navigator/Customer/HomeStack';
import CustomerBottomTab from './src/navigator/Customer/CustomerBottomNavigation';
import AdminNavigation from './src/navigator/Admin/navigation';
import CustomButton from './src/components/Login_SignUp/CustomButton';
import {getCurrentUserData} from './src/api/UserApi';
import {getRoleById} from './src/api/RoleApi';
import StaffNavigation from './src/navigator/Staff/navigation';
import CUSTOM_COLOR from './src/constants/color';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import StoreNavigation from './src/navigator/Store/bottomTabNavigation';

function App() {
  const [roleName, setRoleName] = useState(''); // Đổi từ userType thành roleName
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Thêm loading state

  const getUserRoleInfo = async uid => {
    try {
      setIsLoading(true);
      
      // Lấy thông tin user (bao gồm userType là role ID)
      const userRes = await getCurrentUserData({userId: uid});
      console.log(uid)
      if (userRes.status === 200) {
        const roleId = userRes.data.userType; // userType giờ chứa role ID
        console.log('Role ID:', roleId);
        
        // Lấy thông tin role dựa trên role ID
        const roleRes = await getRoleById(roleId);
        console.log('Role info:', roleRes);
        
        if (roleRes.status === 200) {
          const roleNameFromAPI = roleRes.data.name; // Lấy tên role từ API
          setRoleName(roleNameFromAPI);
          console.log('Role name:', roleNameFromAPI);
        } else {
          console.log('Error getting role info:', roleRes);
          setRoleName(''); // Reset nếu không lấy được role
        }
      } else {
        console.log('Error getting user info:', userRes);
        setRoleName(''); // Reset nếu không lấy được user
      }
    } catch (error) {
      console.log('Error getting user role info:', error.message);
      setRoleName(''); // Reset nếu có lỗi
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('User is signed in:', user.uid);
        setUser(user);
        getUserRoleInfo(user.uid);
      } else {
        console.log('User is not signed in');
        setRoleName('');
        setUser(null);
        setIsLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Hiển thị màn hình đăng nhập nếu user chưa đăng nhập
  if (user === null) {
    return <MainNavigation />;
  }

  // Hiển thị loading trong khi đang lấy thông tin role
  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={CUSTOM_COLOR.Gray} />
        <Text style={{marginTop: 10, color: CUSTOM_COLOR.Gray}}>
          Đang tải thông tin người dùng...
        </Text>
      </View>
    );
  }

  // Điều hướng dựa trên tên role
  switch (roleName) {
    case 'customer':
      return <CustomerBottomTab />;
    case 'admin_app':
      return <AdminNavigation />;
    case 'admin_staff':
      return <StaffNavigation />;
    case 'admin_shop':
      return <StoreNavigation />;
    default:
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={CUSTOM_COLOR.Gray} />
          <Text style={{marginTop: 10, color: CUSTOM_COLOR.Gray}}>
            Đang xác thực quyền truy cập...
          </Text>
        </View>
      );
  }
}

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};