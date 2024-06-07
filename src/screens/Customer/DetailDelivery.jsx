import { useState, useEffect } from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Address, Payment } from '../../../assets/Admin/icons';
import BackTo from '../../components/Admin/BackTo';
import OneOrder from '../../components/Admin/OneOrder';
import PerSon from '../../components/Admin/PerSon';
import CUSTOM_COLOR from '../../constants/color';
import Size from '../../constants/size';
import { BackIcon, Location, LocationFill, PaymentFill } from '../../../assets/Customer/svgs';
import FONT_FAMILY from '../../constants/font';
import Button from '../../components/Customer/Button';
const url = "https://firebasestorage.googleapis.com/v0/b/shoppingapp-a20a4.appspot.com/o/images%2Fproducts%2Fproduct_2.jpg?alt=media&token=3d347bb8-2e49-49c5-b8c7-5ea6f7168f89"
const mockData = {
  TenND: 'Trung Tinh',
  SDT: '0704408389',
  DiaChi: '140/10 Dinh Bo Linh',
  PhuongXa: 'Phuong 26',
  QuanHuyen: 'Binh Thanh',
  TinhThanhPho: 'Ho Chi Minh',
  Avatar: url, // URL hình đại diện
  MaND: '123456',
  DatHang: [
    {
      SanPham: {
        HinhAnhSP: [
          url,
          url,
        ],
        TenSP: 'Áo thun thời trang',
        GiaSP: 200000,
      },
      SoLuong: 2,
      MauSac: 'Đỏ',
      Size: 'L',
      ThanhTien: 400000,
    },
    {
      SanPham: {
        HinhAnhSP: [
          url,
          url,
        ],
        TenSP: 'Quần jeans nam',
        GiaSP: 500000,
      },
      SoLuong: 1,
      MauSac: 'Xanh',
      Size: 'M',
      ThanhTien: 500000,
    },
  ],
  TamTinh: 900000,
  PhiVanChuyen: 30000,
  GiamGia: 50000,
  TongTien: 880000,
};

// Thay thế `item` trong mã của bạn bằng `mockData`
export default function DeTailDelivery({navigation}) {
  const [chatUser, setChatUser] = useState(mockData.TenND);
  const [address, setAddress] = useState({
    DiaChi: mockData.DiaChi,
    PhuongXa: mockData.PhuongXa,
    QuanHuyen: mockData.QuanHuyen,
    TinhThanhPho: mockData.TinhThanhPho,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading) {
      console.log(address);
    }
  }, [isLoading]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: CUSTOM_COLOR.White,
        width: '100%',
        height: Size.DeviceHeight,
        flexDirection: 'column',
      }}>
      <View style ={{
                flexDirection: 'row', 
                alignItems: 'center',
            }}>
                <TouchableOpacity 
                    style = {{
                        padding: 20,
                    }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <BackIcon fill={CUSTOM_COLOR.FlushOrange}></BackIcon>
                </TouchableOpacity>
              
                <Text style ={{
                    fontSize: 20,
                    color: CUSTOM_COLOR.Black, 
                    fontFamily: FONT_FAMILY.Bold,
                }}>Order/Detail</Text>
            </View>
      <View
        style={{
          width: '100%',
          height: 10,
          backgroundColor: CUSTOM_COLOR.LightGray,
        }}
      />
      <View style={{width: '100%', height: '80%'}}>
        <ScrollView style={{flex: 1}}>
          <View style={{width: '100%', flexDirection: 'column', marginTop: 10}}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                height: 30,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <LocationFill
                  style={{width: 26, height: 26, marginLeft: 18}}
                />
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    marginLeft: 5,
                    fontSize: 20,
                  }}>
                  Address
                </Text>
              </View>
            </View>
            <View style={{marginLeft: 50, marginTop: 5, marginRight: 20}}>
              <Text>{mockData.TenND}</Text>
              <Text>{mockData.SDT}</Text>
              {!isLoading && (
                <Text>{`${address.DiaChi}, ${address.PhuongXa}, ${address.QuanHuyen}, ${address.TinhThanhPho}`}</Text>
              )}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 10,
              marginTop: 10,
              backgroundColor: CUSTOM_COLOR.LightGray,
            }}
          />
          <View style={{width: '100%', flexDirection: 'column', marginTop: 10}}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                height: 30,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <PaymentFill
                  style={{width: 26, height: 26, marginLeft: 18}}
                />
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    marginLeft: 5,
                    fontSize: 20,
                  }}>
                  Payment
                </Text>
              </View>
            </View>
            <View style={{marginLeft: 30, marginTop: 5, marginRight: 20}}>
              <View
                style={{
                  width: '100%',
                  height: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginLeft: 20,
                  }}>
                  Provisional:
                </Text>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginRight: 10,
                  }}>
                  {mockData.TamTinh} VND
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginLeft: 20,
                  }}>
                  Delivery fee:
                </Text>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginRight: 10,
                  }}>
                  {mockData.PhiVanChuyen} VND
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginLeft: 20,
                  }}>
                  Discount:
                </Text>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginRight: 10,
                  }}>
                  {mockData.GiamGia} VND
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 25,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginLeft: 20,
                  }}>
                  Total:{' '}
                </Text>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginRight: 10,
                  }}>
                  {mockData.TongTien} VND
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 10,
              marginTop: 20,
              backgroundColor: CUSTOM_COLOR.LightGray,
            }}
          />
          <View>
            <PerSon avartar={mockData.Avatar} name={mockData.TenND} id={mockData.MaND} />

            <View>
              {mockData.DatHang.map((product, index) => {
                return (
                  <View key={index}>
                    <OneOrder
                      source={product.SanPham.HinhAnhSP[0]}
                      title={product.SanPham.TenSP}
                      price={product.SanPham.GiaSP}
                      number={product.SoLuong}
                      color={product.MauSac}
                      size={product.Size}
                      totalPrice={product.ThanhTien}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
       <Button title="Contact Seller" color={CUSTOM_COLOR.FlushOrange} onPress={() => {}}/>
      </View>
    </SafeAreaView>
  );
}
