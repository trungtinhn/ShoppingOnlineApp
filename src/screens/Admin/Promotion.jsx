import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { IC_Back } from '../../../assets/Admin/icons'
import dayjs from 'dayjs';
import PromotionButton from '../../components/Admin/PromotionButton';
import CUSTOM_COLOR from '../../constants/color';
import PromotionCard from '../../components/Admin/PromotionCard';
import { getAllPromotions } from '../../api/PromotionApi';
const sampleDataPromotion = [
  {
    StartDate: new Date('2023-01-01T00:00:00Z'),
    EndDate: new Date('2023-01-31T23:59:59Z'),
    PromotionImage: 'https://example.com/image1.jpg',
    PromotionName: 'New Year Sale',
    Rate: 0.2,
    DonToiThieu: 100,
    Type: 'Discount',
  },
  {
    StartDate: new Date('2023-02-01T00:00:00Z'),
    EndDate: new Date('2023-02-14T23:59:59Z'),
    PromotionImage: 'https://example.com/image2.jpg',
    PromotionName: 'Valentine Special',
    Rate: 0.3,
    DonToiThieu: 50,
    Type: 'Discount',
  },
  {
    StartDate: new Date('2023-03-01T00:00:00Z'),
    EndDate: new Date('2023-03-31T23:59:59Z'),
    PromotionImage: 'https://example.com/image3.jpg',
    PromotionName: 'Spring Sale',
    Rate: 0.15,
    DonToiThieu: 75,
    Type: 'Discount',
  },
];

function Promotion({navigation}){
  const [dataPromotion, setDataPromotion] = useState([]);

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
              const timestampBD = item.StartDate;
              const dateBD = dayjs(timestampBD);

              const dayBD = dateBD.date();
              const monthBD = dateBD.month() + 1;
              const yearBD = dateBD.year();

              const timestampKT = item.EndDate;
              const dateKT = dayjs(timestampKT);

              const dayKT = dateKT.date();
              const monthKT = dateKT.month() + 1;
              const yearKT = dateKT.year();

              console.log(item);
              return (
                <PromotionCard
                  source={item.PromotionImage}
                  name={item.PromotionName}
                  discount={item.Rate * 100}
                  minimum={item.DonToiThieu}
                  start={`${dayBD}/${monthBD}/${yearBD}`}
                  end={`${dayKT}/${monthKT}/${yearKT}`}
                  type={item.Type}
                  onPress={() => navigation.navigate('EditPromotion', { item })}
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
