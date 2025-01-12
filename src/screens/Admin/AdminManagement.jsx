import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { IC_AccountManagement, IC_ChatWithStore, IC_logout } from '../../../assets/Admin/icons';
import CUSTOM_COLOR from '../../constants/color';

const toolsData = [
  {
    title: 'Basic Function',
    items: [
      {name: 'ChatWithStore', icon: IC_ChatWithStore, screen: 'Chat'},
      {name: 'AdminManament', icon: IC_AccountManagement, screen: 'ManageUser'},
    ],
  },
];

const AdminManagement = ({navigation}) => {
  return (
  <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Management</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {toolsData.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.itemsContainer}>
              {section.items.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.item}
                  onPress={() => navigation.navigate(item.screen)} // Điều hướng
                >
                  <Image source={item.icon} style={styles.icon} />
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
});

export default AdminManagement;