import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import { useRoute } from '@react-navigation/native';

export default function FuctionPermisson({ navigation }) {
  const route = useRoute();
  const { item } = route.params;
  const user = item;

  const [permissions, setPermissions] = useState({
    category: user.PhanQuyen.includes('category'),
    order: user.PhanQuyen.includes('order'),
    promotion: user.PhanQuyen.includes('promotion'),
    product: user.PhanQuyen.includes('product'),
  });

  const handlePermissionChange = (permission) => {
    setPermissions((prevPermissions) => {
      const updatedPermissions = {
        ...prevPermissions,
        [permission]: !prevPermissions[permission],
      };
      user.PhanQuyen = Object.keys(updatedPermissions).filter((key) => updatedPermissions[key]);
      return updatedPermissions;
    });
  };

  const handleSave = () => {
    // Save the updated permissions to the database or backend here
    console.log('Updated Permissions:', user.PhanQuyen);
    Alert.alert('Success', 'Permissions updated successfully');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image source={{ uri: user.Avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{user.TenND}</Text>
      </View>
      <View style={styles.permissionsContainer}>
        <Text style={styles.permissionsTitle}>Assign Permissions</Text>
        <View style={styles.permissionItem}>
          <TouchableOpacity
            style={[
              styles.permissionButton,
              permissions.category ? styles.permissionButtonActive : styles.permissionButtonInactive,
            ]}
            onPress={() => handlePermissionChange('category')}
          >
            <Text style={styles.permissionText}>Category</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.permissionItem}>
          <TouchableOpacity
            style={[
              styles.permissionButton,
              permissions.order ? styles.permissionButtonActive : styles.permissionButtonInactive,
            ]}
            onPress={() => handlePermissionChange('order')}
          >
            <Text style={styles.permissionText}>Order</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.permissionItem}>
          <TouchableOpacity
            style={[
              styles.permissionButton,
              permissions.promotion ? styles.permissionButtonActive : styles.permissionButtonInactive,
            ]}
            onPress={() => handlePermissionChange('promotion')}
          >
            <Text style={styles.permissionText}>Promotion</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.permissionItem}>
          <TouchableOpacity
            style={[
              styles.permissionButton,
              permissions.product ? styles.permissionButtonActive : styles.permissionButtonInactive,
            ]}
            onPress={() => handlePermissionChange('product')}
          >
            <Text style={styles.permissionText}>Product</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: CUSTOM_COLOR.White,
    padding: 20,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.Bold,
    color: CUSTOM_COLOR.Black,
  },
  permissionsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  permissionsTitle: {
    fontSize: 18,
    fontFamily: FONT_FAMILY.Bold,
    color: CUSTOM_COLOR.Black,
    marginBottom: 10,
  },
  permissionItem: {
    marginBottom: 10,
  },
  permissionButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  permissionButtonActive: {
    backgroundColor: CUSTOM_COLOR.Green,
  },
  permissionButtonInactive: {
    backgroundColor: CUSTOM_COLOR.Gray,
  },
  permissionText: {
    fontSize: 25,
    color: CUSTOM_COLOR.White,
  },
  saveButton: {
    backgroundColor: CUSTOM_COLOR.Blue,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.Bold,
    color: CUSTOM_COLOR.White,
  },
});
