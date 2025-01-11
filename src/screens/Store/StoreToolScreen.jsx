import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  add_product_IC,
  category_IC,
  income_IC,
  manages_review_IC,
  orders_IC,
  product_IC,
  return_order_IC,
  voucher_IC,
} from '../../../assets/Store/icons';

const toolsData = [
  {
    title: 'Basic Function',
    items: [
      {name: 'Products', icon: product_IC, screen: 'MyProduct'},
      {name: 'Orders', icon: orders_IC, screen: 'OrderScreen'},
      {name: 'Manage Reviews', icon: manages_review_IC, screen: 'ReviewScreen'},
      {name: 'Categories', icon: category_IC, screen: 'Categories'},
      {name: 'My Income', icon: income_IC, screen: 'IncomeScreen'},
    ],
  },
  {
    title: 'Marketing',
    items: [{name: 'Promotion', icon: voucher_IC, screen: 'Promotion'}],
  },
];

const ToolsScreen = ({navigation}) => {
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

export default ToolsScreen;
