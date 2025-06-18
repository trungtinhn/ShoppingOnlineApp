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
import { getAllGlobalCategory } from '../../api/GlobalCategoryApi';
import GlobalItemList from '../../components/Admin/GlobalItemList';
import { useFocusEffect } from '@react-navigation/native';

export default function GlobalCategory({ navigation }) {
  const [dataCategories, setDataCategories] = useState([]);

  const getDataCategories = async () => {
    const dataCategories = await getAllGlobalCategory();
    setDataCategories(dataCategories.data);
  };

  useEffect(() => {
    getDataCategories();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getDataCategories();
    }, [])
  )
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <BackTo onPress={() => navigation.goBack()} Info= "Global Category" />
      </View>
      <ScrollView
        style={{
          backgroundColor: CUSTOM_COLOR.White,
          height: '85%',
        }}>
        {dataCategories.map((category, index) => {
          return (
            <GlobalItemList
              key={index}
              source={category.image}
              namelist={category.name}
              description={category.description}
              onEditPress={() => navigation.navigate('EditGlobalCategory', { category })}
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
          title={'Add new Global Category'}
          color={CUSTOM_COLOR.DarkOrange}
          onPress={() => navigation.navigate('AddGlobalCategory')}
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


