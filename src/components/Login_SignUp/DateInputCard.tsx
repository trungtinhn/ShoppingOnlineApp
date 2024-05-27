import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CUSTOM_COLOR from '../../constants/color'
import Size from '../../constants/size'
import FONT_FAMILY from '../../constants/font'
import DateTimePicker from '@react-native-community/datetimepicker';
const DateInputCard = (props: any) => {
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [birth, setBirth] = useState('01/01/2023');
    const handleDateChange = (event: any, selected: any) => {
        const currentDate = selected;
        setShowPicker(false);
    
        let tempDate = new Date(currentDate);
        let fDate =
          tempDate.getDate() +
          '/' +
          (tempDate.getMonth() + 1) +
          '/' +
          tempDate.getFullYear();
    
        //console.log('Date of birth: ', fDate);
        setBirth(fDate);
        setDate(selected);
        props.onDateChange(currentDate);
      };
    
  return (
    <View style={styles.container}>
    <Text style={styles.titleStyle}>{props.title}</Text>

    <View style={styles.dateContainer}>
        <TouchableOpacity
            style={styles.dateStyle}
                onPress={() => {
                  setShowPicker(true);
                }}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.Semibold,
                    fontSize: 15,
                    color: CUSTOM_COLOR.Black,
                    justifyContent: 'center',
                    
                  }}>
                  {' '}
                  {birth}
                </Text>
              </TouchableOpacity>
              {showPicker && (
                <DateTimePicker
                  value={date}
                  mode="date" // Can be "date", "time", or "datetime"
                  display="spinner" // Can be "default", "spinner", or "calendar"
                  onChange={handleDateChange}
                />
              )}
        </View>
  </View>
  )
}

export default DateInputCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
      titleStyle: {
        fontFamily: FONT_FAMILY.Medium,
        fontSize: 20,
        color: CUSTOM_COLOR.Black,
      },
      dateContainer: {
        width: '100%',
        height: '50%',
        backgroundColor: CUSTOM_COLOR.White,
        borderRadius: Size.BorderRadius,
        borderWidth: Size.BorderWidthThink,
        borderColor: CUSTOM_COLOR.Sliver,
        flexDirection: 'row',
        alignItems: 'center',
        top: '1%'
      },
      dateStyle: {
        width: '100%',
        height: '100%',
        paddingHorizontal: '5%',
        justifyContent: 'center',
      },
})