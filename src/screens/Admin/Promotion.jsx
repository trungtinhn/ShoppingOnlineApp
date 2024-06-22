import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';

import { IC_Back } from '../../../assets/Admin/icons'
import dayjs from 'dayjs';
import PromotionButton from '../../components/Admin/PromotionButton';
import CUSTOM_COLOR from '../../constants/color';
import PromotionCard from '../../components/Admin/PromotionCard';
import { getAllPromotions, deletePromotion  } from '../../api/PromotionApi';
import { useFocusEffect } from '@react-navigation/native';

function Promotion({navigation}){
  const [dataPromotion, setDataPromotion] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getDataPromotion();
    }, []),
  );
  const handleDelete = (item) => {
    Alert.alert(
      'Confirm Delete',
      `Do you want to delete the promotion "${item.TenKM}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const res = await deletePromotion(item._id);
            getDataPromotion();
          },
        },
      ],
      { cancelable: false }
    );
  };
  const getDataPromotion = async () => {
    const dataPromotion = await getAllPromotions();
    setDataPromotion(dataPromotion.data);
    // const q = query(collection(Firestore, 'KHUYENMAI'));

    // const unsubscribe = onSnapshot(q, querySnapshot => {
    //   const data = [];
    //   querySnapshot.forEach(doc => {
    //     data.push(doc.data());
    //   });
    //   setDataPromotion(data);
    // });
  };

  useEffect(() => {
    getDataPromotion();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', height: 10 }} />
      <>
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
              resizeMode="stretch"
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              color: CUSTOM_COLOR.Black,
              fontWeight: 'bold',
            }}>
            Promotions
          </Text>
        </View>
      </>

      <View style={{ width: '100%', height: 5 }} />

      <>
        <View style={styles.listViewContainer}>
          <FlatList
            data={dataPromotion}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              const timestampBD = item.NgayBatDau;
              const dateBD = dayjs(timestampBD);

              const dayBD = dateBD.date();
              const monthBD = dateBD.month() + 1;
              const yearBD = dateBD.year();

              const timestampKT = item.NgayKetThuc;
              const dateKT = dayjs(timestampKT);

              const dayKT = dateKT.date();
              const monthKT = dateKT.month() + 1;
              const yearKT = dateKT.year();

              console.log(item);
              return (
                <PromotionCard
                  source={item.HinhAnhKM}
                  name={item.TenKM}
                  discount={item.TiLe * 100}
                  minimum={item.DonToiThieu}
                  start={`${dayBD}/${monthBD}/${yearBD}`}
                  end={`${dayKT}/${monthKT}/${yearKT}`}
                  type={item.Loai}
                  onPress={() => navigation.navigate('EditPromotion', { item })}
                  onLongPress={() => handleDelete(item)}
                />
              );
            }}
          />
        </View>
      </>

      <View style={{ width: '100%', height: 10 }} />

      <>
        <View style={styles.buttonContainer}>
          <PromotionButton
            type="secondary"
            text="Add new"
            onPress={() => {
              navigation.navigate('AddPromotion');
            }}
          />
        </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  headerContainer: {
    width: '90%',
    height: 60,
    marginHorizontal: '5%',
  },
  listViewContainer: {
    width: '100%',
    height: '75%',
  },
  buttonContainer: {
    width: '90%',
    height: 55,
    marginHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Promotion;
