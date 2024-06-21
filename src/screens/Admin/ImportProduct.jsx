import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import CustomHeader from '../../components/Admin/CustomHeader';
import PromotionButton from '../../components/Admin/PromotionButton';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import {Image} from 'react-native-elements';
import {updateProduct} from '../../api/ProductApi';

function ImportProduct({navigation, route}) {
  const {item} = route.params;
  const [quantity, setQuantity] = useState(0);
  const [types, setTypes] = useState(item.Type);

  const isNumeric = input => {
    return /^-?\d+$/.test(input);
  };

  const KiemTraNhapLieu = () => {
    if (isNumeric(quantity)) return true;
    return false;
  };

  const getNewAmount = () => {
    let totalQuantity = 0;
    types.forEach(item => {
      totalQuantity += item.quantity;
    });
    setQuantity(totalQuantity);
  };

  const CapNhatSoLuong = async () => {
    if (!KiemTraNhapLieu()) {
      Alert.alert(
        'Notification',
        'Please fill in the information accurately!',
        [{text: 'OK', style: 'cancel'}],
      );
      return;
    }
    getNewAmount();
    const productData = {
      GiaGoc: item.GiaGoc,
      GiaGiam: item.GiaGiam,
      HinhAnhSP: item.HinhAnhSP,
      MaDM: item.MaDM,
      MauSac: item.MauSac,
      Size: item.Size,
      Type: types,
      SoLuongSP: quantity,
      TenSP: item.TenSP,
      MoTaSP: item.MoTaSP,
      TrangThai: item.TrangThai,
      Trending: item.Trending,
      Onsale: item.Onsale,
      TiLeKM: item.TiLeKM,
    };
    const res = await updateProduct({productId: item._id, data: productData});
    if (res.status === 200) {
      Alert.alert('Notification', 'Successfully added product quanity!', [
        {text: 'OK', onPress: () => navigation.goBack(), style: 'cancel'},
      ]);
    } else {
      console.log(res.error);
    }
  };

  const updateQuantity = (itemToUpdate, newQuantity) => {
    if (newQuantity) {
      setTypes(prevTypes =>
        prevTypes.map(item =>
          item._id === itemToUpdate._id
            ? {...item, quantity: newQuantity}
            : item,
        ),
      );
    } else {
      setTypes(prevTypes =>
        prevTypes.map(item =>
          item._id === itemToUpdate._id ? {...item, quantity: 0} : item,
        ),
      );
    }
  };

  useEffect(() => {
    getNewAmount();
  }, [types]);

  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: 60}}>
        <CustomHeader
          onPress={() => navigation.goBack()}
          title="Product/ Import product"
        />
      </View>
      <View style={styles.headerContainer}>
        <Image source={{uri: item.HinhAnhSP[0]}} style={styles.productImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.productName}>{item.TenSP}</Text>
          <Text style={styles.totalQuantity}>Total Quantity: {quantity}</Text>
        </View>
      </View>
      <FlatList
        data={types}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text}> Màu sắc: </Text>
                <View
                  style={[styles.colorBox, {backgroundColor: item.color}]}
                />
              </View>
              <Text style={styles.text}>Kích thước: {item.size}</Text>
            </View>
            <TextInput
              style={styles.input}
              value={String(item.quantity)}
              onChangeText={text => updateQuantity(item, parseInt(text, 10))}
              keyboardType="numeric"
            />
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <PromotionButton
          type="secondary"
          text="Save"
          onPress={() => {
            CapNhatSoLuong();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  headerTextContainer: {
    marginLeft: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    width: 200, 
  },
  totalQuantity: {
    fontSize: 16,
    marginTop: 10,
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  colorBox: {
    width: 30,
    height: 30,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: CUSTOM_COLOR.Gray,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  comboxContainer: {
    width: '100%',
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '90%',
    height: 60,
    marginHorizontal: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImportProduct;
