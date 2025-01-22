import { View, Text } from 'react-native'
import React from 'react'
import { ArrowRight, Dollar } from '../../../assets/Customer/svgs'
import CUSTOM_COLOR from '../../constants/color'

const PromoionItem = () => {
  return (
    <View style={{width: '100%', padding: 10, display: 'flex', flexDirection: 'row', borderBottomWidth: 0.5, borderColor: CUSTOM_COLOR.LightGray}}>
        <View style={{padding: 4, borderRadius: 20, borderWidth: 1, borderColor: CUSTOM_COLOR.LightGray}}>
            <Dollar width={30} height={30} fill={CUSTOM_COLOR.FlushOrange}/>
        </View>
        <View style={{marginLeft: 10, flex: 5}}>
            <Text style={{fontWeight: 'bold'}}>Khuyến mãi</Text>
            <Text style={{color: CUSTOM_COLOR.Gray}} numberOfLines={1}>Chương trình giảm giá cực sốc đang diễn ra trong Tháng 12</Text>
        </View>

        <View style={{justifyContent: 'center'}}>
            <ArrowRight width={12} height={12} fill={CUSTOM_COLOR.Gray}/>
        </View>
    </View>
  )
}

export default PromoionItem