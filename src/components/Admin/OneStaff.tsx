import {View, Text, Image} from 'react-native';
import React from 'react';
import {IM_Giay1} from '../../../assets/Admin/images';
import ButtonDetail from './ButtonDetail';
import CUSTOM_COLOR from '../../constants/color';

const OneStaff = (props: any) => {
  return (
    //Loan xu ly phan doi mau nha, tui set san no mau xam
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: CUSTOM_COLOR.LightGray,
        width: '100%',
        height: 80,
      }}>
      <Image
        style={{
          width: 64,
          aspectRatio: 1,
          borderRadius: 55,
          marginTop: 10,
          marginLeft: 20,
        }}
        
        source={IM_Giay1}
        resizeMode="contain"
      />
      <View style={{flexDirection: 'column', marginTop: 12, marginLeft: 15}}>
        <Text style={{color: CUSTOM_COLOR.Black}}>{props.Name}</Text>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text style={{fontWeight: 'bold', color: CUSTOM_COLOR.Black}}>
            Status:
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              marginLeft: 20,
              color: CUSTOM_COLOR.Black,
            }}>
            {props.Status}
          </Text>
        </View>
      </View>
      <View>
        <ButtonDetail
          title="Edit"
          style={{width: 40, height: 35, marginTop: 20, marginLeft: '30%'}}
          onPress={props.onPress}
          color={CUSTOM_COLOR.FlushOrange}
        />
      </View>
    </View>
  );
};

export default OneStaff;
