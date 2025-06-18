import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Modal,
  ScrollView,
} from 'react-native';
import { IC_User, IC_Store, IC_Location, IC_Phone, IC_Email, IC_Star } from '../../../assets/Admin/icons';
import LoadingComponent from '../../components/LoadingComponent';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import Search from '../../components/Admin/Search';
import {
  getCurrentUserData,
} from '../../api/UserApi';
import { firebase } from '../../../firebase/firebase';
import { updateStore, getAllStores } from '../../api/StoreApi';

function ManageStore({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState({});
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStores, setFilteredStores] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedStore, setSelectedStore] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filterStores = () => {
    let filtered = stores;
    
    // Filter by status
    filtered = filtered.filter(store => store.status === activeTab);
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(store =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredStores(filtered);
  };

  useEffect(() => {
    filterStores();
  }, [activeTab, stores, searchTerm]);

  const TabBar = () => (
    <View style={styles.tabContainer}>
      {[
        { key: 'pending', label: 'Pending', count: stores.filter(s => s.status === 'pending').length },
        { key: 'active', label: 'Active', count: stores.filter(s => s.status === 'active').length },
        { key: 'suspended', label: 'Suspended', count: stores.filter(s => s.status === 'suspended').length },
      ].map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.activeTab]}
          onPress={() => setActiveTab(tab.key)}
        >
          <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
            {tab.label}
          </Text>
          <View style={[styles.badge, activeTab === tab.key && styles.activeBadge]}>
            <Text style={[styles.badgeText, activeTab === tab.key && styles.activeBadgeText]}>
              {tab.count}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await handleGetAllStores();
    setRefreshing(false);
  };

  useEffect(() => {
    getUserData();
    handleGetAllStores();
    setIsLoading(false);
  }, []);

  const handleStorePress = (store) => {
    setSelectedStore(store);
    setModalVisible(true);
  };

  const handleUpdateStoreStatus = async (store, newStatus) => {
    const statusTexts = {
      'active': 'activate',
      'suspended': 'suspend',
      'pending': 'set to pending'
    };

    Alert.alert(
      `${statusTexts[newStatus].charAt(0).toUpperCase() + statusTexts[newStatus].slice(1)} Store`,
      `Are you sure you want to ${statusTexts[newStatus]} "${store.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              const updatedStore = { ...store, status: newStatus };
              await updateStore({ id: store._id, data: updatedStore });
              await handleGetAllStores();
              setModalVisible(false);
              Alert.alert('Success', `Store has been ${statusTexts[newStatus]} successfully.`);
            } catch (error) {
              console.error('Error updating store status:', error);
              Alert.alert('Error', 'Failed to update store status. Please try again.');
            }
          },
        },
      ]
    );
  };

  const handleGetAllStores = async () => {
    try {
      const res = await getAllStores();
      setStores(res.data || []);
    } catch (error) {
      console.error('Error fetching stores:', error);
      Alert.alert('Error', 'Failed to load stores. Please try again.');
    }
  };

  const getUserData = async () => {
    try {
      const user = firebase.auth().currentUser;
      const res = await getCurrentUserData({ userId: user.uid });
      setUserData(res.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'suspended': return '#F44336';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return '✓';
      case 'pending': return '⏳';
      case 'suspended': return '⚠️';
      default: return '?';
    }
  };

  const renderStore = ({ item }) => (
    <TouchableOpacity style={styles.storeCard} onPress={() => handleStorePress(item)}>
      <View style={styles.storeHeader}>
        <Image
          source={item.image ? { uri: item.image } : IC_Store}
          style={styles.storeImage}
        />
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{item.name}</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
            <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>
      
      <View style={styles.storeDetails}>
        <View style={styles.detailRow}>
          <Image source={IC_Location} style={styles.detailIcon} />
          <Text style={styles.detailText} numberOfLines={1}>
            {item.address}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Image source={IC_Email} style={styles.detailIcon} />
          <Text style={styles.detailText}>{item.email}</Text>
        </View>
        
        <View style={styles.ratingRow}>
          <Image source={IC_Star} style={styles.detailIcon} />
          <Text style={styles.ratingText}>
            {item.rating.toFixed(1)} ({item.reviewCount} reviews)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const StoreDetailModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {selectedStore && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Store Details</Text>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalStoreInfo}>
                  <Image
                    source={selectedStore.image ? { uri: selectedStore.image } : IC_Store}
                    style={styles.modalStoreImage}
                  />
                  <Text style={styles.modalStoreName}>{selectedStore.name}</Text>
                  <View style={[styles.modalStatusBadge, { backgroundColor: getStatusColor(selectedStore.status) }]}>
                    <Text style={styles.modalStatusText}>
                      {selectedStore.status.charAt(0).toUpperCase() + selectedStore.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.modalDetailsContainer}>
                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailLabel}>Email:</Text>
                    <Text style={styles.modalDetailValue}>{selectedStore.email}</Text>
                  </View>
                  
                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailLabel}>Phone:</Text>
                    <Text style={styles.modalDetailValue}>{selectedStore.phoneNumber}</Text>
                  </View>
                  
                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailLabel}>Address:</Text>
                    <Text style={styles.modalDetailValue}>{selectedStore.address}</Text>
                  </View>
                  
                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailLabel}>Location:</Text>
                    <Text style={styles.modalDetailValue}>
                      {selectedStore.wardName}, {selectedStore.districtName}, {selectedStore.provinceName}
                    </Text>
                  </View>
                  
                  <View style={styles.modalDetailItem}>
                    <Text style={styles.modalDetailLabel}>Rating:</Text>
                    <Text style={styles.modalDetailValue}>
                      {selectedStore.rating.toFixed(1)} ⭐ ({selectedStore.reviewCount} reviews)
                    </Text>
                  </View>
                  
                  {selectedStore.description && (
                    <View style={styles.modalDetailItem}>
                      <Text style={styles.modalDetailLabel}>Description:</Text>
                      <Text style={styles.modalDetailValue}>{selectedStore.description}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.modalActions}>
                  {selectedStore.status === 'pending' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.activateButton]}
                      onPress={() => handleUpdateStoreStatus(selectedStore, 'active')}
                    >
                      <Text style={styles.actionButtonText}>Activate Store</Text>
                    </TouchableOpacity>
                  )}
                  
                  {selectedStore.status === 'active' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.suspendButton]}
                      onPress={() => handleUpdateStoreStatus(selectedStore, 'suspended')}
                    >
                      <Text style={styles.actionButtonText}>Suspend Store</Text>
                    </TouchableOpacity>
                  )}
                  
                  {selectedStore.status === 'suspended' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.activateButton]}
                      onPress={() => handleUpdateStoreStatus(selectedStore, 'active')}
                    >
                      <Text style={styles.actionButtonText}>Reactivate Store</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  if (isLoading) {
    return <LoadingComponent text="Loading stores..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.adminInfo}>
          <Image
            source={userData.avatar ? { uri: userData.avatar } : IC_User}
            style={styles.adminAvatar}
          />
          <View>
            <Text style={styles.adminName}>{userData.fullName}</Text>
            <Text style={styles.adminRole}>{userData.userType}</Text>
          </View>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Search
            placeholder="Search stores..."
            style={styles.searchInput}
            onSearch={handleSearch}
          />
        </View>
      </View>

      {/* Tab Bar */}
      <TabBar />

      {/* Store List */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredStores}
          renderItem={renderStore}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>

      {/* Store Detail Modal */}
      <StoreDetailModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  
  // Header
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  adminInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: CUSTOM_COLOR.FlushOrange,
  },
  adminName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONT_FAMILY.Bold,
  },
  adminRole: {
    fontSize: 14,
    color: '#666',
    fontFamily: FONT_FAMILY.Bold,
  },

  // Search
  searchContainer: {
    backgroundColor: '#ffffff',
    height: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchInput: {
    width: '100%',
    height: 40,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    paddingHorizontal: 12,
  },

  // Tabs
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: CUSTOM_COLOR.FlushOrange,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginRight: 6,
  },
  activeTabText: {
    color: '#ffffff',
  },
  badge: {
    backgroundColor: '#e9ecef',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
  },
  activeBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  activeBadgeText: {
    color: '#ffffff',
  },

  // Store List
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  storeCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f8f9fa',
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONT_FAMILY.Bold,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: FONT_FAMILY.Semibold,
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
    fontWeight: 'bold',
  },
  storeDetails: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#666',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    fontFamily: FONT_FAMILY.Bold,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    fontFamily: FONT_FAMILY.Bold,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    maxHeight: '80%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONT_FAMILY.Bold,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#666',
  },
  modalStoreInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalStoreImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
  },
  modalStoreName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONT_FAMILY.Bold,
    marginBottom: 8,
  },
  modalStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  modalStatusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.Bold,
  },
  modalDetailsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  modalDetailItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
    paddingBottom: 8,
  },
  modalDetailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: FONT_FAMILY.Bold,
    marginBottom: 4,
  },
  modalDetailValue: {
    fontSize: 14,
    color: '#666',
    fontFamily: FONT_FAMILY.Bold,
  },
  modalActions: {
    gap: 10,
  },
  actionButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  activateButton: {
    backgroundColor: '#4CAF50',
  },
  suspendButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.Bold,
  },
});

export default ManageStore;