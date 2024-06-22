import React, { useCallback, useEffect, useState } from 'react';
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
import { id } from 'date-fns/locale';
import { IC_Back } from '../../../assets/Admin/icons';
import BackTo from '../../components/Admin/BackTo';
import { getCategory } from '../../api/CategoryApi';
import { useFocusEffect } from '@react-navigation/native';
export default function Categories({ navigation }) {
  const [dataCategories, setDataCategories] = useState([]);

  const getDataCategories = async () => {
    const dataCategories = await getCategory();
    setDataCategories(dataCategories.data);
  };
  useFocusEffect(
    useCallback(() => {
      getDataCategories();
    }, [])
  );
  useEffect(() => {
    getDataCategories();
  }, []);

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
      </View>
      <ScrollView
        style={{
          backgroundColor: CUSTOM_COLOR.White,
          height: '85%',
        }}>
        {dataCategories.map((category, index) => {
          return (
            <ItemList
              key={index}
              source={category.image}
              namelist={category.name}
              numberitem={category.numProduct}
              onPress={() => navigation.navigate('DetailsCategory', { category })}
              onEditPress={() => navigation.navigate('EditCategory', { category })}
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
          title={'Add new Category'}
          color={CUSTOM_COLOR.DarkOrange}
          onPress={() => navigation.navigate('AddNewCategory')}
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


