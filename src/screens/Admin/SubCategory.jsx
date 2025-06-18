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
import { getSubCategory } from '../../api/SubCategoryApi';
import SubCategoryItemList from '../../components/Admin/SubCategoryItemList.tsx';
import { useFocusEffect } from '@react-navigation/native';

export default function SubCategory({ navigation }) {
  const [dataSubCategories, setDataSubCategories] = useState([]);

  const getDataSubCategories = async () => {
    try {
      const response = await getSubCategory();
      if (response && response.data) {
        setDataSubCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    getDataSubCategories();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getDataSubCategories();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <BackTo onPress={() => navigation.goBack()} Info="Sub Category" />
      </View>
      
      <ScrollView
        style={{
          backgroundColor: CUSTOM_COLOR.White,
          height: '85%',
        }}>
        {dataSubCategories.map((subCategory, index) => {
          return (
            <SubCategoryItemList
              key={index}
              source={subCategory.image}
              namelist={subCategory.name}
              description={subCategory.description}
              commissionFee={subCategory.commissionFee}
              globalCategoryName={subCategory.globalCategoryId?.name || 'N/A'}
              onEditPress={() => 
                navigation.navigate('EditSubCategory', { subCategory })
              }
            />
          );
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <ButtonDetail
          title={'Add new Sub Category'}
          color={CUSTOM_COLOR.DarkOrange}
          onPress={() => navigation.navigate('AddSubCategory')}
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