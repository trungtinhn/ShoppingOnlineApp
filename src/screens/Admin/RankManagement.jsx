import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import RankCard from '../../components/Admin/RankCard';
import {getAllRankRules} from '../../api/RankRulesApi';
import { useFocusEffect } from '@react-navigation/native';
import CUSTOM_COLOR from '../../constants/color';
import { Image, Text } from 'react-native-elements';
import { IC_Back } from '../../../assets/Customer/icons';

export default function RankManagement({navigation}) {
  const [data, setData] = useState([]);

  const getRankData = async () => {
    const res = await getAllRankRules();
    if (res.status === 200) {
      setData(res.data);
    } else {
      console.log(res);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getRankData();
    }, [])
  )
  useEffect(() => {
    getRankData();
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
                width: 20,
                height: 20,
                marginHorizontal: 20,
                marginVertical: 15,
              }}
              resizeMode= "contain"
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              color: CUSTOM_COLOR.Black,
              fontWeight: 'bold',
            }}>
            Rank Management
          </Text>
        </View>
      <View style={{flex: 1, padding: 10}}>
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <RankCard
              rank={item.rank}
              minOrderValue={item.minOrderValue}
              maxOrderValue={item.maxOrderValue}
              description={item.description}
              benefits={item.benefits}
              onPress={() => navigation.navigate('EditRankRule', {item})}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
