import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { IC_AccountManagement, IC_ChatWithStore, IC_GlobalCategory, IC_GlobalPromotion, IC_Rank, IC_logout } from '../../../assets/Admin/icons';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import { firebase } from '../../../firebase/firebase';

const { width } = Dimensions.get('window');

const toolsData = [
  {
    title: 'Core Functions',
    description: 'Essential admin tools and management features',
    items: [
      {
        name: 'Chat Management',
        description: 'Manage store communications',
        icon: IC_ChatWithStore,
        screen: 'ChatWithStore',
        color: '#4CAF50'
      },
      {
        name: 'Store Management',
        description: 'User accounts & permissions',
        icon: IC_AccountManagement,
        screen: 'ManageUser',
        color: '#2196F3'
      },
      {
        name: 'Global Promotions',
        description: 'System-wide promotion management',
        icon: IC_GlobalPromotion,
        screen: 'GlobalPromotion',
        color: '#FF9800'
      },
    ],
  },
  {
    title: 'System Configuration',
    description: 'Platform settings and categorization',
    items: [
      {
        name: 'Global Categories',
        description: 'Product category management',
        icon: IC_GlobalCategory,
        screen: 'GlobalCategory',
        color: '#9C27B0'
      },
      {
        name: 'Subcategory Management',
        description: 'Manage product subcategories',
        icon: IC_GlobalCategory,
        screen: 'SubcategoryManagement',
        color: '#673AB7'
      },
      {
        name: 'Rank Management',
        description: 'User ranking system',
        icon: IC_Rank,
        screen: 'RankManagement',
        color: '#F44336'
      },
    ],
  },
  {
    title: 'Analytics & Reports',
    description: 'Data insights and business intelligence',
    items: [
      {
        name: 'Sales Analytics',
        description: 'Revenue and sales performance',
        icon: IC_GlobalPromotion,
        screen: 'SalesAnalytics',
        color: '#00BCD4'
      },
      {
        name: 'User Activity',
        description: 'Track user engagement metrics',
        icon: IC_AccountManagement,
        screen: 'UserActivity',
        color: '#607D8B'
      },
      {
        name: 'System Reports',
        description: 'Generate detailed system reports',
        icon: IC_Rank,
        screen: 'SystemReports',
        color: '#795548'
      },
    ],
  },
];

const AdminManagement = ({ navigation }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoggingOut(true);
              await firebase.auth().signOut();
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  const renderFunctionCard = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.functionCard}
      onPress={() => navigation.navigate(item.screen)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
          <Image source={item.icon} style={styles.icon} />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Admin Dashboard</Text>
            <Text style={styles.headerSubtitle}>System Management Center</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutIconButton}
            onPress={handleLogout}
            disabled={isLoggingOut}
          >
            <Image source={IC_logout} style={styles.logoutIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Active Admins</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>156</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
        </View>

        {/* Function Sections */}
        {toolsData.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionDescription}>{section.description}</Text>
            </View>
            
            <View style={styles.cardsContainer}>
              {section.items.map((item, itemIndex) => 
                renderFunctionCard(item, itemIndex)
              )}
            </View>
          </View>
        ))}



        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Logout Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[styles.logoutButton, isLoggingOut && styles.logoutButtonDisabled]}
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          <Text style={styles.logoutText}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header Styles
  header: {
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: FONT_FAMILY.Bold,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    fontFamily: FONT_FAMILY.Bold,
    marginTop: 2,
  },
  logoutIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    width: 20,
    height: 20,
    tintColor: '#ffffff',
  },

  // Content Styles
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // Stats Cards
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.FlushOrange,
    fontFamily: FONT_FAMILY.Bold,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: FONT_FAMILY.Bold,
  },

  // Section Styles
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONT_FAMILY.Bold,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: FONT_FAMILY.Bold,
  },

  // Function Cards
  cardsContainer: {
    gap: 12,
  },
  functionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#ffffff',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONT_FAMILY.Semibold,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    fontFamily: FONT_FAMILY.Bold,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: 'bold',
  },

  // Quick Actions
  quickActionsSection: {
    marginBottom: 20,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  quickActionText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: FONT_FAMILY.Semibold,
  },

  // Bottom Section
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#f8f9fa',
  },
  logoutButton: {
    backgroundColor: CUSTOM_COLOR.Red,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonDisabled: {
    opacity: 0.6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.Bold,
  },
  bottomSpacing: {
    height: 20,
  },
});
export default AdminManagement;