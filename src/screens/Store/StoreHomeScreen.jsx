import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import {getCurrentUserData} from '../../api/UserApi';
import {getStoreById} from '../../api/StoreApi';
import {firebase} from '../../../firebase/firebase';
import CUSTOM_COLOR from '../../constants/color';

const StoreHomeScreen = ({navigation}) => {
  const [userData, setUserData] = useState({});
  const [storeData, setStoreData] = useState(null);
  const [storeStats, setStoreStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    shippingOrders: 0,
    returnOrders: 0,
    reviewOrders: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  const handleGetCurrentUser = async () => {
    try {
      const user = firebase.auth().currentUser;
      const res = await getCurrentUserData({userId: user.uid});
      if (res.status === 200) {
        setUserData(res.data);
        // If user has a store, fetch store data
        if (res.data.storeId) {
          await handleGetStoreData(res.data.storeId);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleGetStoreData = async (storeId) => {
    try {
      const res = await getStoreById(storeId);
      if (res.status === 200) {
        setStoreData(res.data);
      }
    } catch (error) {
      console.error('Error fetching store data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await handleGetCurrentUser();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'suspended':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending Review';
      case 'suspended':
        return 'Suspended';
      default:
        return 'Unknown';
    }
  };

  const renderStoreInfo = () => {
    if (!storeData) return null;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.sectionTitle}>Store Information</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditStore', {storeId: storeData._id})}>
            <Text style={styles.editLink}>Edit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.storeInfoContainer}>
          <Image
            source={{uri: storeData.image || 'https://via.placeholder.com/80'}}
            style={styles.storeImage}
          />
          <View style={styles.storeDetails}>
            <Text style={styles.storeName}>{storeData.name}</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, {backgroundColor: getStatusColor(storeData.status)}]}>
                <Text style={styles.statusText}>{getStatusText(storeData.status)}</Text>
              </View>
            </View>
            <Text style={styles.storeAddress} numberOfLines={2}>
              {storeData.address}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>⭐ {storeData.rating.toFixed(1)}</Text>
              <Text style={styles.reviewCount}>({storeData.reviewCount} reviews)</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.contactInfo}>
          <Text style={styles.contactText}>📧 {storeData.email}</Text>
          <Text style={styles.contactText}>📞 {storeData.phoneNumber}</Text>
        </View>
      </View>
    );
  };

  const renderQuickStats = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quick Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{storeStats.totalProducts}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{storeStats.totalOrders}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statNumber, {color: '#28a745'}]}>
              ${storeStats.totalRevenue.toLocaleString()}
            </Text>
            <Text style={styles.statLabel}>Revenue</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{storeData?.reviewCount || 0}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderQuickActions = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddProduct')}>
            <Text style={styles.actionIcon}>📦</Text>
            <Text style={styles.actionText}>Add Product</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ManageProducts')}>
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionText}>Manage Products</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('OrderManagement')}>
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionText}>Orders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('StoreAnalytics')}>
            <Text style={styles.actionIcon}>📈</Text>
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Seller Center</Text>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{uri: userData.avatar ?? 'https://via.placeholder.com/50'}}
            style={styles.userIcon}
          />
          <Text style={styles.userName}>{userData.fullName}</Text>
        </TouchableOpacity>
      </View>

      {/* Store not created yet */}
      {!userData.storeId && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Start your business right now!</Text>
          <Text style={styles.subtitle}>
            Create your store to start selling products and manage your business.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('InfoStore')}>
            <Text style={styles.buttonText}>Create Store</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Store created - show store info and stats */}
      {userData.storeId && (
        <>
          {renderStoreInfo()}
          {renderQuickStats()}
          
          {/* Order Summary */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.sectionTitle}>Order Status</Text>
              <TouchableOpacity onPress={() => navigation.navigate('OrderManagement')}>
                <Text style={styles.viewAllLink}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.orderStats}>
              {[
                {label: 'To Process', value: storeStats.pendingOrders, color: '#ffc107'},
                {label: 'Shipping', value: storeStats.shippingOrders, color: '#007bff'},
                {label: 'Return', value: storeStats.returnOrders, color: '#dc3545'},
                {label: 'Review', value: storeStats.reviewOrders, color: '#28a745'},
              ].map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.statItem}
                  onPress={() => navigation.navigate('OrderManagement', {status: item.label})}>
                  <Text style={[styles.statValue, {color: item.color}]}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {renderQuickActions()}

          {/* Business Advisor */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Business Tools</Text>
            <View style={styles.row}>
              <TouchableOpacity 
                style={styles.smallButton}
                onPress={() => navigation.navigate('ProductRanking')}>
                <Text style={styles.smallButtonText}>Product Ranking</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.smallButton}
                onPress={() => navigation.navigate('TrafficAnalytics')}>
                <Text style={styles.smallButtonText}>Traffic Analytics</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity 
                style={styles.smallButton}
                onPress={() => navigation.navigate('CustomerInsights')}>
                <Text style={styles.smallButtonText}>Customer Insights</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.smallButton}
                onPress={() => navigation.navigate('SalesReport')}>
                <Text style={styles.smallButtonText}>Sales Report</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Store Performance */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Performance Metrics</Text>
            <View style={styles.performanceContainer}>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceLabel}>Store Rating</Text>
                <Text style={styles.performanceValue}>
                  {storeData?.rating?.toFixed(1) || '0.0'}/5.0
                </Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceLabel}>Response Rate</Text>
                <Text style={styles.performanceValue}>98%</Text>
              </View>
              <View style={styles.performanceItem}>
                <Text style={styles.performanceLabel}>Shipping Time</Text>
                <Text style={styles.performanceValue}>2.1 days</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    borderRadius: 8,
    marginBottom: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editLink: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  },
  viewAllLink: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '500',
  },
  storeInfoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  storeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  storeDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statusContainer: {
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  orderStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  smallButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#e9ecef',
    padding: 12,
    borderRadius: 8,
  },
  smallButtonText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  performanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  performanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  performanceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  performanceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default StoreHomeScreen;