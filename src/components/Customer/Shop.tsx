import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getStoreById } from '../../api/StoreApi';
import { IM_MauAo } from '../../../assets/Admin/images';

const ViewShop = (idShop: string ) => {
  const [shopData, setShopData] = useState<any>([]);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await getStoreById(idShop);
        console.log(response.data);
        setShopData(response.data);
      } catch (error) {
        console.error("Error loading shop data:", error);
      }
    };

    if (idShop) {
      fetchShopData();
    }
  }, [idShop]);

  if (!shopData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={shopData.image ? {uri: shopData.image }: IM_MauAo} style={styles.avatar} />
      <Text style={styles.shopName}>{shopData.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ViewShop;
