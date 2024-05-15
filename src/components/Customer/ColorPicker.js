import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ColorPicker = ({ colors }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textLarge}> Màu sắc hàng hóa: </Text>
      {colors.map((color, index) => (
        <View
          key={index}
          style={[styles.colorCircle, { backgroundColor: color, borderColor: color === 'black' ? 'orange' : 'transparent' }]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
  },
  textLarge: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  colorCircle: {
    height: 20,
    width: 20,
    borderRadius: 50,
    borderWidth: 2,
  },
});

export default ColorPicker;
