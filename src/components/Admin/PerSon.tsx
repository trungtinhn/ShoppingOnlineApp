import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import FONT_FAMILY from '../../constants/font';
import CUSTOM_COLOR from '../../constants/color';
const PerSon = (props: any) => {
  return (
    <View
      style={{
        width: '100%',
        borderBottomWidth: 0.5,
        borderColor: CUSTOM_COLOR.LightGray,
        flexDirection: 'row',
      }}>
      <Image
        source={{uri: props.avartar}}
        style={{
          width: 60,
          aspectRatio: 1,
          borderRadius: 55,
          marginVertical: 10,
          marginLeft: 20,
        }}
        resizeMode="cover"
      />
      <View style={{flexDirection: 'column', marginLeft: 10, marginTop: 13}}>
        <Text style={{fontWeight: 'bold', fontFamily: FONT_FAMILY.Bold, color: CUSTOM_COLOR.Black, fontSize: 18}}>{props.name}</Text>
        <Text style={{marginTop: 1, fontWeight: 'bold'}}>Customer</Text>
      </View>
    </View>
  );
};

export default PerSon;

const styles = StyleSheet.create({});
