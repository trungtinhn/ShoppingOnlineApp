import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import dayjs from 'dayjs';
import CUSTOM_COLOR from '../../constants/color';
import GlobalPromotionCard from '../../components/Admin/GlobalPromotionCard';
import {getAllPromotions} from '../../api/PromotionApi';
import PromotionButton from '../../components/Admin/PromotionButton';
import { IC_Back } from '../../../assets/Customer/icons';
import { useFocusEffect } from '@react-navigation/native';


function GlobalPromotion({navigation}) {
  const [activeTab, setActiveTab] = useState('On_Going');
  const [dataPromotion, setDataPromotion] = useState([]);
  const [fillterPromotion, setFillterPromotion] = useState([]);

  const getDataPromotion = async () => {
    const data = await getAllPromotions();
    setDataPromotion(data.data);
  };

  const filterPromotions = () => {
    const filtered = [];
    try {
      for (const promotion of dataPromotion) {
        const status = getPromotionStatus({
          start: promotion.startDate,
          end: promotion.endDate,
        });
        switch (activeTab) {
          case 'On_Going':
            if (status === 'On Going') filtered.push(promotion);
            break;
          case 'Coming_Soon':
            if (status === 'Coming Soon') filtered.push(promotion);
            break;
          case 'Ended':
            if (status === 'Ended') filtered.push(promotion);
            break;
        }
      }
      setFillterPromotion(filtered);
    } catch (error) {
      console.error('Error filtering promotion:', error);
    }
  };

  useEffect(() => {
    getDataPromotion();
  }, []);

  useEffect(() => {
    filterPromotions();
  }, [activeTab, dataPromotion]);
  useFocusEffect(
    React.useCallback(() => {
      getDataPromotion();
    }, [])
  )
  const TabBar = () => (
    <View style={styles.tabContainer}>
      {['On_Going', 'Coming_Soon', 'Ended'].map(tab => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => {
            setActiveTab(tab);
          }}>
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab.replace('_', ' ')}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  const getPromotionStatus = ({start, end}) => {
    const currentDate = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (currentDate < startDate) {
      return 'Coming Soon';
    } else if (currentDate > endDate) {
      return 'Ended';
    } else {
      return 'On Going';
    }
  };
  return (
    <SafeAreaView style={styles.container}>
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
            Global Promotions
          </Text>
        </View>
      <TabBar />
      <View style={styles.listViewContainer}>
        <FlatList
          data={fillterPromotion}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            const timestampBD = item.startDate;
            const dateBD = dayjs(timestampBD);

            const dayBD = dateBD.date();
            const monthBD = dateBD.month() + 1;
            const yearBD = dateBD.year();

            const timestampKT = item.endDate;
            const dateKT = dayjs(timestampKT);

            const dayKT = dateKT.date();
            const monthKT = dateKT.month() + 1;
            const yearKT = dateKT.year();

            return (
              <GlobalPromotionCard
                source={item.promotionImage}
                name={item.promotionName}
                discount={item.rate * 100}
                minimum={item.minimumOrder}
                start={`${dayBD}/${monthBD}/${yearBD}`}
                end={`${dayKT}/${monthKT}/${yearKT}`}
                type={item.type}
                onPress={() =>
                  navigation.navigate('EditGlobalPromotion', {item})
                }
              />
            );
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <PromotionButton
          type="secondary"
          text="Add new"
          onPress={() => {
            navigation.navigate('AddGlobalPromotion');
          }}
        />
      </View>
    </SafeAreaView>
  );
}
export default GlobalPromotion;

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
    justifyContent: 'space-between',
  },
  listViewContainer: {
    width: '100%',
    height: '80%',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: CUSTOM_COLOR.FlushOrange,
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  buttonContainer: {
    width: '90%',
    height: 55,
    color: CUSTOM_COLOR.FlushOrange,
    marginHorizontal: '5%',
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
