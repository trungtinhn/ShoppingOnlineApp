import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';


const PromotionButton = (props: any) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
          <Text style={styles.textButton}>{props.text}</Text>
        </TouchableOpacity>
      </View>
    );
  
}

export default PromotionButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginHorizontal: 10,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 63,
    alignSelf: 'center',
    backgroundColor: CUSTOM_COLOR.Sapphire,
  },
  textButton: {
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 20,
    color: CUSTOM_COLOR.White,
  },
});
