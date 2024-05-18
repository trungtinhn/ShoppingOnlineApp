
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import {
  IC_Back,
  IC_CheckGreen,
  IC_CheckGrey,
  IC_Location,
  IC_Next,
  IC_Visa,
} from '../../../assets/Customer/icons';
import CUSTOM_COLOR from '../../constants/color';
import ProductCheckOut from '../../components/Customer/ProductCheckout';
import Promotion from '../../components/Customer/Promotion';
import Delivery from '../../components/Customer/Delivery';
import Button from '../../components/Customer/Button';
import { PR_1 } from '../../../assets/Customer/images';
import FONT_FAMILY from '../../constants/font';

function CheckoutScreen({ navigation, route }) {
  //const { itemsCheckout, totalMoney } = route.params;

  //const { delivery, choosePayment, promotion } = route.params;

  const [index, setIndex] = useState(0);

  // const deliveryCharge =
  //   promotion && promotion.Loai === 'MienPhiVanChuyen' ? 0 : 20000;

  //const discount =
    // promotion && promotion.Loai === 'GiamGia'
    //   ? totalMoney * promotion.TiLe
    //   : 5000;

  //const totalOrder = totalMoney + deliveryCharge - discount;

  
  const itemsCheckout = [
    {
      id: 1,
      HinhAnhSP: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
      TenSP: 'Áo thun trắng',
      MauSac: 'Trắng',
      Size: 'M',
      GiaTien: 200000,
      SoLuong: 2,
    },
    {
      id: 2,
      HinhAnhSP: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
      TenSP: 'Quần jeans nam',
      MauSac: 'Xanh',
      Size: 'L',
      GiaTien: 350000,
      SoLuong: 1,
    },
  ];
  
  const promotion = {
    id: 1,
    TenKM: 'Giảm giá 10%',
    HinhAnhKM: 'https://via.placeholder.com/150',
    DonToiThieu: 500000,
    NgayBatDau: '2024-05-01',
    NgayKetThuc: '2024-05-31',
  };
  // const day = promotion ? promotion.NgayKetThuc.toDate().getDate() : null;
  // const month = promotion ? promotion.NgayKetThuc.toDate().getMonth() : null;
  // const year = promotion ? promotion.NgayKetThuc.toDate().getFullYear() : null;
  
  const delivery = {
    TenNguoiMua: 'Nguyễn Văn A',
    SDT: '0987654321',
    PhuongXa: 'Phường 1',
    QuanHuyen: 'Quận Bình Thạnh',
    TinhThanhPho: 'TP.HCM',
    DiaChi: '123 Đường ABC',
  };
  
  const totalMoney = itemsCheckout.reduce((total, item) => total + item.GiaTien * item.SoLuong, 0);
  
  const deliveryCharge = 20000; // Phí vận chuyển
  
  const discount = totalMoney * 0.1; // Giảm giá từ khuyến mãi
  
  const totalOrder = totalMoney + deliveryCharge - discount; 

  const choosePayment = 'CashPayment'

  const [idDonHang, setIdDonHang] = useState();

  const AddDonHang = async () => {
    navigation.navigate('CustomerHomeScreen');

    // Alert.alert('Notification', 'You have placed our order successfully!', [
    //   {
    //     text: 'Cancle',
    //     onPress: () => {
    //       navigation.navigate('HomeScreen')

    //     }
    //   }
    // ])
  };

  const getSoLuongSP = async (maSP) => {
   
  };
  const AddDatHang = async (item, id) => {

  };

  const MoveNext = () => {
    setIndex(index == itemsCheckout.length - 1 ? 0 : index + 1);
  };

  useEffect(() => {
    console.log(itemsCheckout, totalMoney);
  }, [itemsCheckout, totalMoney]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={IC_Back}
            style={{
              width: 10,
              height: 20,
              marginHorizontal: 20,
              marginVertical: 15,
            }}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            color: CUSTOM_COLOR.Black,
            fontWeight: 'bold',
          }}>
          Cart
        </Text>
      </View>

      <ScrollView>
        {itemsCheckout ? (
          <ProductCheckOut
            source={PR_1}
            title={itemsCheckout[index].TenSP}
            color={itemsCheckout[index].MauSac}
            size={itemsCheckout[index].Size}
            price={itemsCheckout[index].GiaTien}
            number={itemsCheckout[index].SoLuong}
            style={{
              marginVertical: 10,
            }}
            show={false}
            onPressDelete={() => MoveNext()}
          />
        ) : null}

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          onPress={() =>
            navigation.navigate('Promotion', {
              itemsCheckout,
              totalMoney,
              delivery,
              choosePayment,
            })
          }>
          <Text
            style={{
              fontSize: 18,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Offers Details
          </Text>
          <Image source={IC_Next} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          {promotion ? (
            <Promotion
              source={promotion.HinhAnhKM}
              title={promotion.TenKM}
              minimum={promotion.DonToiThieu}
              expiry={promotion.NgayKetThuc}
            />
          ) : (
            <Text
              style={{
                fontSize: 17,
              }}>
              Choose promotion
            </Text>
          )}

          <Image source={promotion ? IC_CheckGreen : IC_CheckGrey} />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          onPress={() =>
            navigation.navigate('Delivery', {
              itemsCheckout,
              totalMoney,
              choosePayment,
              promotion,
            })
          }>
          <Text
            style={{
              fontSize: 18,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Delivery Address
          </Text>
          <Image source={IC_Next} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          {delivery ? (
            <Delivery
              name={delivery.TenNguoiMua}
              phoneNumber={delivery.SDT}
              ward={delivery.PhuongXa}
              district={delivery.QuanHuyen}
              city={delivery.TinhThanhPho}
              address={delivery.DiaChi}
              show={false}
              style={{
                width: '90%',
              }}
            />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={IC_Location}
                style={{
                  width: 50,
                  height: 50,
                }}
              />

              <Text
                style={{
                  marginHorizontal: 20,
                  fontSize: 17,
                }}>
                Add your address
              </Text>
            </View>
          )}
          <Image source={delivery ? IC_CheckGreen : IC_CheckGrey} />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          onPress={() =>
            navigation.navigate('PaymentMethod', {
              itemsCheckout,
              totalMoney,
              delivery,
              promotion,
            })
          }>
          <Text
            style={{
              fontSize: 18,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Payment Method
          </Text>
          <Image source={IC_Next} />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={IC_Visa}
              style={{
                width: 50,
                height: 50,
              }}
            />
            {choosePayment ? (
              choosePayment === 'MomoWallet' ? (
                <Text style={{ ...styles.textPayment }}>Momo Wallet</Text>
              ) : choosePayment === 'CashPayment' ? (
                <Text style={{ ...styles.textPayment }}>Cash Payment</Text>
              ) : choosePayment === 'OnlineBanking' ? (
                <Text style={{ ...styles.textPayment }}>Online Banking</Text>
              ) : null
            ) : (
              <Text
                style={{
                  ...styles.textPayment,
                }}>
                Add payment method
              </Text>
            )}
          </View>
          <Image source={choosePayment ? IC_CheckGreen : IC_CheckGrey} />
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 2,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Order{' '}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Subtotal
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            {totalMoney} đ
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Delivery Charge
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            {deliveryCharge} đ
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Discount
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            - {discount} đ
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: CUSTOM_COLOR.SeaBuckthorn,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Total
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: CUSTOM_COLOR.SeaBuckthorn,
              fontFamily: FONT_FAMILY.Medium
            }}>
            {totalOrder} đ
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Button
            color={CUSTOM_COLOR.FlushOrange}
            title="CHECK OUT"
            onPress={
              promotion && delivery && choosePayment
                ? () => AddDonHang()
                : () => {
                  Alert.alert(
                    'Warning',
                    'Please provide enough information!',
                    [
                      {
                        text: 'Cancle',
                      },
                    ],
                  );
                }
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPayment: {
    marginHorizontal: 20,
    fontSize: 17,
  },
});

export default CheckoutScreen;
