import React, {useEffect, useState} from 'react';
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


export default function Categories({navigation}) {
  const [dataCategories, setDataCategories] = useState([]);

  const getDataCategories = () => {
    const dataCategories = [
      {
        id  : 1,
        AnhDM: 'https://example.com/category1.jpg',
        TenDM: 'Áo nam',
        SoLuongSP: 10,
      },
      {
        id  : 2,
        AnhDM: 'https://example.com/category2.jpg',
        TenDM: 'Áo nữ',
        SoLuongSP: 15,
      },
      {
        id  : 3,
        AnhDM: 'https://example.com/category3.jpg',
        TenDM: 'Giày dép',
        SoLuongSP: 8,
      },
      {
        id  : 4,
        AnhDM: 'https://example.com/category4.jpg',
        TenDM: 'Phụ kiện',
        SoLuongSP: 12,
      },
    ];
    
  
  setDataCategories(dataCategories);
  
  };

  useEffect(() => {
    getDataCategories();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
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
              source={category.AnhDM}
              namelist={category.TenDM}
              numberitem={category.SoLuongSP}
              onPress={() => navigation.navigate('DetailsCategory', {category})}
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


