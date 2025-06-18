import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { IC_AccountManagement, IC_ChatWithStore, IC_GlobalCategory, IC_GlobalPromotion, IC_Rank } from '../../../assets/Admin/icons';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import { firebase } from '../../../firebase/firebase';

const toolsData = [
  {
    title: 'Basic Function',
    items: [
      {name: 'ChatWithStore', icon: IC_ChatWithStore, screen: 'ChatWithStore'},
      {name: 'AdminManament', icon: IC_AccountManagement, screen: 'ManageUser'},
      {name: 'Global Promotion', icon: IC_GlobalPromotion, screen: 'GlobalPromotion'},
      {name: 'Global Category', icon: IC_GlobalCategory, screen: 'GlobalCategory'},
      {name: 'Rank Management', icon: IC_Rank, screen: 'RankManagement'},
    ],
  },
];

const AdminManagement = ({navigation}) => {
  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };
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
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
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
  logoutButton: {
    backgroundColor: CUSTOM_COLOR.Red,
    padding: 15,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONT_FAMILY.Bold,
  },
});

export default AdminManagement;