import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { IM_Shirt, IM_Washing_Machine } from '../../../assets/Customer/images';

interface CustomIconProps {
  icon: string; // URL hoặc URI của hình ảnh icon
  backgroundColor?: string; // Màu nền (mặc định: '#F4F8FF')
  size?: number; // Kích thước nền hình tròn (mặc định: 80)
  text?: string; // Nội dung chữ bên dưới (mặc định: 'Label')
  textColor?: string; // Màu chữ (mặc định: '#1E293B')
}

const CustomIcon: React.FC<CustomIconProps> = ({
  icon,
  backgroundColor = '#F4F8FF',
  size = 70,
  text = 'Label',
  textColor = '#1E293B',
}) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor, width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <Image source={text === 'Thời trang' ? IM_Shirt : IM_Washing_Machine} style={{ width: size / 2, height: size / 2 }} />
      </View>
      <Text style={[styles.text, { color: textColor, fontSize: size / 5 }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 8,
    fontWeight: '500',
  },
});

export default CustomIcon;
