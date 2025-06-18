import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import BackTo from '../../components/Admin/BackTo';
import CUSTOM_COLOR from '../../constants/color';
import * as storePromotionApi from '../../api/StorePromotionApi';
import { getCurrentUserData } from '../../api/UserApi';
import { firebase } from '../../../firebase/firebase';

// Debug import
console.log('storePromotionApi:', storePromotionApi);

export default function StorePromotionManager({ navigation }) {
  const [promotions, setPromotions] = useState([]);
  const [storeId, setStoreId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  // Lấy storeId từ user data
  const fetchStoreId = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const userRes = await getCurrentUserData({ userId: user.uid });
        if (userRes.status === 200) {
          setStoreId(userRes.data.storeId);
        }
      }
    } catch (error) {
      console.log('Error fetching storeId:', error);
    }
  };

  // Lấy danh sách promotions
  const fetchPromotions = async () => {
    if (!storeId) return;
    
    try {
      setLoading(true);
      const response = await storePromotionApi.getPromotionsByStoreId(storeId);
      console.log('API Response:', response);
      
      if (response.status === 200) {
        // API trả về { promotions: [...], success: true }
        const promotionsData = response.data?.promotions || [];
        console.log('Promotions data:', promotionsData);
        console.log('Number of promotions:', promotionsData.length);
        setPromotions(promotionsData);
      } else {
        console.log('API response not 200:', response);
        setPromotions([]);
      }
    } catch (error) {
      console.log('Error fetching promotions:', error);
      setPromotions([]);
    } finally {
      setLoading(false);
    }
  };

  // Kiểm tra xem promotion đã hết hạn chưa
  const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  // Kiểm tra xem có thể xóa promotion không (chỉ xóa được khi hết hạn)
  const canDelete = (promotion) => {
    return isExpired(promotion.endDate);
  };

  // Xóa promotion
  const handleDelete = (promotion) => {
    if (!canDelete(promotion)) {
      Alert.alert(
        'Cannot Delete',
        'You can only delete expired promotions.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Delete Promotion',
      `Are you sure you want to delete "${promotion.promotionName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await storePromotionApi.deleteStorePromotion(promotion._id);
              if (response.status === 200) {
                fetchPromotions(); // Refresh list
                Alert.alert('Success', 'Promotion deleted successfully!');
              } else {
                Alert.alert('Error', 'Failed to delete promotion.');
              }
            } catch (error) {
              console.log('Error deleting promotion:', error);
              Alert.alert('Error', 'Failed to delete promotion.');
            }
          }
        }
      ]
    );
  };

  // Mở modal chỉnh sửa số lượng
  const openEditModal = (promotion) => {
    setSelectedPromotion(promotion);
    setNewQuantity(promotion.quantityAvailable.toString());
    setEditModalVisible(true);
  };

  // Cập nhật số lượng promotion
  const handleUpdateQuantity = async () => {
    if (!selectedPromotion || !newQuantity) return;

    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) {
      Alert.alert('Invalid Input', 'Please enter a valid quantity (0 or greater).');
      return;
    }

    try {
      const updateData = {
        quantityAvailable: quantity,
        totalRemainingUses: quantity // Cập nhật cả totalRemainingUses
      };

      const response = await storePromotionApi.updateStorePromotion(selectedPromotion._id, updateData);
      if (response.status === 200) {
        setEditModalVisible(false);
        fetchPromotions(); // Refresh list
        Alert.alert('Success', 'Quantity updated successfully!');
      } else {
        Alert.alert('Error', 'Failed to update quantity.');
      }
    } catch (error) {
      console.log('Error updating quantity:', error);
      Alert.alert('Error', 'Failed to update quantity.');
    }
  };

  // Toggle trạng thái active/inactive
  const togglePromotionStatus = async (promotion) => {
    if (isExpired(promotion.endDate)) {
      Alert.alert('Cannot Change Status', 'Cannot change status of expired promotions.');
      return;
    }

    try {
      const newStatus = !promotion.isActive;
      const response = await storePromotionApi.updatePromotionStatus(promotion._id, newStatus);
      
      if (response.status === 200) {
        fetchPromotions(); // Refresh list
        Alert.alert('Success', `Promotion ${newStatus ? 'activated' : 'deactivated'} successfully!`);
      } else {
        Alert.alert('Error', 'Failed to update promotion status.');
      }
    } catch (error) {
      console.log('Error updating status:', error);
      Alert.alert('Error', 'Failed to update promotion status.');
    }
  };

  // Render promotion item
  const renderPromotionItem = ({ item }) => {
    const expired = isExpired(item.endDate);
    const canDeleteItem = canDelete(item);

    return (
      <View style={styles.promotionCard}>
        {/* Promotion Image */}
        {item.promotionImage && (
          <Image 
            source={{ uri: item.promotionImage }} 
            style={styles.promotionImage}
            resizeMode="cover"
          />
        )}

        {/* Promotion Info */}
        <View style={styles.promotionInfo}>
          <Text style={styles.promotionName}>{item.promotionName}</Text>
          <Text style={styles.promotionDetails} numberOfLines={2}>
            {item.promotionDetails}
          </Text>
          
          {/* Discount Info */}
          <View style={styles.discountRow}>
            <Text style={styles.discountText}>
              {item.discountRate}% OFF
            </Text>
            {item.maxDiscount && (
              <Text style={styles.maxDiscountText}>
                Max: {item.maxDiscount.toLocaleString()} VND
              </Text>
            )}
          </View>

          {/* Minimum Order */}
          {item.minimumOrderValue > 0 && (
            <Text style={styles.minOrderText}>
              Min order: {item.minimumOrderValue.toLocaleString()} VND
            </Text>
          )}

          {/* Quantity Info */}
          <View style={styles.quantityRow}>
            <Text style={styles.quantityText}>
              Available: {item.quantityAvailable}
            </Text>
            {item.usageLimitPerUser && (
              <Text style={styles.limitText}>
                Limit: {item.usageLimitPerUser}/user
              </Text>
            )}
          </View>

          {/* Date Info */}
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>
              {new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: expired ? CUSTOM_COLOR.Red : item.isActive ? CUSTOM_COLOR.Green : CUSTOM_COLOR.Gray }]}>
              <Text style={styles.statusText}>
                {expired ? 'Expired' : item.isActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {/* Edit Quantity Button */}
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: CUSTOM_COLOR.Blue }]}
            onPress={() => openEditModal(item)}
          >
            <Text style={styles.actionButtonText}>Edit Qty</Text>
          </TouchableOpacity>

          {/* Toggle Status Button */}
          {!expired && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: item.isActive ? CUSTOM_COLOR.Orange : CUSTOM_COLOR.Green }]}
              onPress={() => togglePromotionStatus(item)}
            >
              <Text style={styles.actionButtonText}>
                {item.isActive ? 'Deactivate' : 'Activate'}
              </Text>
            </TouchableOpacity>
          )}

          {/* Delete Button - chỉ hiện khi hết hạn */}
          {canDeleteItem && (
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: CUSTOM_COLOR.Red }]}
              onPress={() => handleDelete(item)}
            >
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetchStoreId();
  }, []);

  useEffect(() => {
    if (storeId) {
      fetchPromotions();
    }
  }, [storeId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackTo onPress={() => navigation.goBack()} Info="Store Promotions" />
        <TouchableOpacity 
          onPress={fetchPromotions}
          style={styles.refreshButton}
        >
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Promotions List */}
      <FlatList
        data={promotions}
        renderItem={renderPromotionItem}
        keyExtractor={(item) => item._id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {loading ? 'Loading promotions...' : 'No promotions found for your store.'}
            </Text>
          </View>
        }
      />

      {/* Edit Quantity Modal */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Quantity</Text>
            <Text style={styles.modalSubtitle}>
              {selectedPromotion?.promotionName}
            </Text>
            
            <TextInput
              style={styles.quantityInput}
              value={newQuantity}
              onChangeText={setNewQuantity}
              placeholder="Enter new quantity"
              keyboardType="numeric"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: CUSTOM_COLOR.Gray }]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: CUSTOM_COLOR.DarkOrange }]}
                onPress={handleUpdateQuantity}
              >
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: CUSTOM_COLOR.LightGray,
  },
  refreshButton: {
    padding: 8,
    backgroundColor: CUSTOM_COLOR.LightGray,
    borderRadius: 8,
  },
  refreshText: {
    color: CUSTOM_COLOR.DarkOrange,
    fontSize: 12,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 15,
  },
  promotionCard: {
    backgroundColor: CUSTOM_COLOR.White,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.LightGray,
  },
  promotionImage: {
    width: '100%',
    height: 120,
  },
  promotionInfo: {
    padding: 15,
  },
  promotionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
    marginBottom: 5,
  },
  promotionDetails: {
    fontSize: 14,
    color: CUSTOM_COLOR.Gray,
    marginBottom: 10,
    lineHeight: 18,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  discountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Red,
    marginRight: 10,
  },
  maxDiscountText: {
    fontSize: 12,
    color: CUSTOM_COLOR.Gray,
  },
  minOrderText: {
    fontSize: 12,
    color: CUSTOM_COLOR.Gray,
    marginBottom: 8,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
  },
  limitText: {
    fontSize: 12,
    color: CUSTOM_COLOR.Gray,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: CUSTOM_COLOR.Gray,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: CUSTOM_COLOR.White,
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 15,
    paddingTop: 0,
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: CUSTOM_COLOR.White,
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: CUSTOM_COLOR.Gray,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: CUSTOM_COLOR.White,
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxWidth: 350,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
    textAlign: 'center',
    marginBottom: 5,
  },
  modalSubtitle: {
    fontSize: 14,
    color: CUSTOM_COLOR.Gray,
    textAlign: 'center',
    marginBottom: 20,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.LightGray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: CUSTOM_COLOR.White,
    fontSize: 14,
    fontWeight: 'bold',
  },
});