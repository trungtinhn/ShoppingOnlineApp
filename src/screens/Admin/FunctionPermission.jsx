import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, Button, Alert } from 'react-native';
import { ref, onValue, set } from 'firebase/database';
import { database } from '../../../firebase/firebase'; // Adjust the import based on your file structure
import CUSTOM_COLOR from '../../constants/color';

const FunctionPermission = ({ navigation }) => {
  const [permissions, setPermissions] = useState({
    category: false,
    promotion: false,
    product: false,
    order: false,
    user: false,
  });

  // Fetch permissions from Firebase
  const fetchPermissions = async () => {
    try {
      const permissionsRef = ref(database, 'Permission');
      onValue(permissionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setPermissions(data);
        } else {
          Alert.alert('Error', 'No permissions data found');
        }
      });
    } catch (error) {
      Alert.alert('Error', 'Could not fetch permissions');
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  // Handle save button press
  const handleSave = async () => {
    try {
      const permissionsRef = ref(database, 'Permission');
      await set(permissionsRef, permissions);
      Alert.alert('Success', 'Permissions updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Could not update permissions');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Quản lý Quyền Hạn</Text>
      </View>
      <View style={styles.contentContainer}>
        {Object.keys(permissions).map((key) => (
          <View style={styles.switchContainer} key={key}>
            <Text style={styles.switchLabel}>{`Quản lý ${key.charAt(0).toUpperCase() + key.slice(1)}`}</Text>
            <Switch
              value={permissions[key]}
              onValueChange={(value) => setPermissions({ ...permissions, [key]: value })}
              trackColor={{ false: CUSTOM_COLOR.Gray, true: CUSTOM_COLOR.FlushOrange }}
              thumbColor={permissions[key] ? CUSTOM_COLOR.White : CUSTOM_COLOR.LightGray}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        ))}
      </View>
      <Button title="Lưu Thay Đổi" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
  },
  switchLabel: {
    fontSize: 16,
  },
});

export default FunctionPermission;
