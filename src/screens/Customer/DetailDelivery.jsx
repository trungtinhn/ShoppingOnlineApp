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

export default function DeTailDelivery({navigation, route}) {
  const {item} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isLoading) {
      
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
                    fontFamily: FONT_FAMILY.CeraPro,
                    marginLeft: 5,
                    fontSize: 20,
                  }}>
                  Address
                </Text>
              </View>
            </View>
            <View style={{marginLeft: 50, marginTop: 5, marginRight: 20}}>
              <Text>{item.TenND}</Text>
              <Text>{item.phone}</Text>
              {!isLoading && (
                <Text>{item.address}</Text>
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
                    fontFamily: FONT_FAMILY.CeraPro,
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
                  Payment Method:
                </Text>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginRight: 10,
                  }}>
                  {item.paymentMethod}
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
                  Total Product:
                </Text>
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontWeight: 'bold',
                    marginRight: 10,
                  }}>
                  {item.totalProduct} VND
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
                  {item.deliveryFees} VND
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
                  {item.discount} VND
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
                  {item.totalPrice} VND
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
            <PerSon avartar={item.Avatar} name={item.TenND} id={item.userId} />

            <View>
              {item.products.map((product, index) => {
                return (
                  <View key={index}>
                    <OneOrder
                      source={product.image[0]}
                      title={product.name}
                      price={product.price}
                      number={product.quantity}
                      color={product.color}
                      size={product.size}
                      totalPrice={product.price * product.quantity}
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
