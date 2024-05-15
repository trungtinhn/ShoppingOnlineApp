import React, {useEffect, useState} from 'react';

import {collection, onSnapshot, query} from 'firebase/firestore';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { IC_Back } from '../../../assets/Admin/icons';
import CUSTOM_COLOR from '../../constants/color';
import ItemList from '../../components/Admin/ItemList';
import ButtonDetail from '../../components/Admin/ButtonDetail';


export default function Categories({navigation}) {
  const [dataCategories, setDataCategories] = useState([]);

  const getDataCategories = () => {
    const sampleCategories = [
      {
          TenDM: 'Đồ điện tử',
          AnhDM: 'https://www.cleanipedia.com/images/5iwkm8ckyw6v/p2e3c7e3V9nSuIIlfPdsW/1eb9893e6216a2066186d3db03c78cf8/MS05Ny5qcGc/600w/b%C3%AD-k%C3%ADp-gi%E1%BB%AF-qu%E1%BA%A7n-%C3%A1o-b%E1%BB%81n-%C4%91%E1%BA%B9p-nh%C6%B0-m%E1%BB%9Bi.avif',
          SoLuongSP: 20 // Số lượng sản phẩm trong danh mục
      },
      {
          TenDM: 'Thời trang',
          AnhDM: 'https://www.cleanipedia.com/images/5iwkm8ckyw6v/p2e3c7e3V9nSuIIlfPdsW/1eb9893e6216a2066186d3db03c78cf8/MS05Ny5qcGc/600w/b%C3%AD-k%C3%ADp-gi%E1%BB%AF-qu%E1%BA%A7n-%C3%A1o-b%E1%BB%81n-%C4%91%E1%BA%B9p-nh%C6%B0-m%E1%BB%9Bi.avif',
          SoLuongSP: 30
      },
      {
          TenDM: 'Đồ gia dụng',
          AnhDM: 'https://www.cleanipedia.com/images/5iwkm8ckyw6v/p2e3c7e3V9nSuIIlfPdsW/1eb9893e6216a2066186d3db03c78cf8/MS05Ny5qcGc/600w/b%C3%AD-k%C3%ADp-gi%E1%BB%AF-qu%E1%BA%A7n-%C3%A1o-b%E1%BB%81n-%C4%91%E1%BA%B9p-nh%C6%B0-m%E1%BB%9Bi.avif',
          SoLuongSP: 15
      },
      // Thêm các danh mục khác nếu cần
    ];
  
  setDataCategories(sampleCategories);
  
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
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={IC_Back}
            style={{
              width: 10,
              height: 20,
              marginHorizontal: 20,
              marginVertical: 15,
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            color: CUSTOM_COLOR.Black,
            fontWeight: 'bold',
          }}>
          Categories
        </Text>
      </View>

      <ScrollView
        style={{
          backgroundColor: CUSTOM_COLOR.Alto,
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
          <View style={{width: '100%', height: 50}}/>
        <ItemList
                source={'https://firebasestorage.googleapis.com/v0/b/shoppingapp-ada07.appspot.com/o/images%2Fproduct%2FPhuKien.jpg?alt=media&token=8d72397d-464a-4dfb-9883-05b2df136b93&_gl=1*p1305q*_ga*OTc0NTU2MzEuMTY3OTQ5NTU1MQ..*_ga_CW55HF8NVT*MTY4NTQ3MzQ3NC43MS4xLjE2ODU0NzYwODYuMC4wLjA'}
                namelist={"Áo nam"}
                numberitem={3}
            />
            
    </SafeAreaView>
  );
}


