import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { WareHouse, Love, Sold, ViewPerSon } from '../../../assets/Admin/icons';
import CUSTOM_COLOR from '../../constants/color';

const MyProductOne = (props: any) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={props.onPress}
      activeOpacity={0.7}
    >
      {/* Header Section with Image and Basic Info */}
      <View style={styles.headerSection}>
        <Image
          source={{ uri: props.source }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {props.title}
          </Text>
          <Text style={styles.productPrice}>
            {props.price?.toLocaleString()} VND
          </Text>
          {props.type === 'Hidden' && (
            <View style={styles.hiddenBadge}>
              <Text style={styles.hiddenText}>Hidden</Text>
            </View>
          )}
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statsColumn}>
          <View style={styles.statItem}>
            <Image
              source={WareHouse}
              style={styles.statIcon}
              resizeMode="contain"
            />
            <Text style={styles.statLabel}>Stock:</Text>
            <Text style={styles.statValue}>{props.soluongtonkho || 0}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Image
              source={Love}
              style={styles.statIcon}
              resizeMode="contain"
            />
            <Text style={styles.statLabel}>Likes:</Text>
            <Text style={styles.statValue}>{props.soluonglove || 0}</Text>
          </View>
        </View>

        <View style={styles.statsColumn}>
          <View style={styles.statItem}>
            <Image
              source={Sold}
              style={styles.statIcon}
              resizeMode="contain"
            />
            <Text style={styles.statLabel}>Sold:</Text>
            <Text style={styles.statValue}>{props.soluongban || 0}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Image
              source={ViewPerSon}
              style={styles.statIcon}
              resizeMode="contain"
            />
            <Text style={styles.statLabel}>Views:</Text>
            <Text style={styles.statValue}>{props.soluongview || 0}</Text>
          </View>
        </View>
      </View>

      {/* Status Indicator */}
      <View style={styles.statusSection}>
        <View style={[
          styles.statusIndicator,
          { backgroundColor: getStatusColor(props.soluongtonkho, props.type) }
        ]}>
          <Text style={styles.statusText}>
            {getStatusText(props.soluongtonkho, props.type)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Helper functions
const getStatusColor = (stock: number, type: string) => {
  if (type === 'Hidden') return CUSTOM_COLOR.Gray;
  if (stock === 0) return CUSTOM_COLOR.Red;
  if (stock < 10) return CUSTOM_COLOR.FlushOrange;
  return CUSTOM_COLOR.Green;
};

const getStatusText = (stock: number, type: string) => {
  if (type === 'Hidden') return 'Hidden Product';
  if (stock === 0) return 'Out of Stock';
  if (stock < 10) return 'Low Stock';
  return 'In Stock';
};

export default MyProductOne;

const styles = StyleSheet.create({
  container: {
    backgroundColor: CUSTOM_COLOR.White,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.LightGray,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: "100%", 
  },
  
  headerSection: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: CUSTOM_COLOR.LightGray,
  },
  
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: CUSTOM_COLOR.LightGray,
  },
  
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
    marginBottom: 4,
    lineHeight: 20,
  },
  
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.DarkOrange,
    marginBottom: 4,
  },
  
  hiddenBadge: {
    backgroundColor: CUSTOM_COLOR.Gray,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  
  hiddenText: {
    color: CUSTOM_COLOR.White,
    fontSize: 10,
    fontWeight: 'bold',
  },
  
  statsSection: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
  },
  
  statsColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },
  
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  statIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  
  statLabel: {
    fontSize: 12,
    color: CUSTOM_COLOR.Gray,
    marginRight: 4,
    minWidth: 40,
  },
  
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
  },
  
  statusSection: {
    padding: 12,
    paddingTop: 0,
  },
  
  statusIndicator: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignItems: 'center',
  },
  
  statusText: {
    color: CUSTOM_COLOR.White,
    fontSize: 12,
    fontWeight: 'bold',
  },
});