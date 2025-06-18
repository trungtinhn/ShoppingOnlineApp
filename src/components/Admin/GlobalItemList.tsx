import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import CUSTOM_COLOR from '../../constants/color';
import {back} from '../../../assets/Admin/icons';

const GlobalItemList = (props: any) => {
  const [isExpanded, setIsExpanded] = useState(false); // Trạng thái mở rộng
  const rotateAnim = useRef(new Animated.Value(0)).current; // Giá trị xoay
  const heightAnim = useRef(new Animated.Value(70)).current; // Giá trị chiều cao

  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1; // Xác định giá trị xoay (0 hoặc 1)
    const newHeight = isExpanded ? 70 : 120; // Chiều cao mới (thu nhỏ hoặc mở rộng)

    Animated.timing(rotateAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(heightAnim, {
      toValue: newHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <Animated.View style={[styles.container, {height: heightAnim}]}>
      <View style={styles.componentContainer}>
        <View style={styles.infoContainer}>
          <Image
            resizeMode="cover"
            source={{uri: props.source}}
            style={styles.image}
          />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{props.namelist}</Text>
            <Text style={styles.productCount}>{props.numberitem} Product</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={props.onEditPress}
            style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleExpand}>
            <Animated.Image
              resizeMode="contain"
              source={back}
              style={[styles.backIcon, {transform: [{rotate}]}]}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isExpanded && (
        <Text style={styles.description}>Mô tả: {props.description}</Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: 'column',
    width: '100%',
    elevation: 5,
    shadowColor: CUSTOM_COLOR.Black,
    backgroundColor: CUSTOM_COLOR.White,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingRight: 20,
    overflow: 'hidden',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  componentContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  }, 
  image: {
    height: 50,
    width: 50,
    marginLeft: 20,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 30,
  },
  name: {
    color: CUSTOM_COLOR.Black,
    fontSize: 18,
  },
  productCount: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginRight: 10,
  },
  editText: {
    color: CUSTOM_COLOR.DarkOrange,
    fontSize: 16,
  },
  backIcon: {
    width: 15,
    height: 15,
  },
  description: {
    marginTop: 10,
    color: CUSTOM_COLOR.Black,
    fontSize: 16,
    textAlign: 'left',
    paddingHorizontal: 20,
  },
});

export default GlobalItemList;
