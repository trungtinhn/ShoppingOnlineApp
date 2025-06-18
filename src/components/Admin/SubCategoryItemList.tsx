import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CUSTOM_COLOR from '../../constants/color';

interface SubCategoryItemListProps {
  source: string;
  namelist: string;
  description: string;
  commissionFee: number;
  globalCategoryName: string;
  onEditPress: () => void;
}

const SubCategoryItemList: React.FC<SubCategoryItemListProps> = ({
  source,
  namelist,
  description,
  commissionFee,
  globalCategoryName,
  onEditPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={{ uri: source }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.centerSection}>
        <Text style={styles.nameText}>{namelist}</Text>
        <Text style={styles.descriptionText} numberOfLines={2}>
          {description || 'No description available'}
        </Text>
        <Text style={styles.globalCategoryText}>
          Global Category: {globalCategoryName}
        </Text>
        <Text style={styles.commissionText}>
          Commission Fee: {commissionFee}%
        </Text>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.editButton} onPress={onEditPress}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: CUSTOM_COLOR.White,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftSection: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: CUSTOM_COLOR.LightGray,
  },
  centerSection: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: CUSTOM_COLOR.Gray,
    marginBottom: 5,
  },
  globalCategoryText: {
    fontSize: 12,
    color: CUSTOM_COLOR.DarkBlue,
    marginBottom: 3,
  },
  commissionText: {
    fontSize: 12,
    color: CUSTOM_COLOR.DarkOrange,
    fontWeight: '600',
  },
  rightSection: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  editButton: {
    backgroundColor: CUSTOM_COLOR.DarkOrange,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: CUSTOM_COLOR.White,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SubCategoryItemList;