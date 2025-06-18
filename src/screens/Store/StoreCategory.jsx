import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CUSTOM_COLOR from '../../constants/color';
import ItemList from '../../components/Admin/ItemList';
import ButtonDetail from '../../components/Admin/ButtonDetail';
import BackTo from '../../components/Admin/BackTo';
import { getCategoriesByStore } from '../../api/CategoryApi';
import { getCurrentUserData } from '../../api/UserApi'; // Import API để lấy user data
import { firebase } from '../../../firebase/firebase';

export default function StoreCategory({ navigation }) {
  const [dataCategories, setDataCategories] = useState([]);
  const [storeId, setStoreId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function để lấy storeId từ user data
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

  // Function để lấy categories theo storeId
  const getDataCategories = async () => {
    if (!storeId) return;
    
    try {
      setLoading(true);
      const response = await getCategoriesByStore({ storeId });
      if (response.status === 200) {
        setDataCategories(response.data);
      } else {
        console.log('Error getting categories:', response);
        setDataCategories([]);
      }
    } catch (error) {
      console.log('Error fetching categories:', error);
      setDataCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Load storeId khi component mount
  useEffect(() => {
    fetchStoreId();
  }, []);

  // Load categories khi có storeId
  useEffect(() => {
    if (storeId) {
      getDataCategories();
    }
  }, [storeId]);

  // Refresh categories khi quay lại trang (focus effect có thể thêm nếu cần)
  const handleRefresh = () => {
    if (storeId) {
      getDataCategories();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <BackTo onPress={() => navigation.goBack()} Info="My Category" />
        
        {/* Refresh button */}
        <TouchableOpacity 
          onPress={handleRefresh}
          style={{
            marginLeft: 'auto',
            padding: 8,
            borderRadius: 20,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        >
          <Text style={{ fontSize: 12, color: CUSTOM_COLOR.DarkOrange }}>
            Refresh
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          backgroundColor: CUSTOM_COLOR.White,
          height: '85%',
        }}>
        {loading ? (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 50,
          }}>
            <Text style={{ color: CUSTOM_COLOR.Gray }}>Loading categories...</Text>
          </View>
        ) : dataCategories.length > 0 ? (
          dataCategories.map((category, index) => {
            return (
              <ItemList
                key={category._id || index} // Sử dụng _id thay vì index
                source={category.image}
                namelist={category.name}
                numberitem={category.numProduct || 0}
                onPress={() => navigation.navigate('DetailsCategory', { 
                  category,
                  storeId // Truyền thêm storeId nếu cần
                })}
                onEditPress={() => navigation.navigate('EditCategory', { 
                  category,
                  storeId,
                  onGoBack: handleRefresh // Callback để refresh sau khi edit
                })}
              />
            );
          })
        ) : (
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 50,
          }}>
            <Text style={{ 
              color: CUSTOM_COLOR.Gray,
              fontSize: 16,
              textAlign: 'center'
            }}>
              No categories found for your store.{'\n'}
              Add your first category below!
            </Text>
          </View>
        )}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <ButtonDetail
          title={'Add new Category'}
          color={CUSTOM_COLOR.DarkOrange}
          onPress={() => navigation.navigate('AddNewCategory', {
            storeId,
            onGoBack: handleRefresh // Callback để refresh sau khi thêm
          })}
          style={{
            width: '90%',
            height: 55,
            marginVertical: 10,
            padding: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
}