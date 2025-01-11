import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { IC_Catgory, IC_Chat } from '../../../assets/Admin/icons';

const toolsData = [
  {
    title: 'Basic Function',
    items: [
      {name: 'ChatWithStore', icon: IC_Chat, screen: 'Chat'},
      {name: 'AdminManament', icon: IC_Catgory, screen: 'ManageUser'},
    ],
  }
];

const AdminManagement = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 16,
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
    justifyContent: '',
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