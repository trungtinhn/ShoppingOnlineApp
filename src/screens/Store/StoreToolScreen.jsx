import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import {
  add_product_IC,
  category_IC,
  functionPermission_IC,
  income_IC,
  manages_review_IC,
  manageStaff_IC,
  orders_IC,
  product_IC,
  voucher_IC,
} from '../../../assets/Store/icons';
import { IC_FunctionPermission } from '../../../assets/Admin/icons';

const { width } = Dimensions.get('window');

const toolsData = [
  {
    title: 'Store Management',
    subtitle: 'Core features for your business',
    color: '#4A90E2',
    items: [
      { 
        name: 'Products', 
        icon: product_IC, 
        screen: 'StoreProducts',
        description: 'Manage your inventory',
        badge: null
      },
      { 
        name: 'Orders', 
        icon: orders_IC, 
        screen: 'OrderScreen',
        description: 'Track customer orders',
        badge: '1' // có thể thay đổi thông báo ở đây bằng hàm lấy thông báo của ghn
      },
      { 
        name: 'Categories', 
        icon: category_IC, 
        screen: 'Categories',
        description: 'Organize your products',
        badge: null
      },
      { 
        name: 'Reviews', 
        icon: manages_review_IC, 
        screen: 'ReviewScreen',
        description: 'Customer feedback',
        badge: null
      },
    ],
  },
  {
    title: 'Team & Permissions',
    subtitle: 'Manage your team effectively',
    color: '#7B68EE',
    items: [
      { 
        name: 'Manage Staff', 
        icon: manageStaff_IC, 
        screen: 'ManageStaff',
        description: 'Team management',
        badge: null
      },
      { 
        name: 'Permissions', 
        icon: functionPermission_IC, 
        screen: 'FunctionPermission',
        description: 'Role-based access',
        badge: null
      },
    ],
  },
  {
    title: 'Marketing & Growth',
    subtitle: 'Boost your sales and engagement',
    color: '#FF6B6B',
    items: [
      { 
        name: 'Promotions', 
        icon: voucher_IC, 
        screen: 'StorePromotion',
        description: 'Discounts & offers',
        badge: null
      },
      { 
        name: 'Analytics', 
        icon: income_IC, 
        screen: 'Analytics',
        description: 'Sales insights',
        badge: null
      },
    ],
  },
];

const ToolsScreen = ({ navigation }) => {
  const [pressedItem, setPressedItem] = useState(null);

  const handlePress = (screen, itemName) => {
    setPressedItem(itemName);
    setTimeout(() => {
      setPressedItem(null);
      navigation.navigate(screen);
    }, 150);
  };

  const renderToolItem = (item, sectionColor) => {
    const isPressed = pressedItem === item.name;
    
    return (
      <TouchableOpacity
        key={item.name}
        style={[
          styles.toolItem,
          isPressed && styles.toolItemPressed,
          { borderLeftColor: sectionColor }
        ]}
        onPress={() => handlePress(item.screen, item.name)}
        activeOpacity={0.7}
      >
        {/* Badge */}
        {item.badge && (
          <View style={[styles.badge, { backgroundColor: sectionColor }]}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
        
        {/* Icon Container */}
        <View style={[styles.iconContainer, { backgroundColor: sectionColor + '15' }]}>
          <Image source={item.icon} style={styles.toolIcon} />
        </View>
        
        {/* Content */}
        <View style={styles.toolContent}>
          <Text style={styles.toolName}>{item.name}</Text>
          <Text style={styles.toolDescription}>{item.description}</Text>
        </View>
        
        {/* Arrow Indicator */}
        <View style={styles.arrowContainer}>
          <Text style={[styles.arrow, { color: sectionColor }]}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (section) => (
    <View key={section.title} style={styles.section}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionIndicator, { backgroundColor: section.color }]} />
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
        </View>
      </View>
      
      {/* Section Items */}
      <View style={styles.sectionContent}>
        {section.items.map((item) => renderToolItem(item, section.color))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Store Tools</Text>
        <Text style={styles.headerSubtitle}>Everything you need to manage your business</Text>
      </View>
      
      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {toolsData.map(renderSection)}
        
        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EAED',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIndicator: {
    width: 4,
    height: 24,
    borderRadius: 2,
    marginRight: 12,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  sectionContent: {
    gap: 12,
  },
  toolItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#E8EAED',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  toolItemPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.12,
    elevation: 6,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 12,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  toolIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  toolContent: {
    flex: 1,
  },
  toolName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '400',
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default ToolsScreen;