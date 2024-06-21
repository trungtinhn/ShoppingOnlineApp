import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';

import {
  IC_Location,
  IC_Visa,
} from '../../../assets/Customer/icons';
import CUSTOM_COLOR from '../../constants/color';
import ProductCheckOut from '../../components/Customer/ProductCheckout';
import Promotion from '../../components/Customer/Promotion';
import Delivery from '../../components/Customer/Delivery';
import {firebase} from '../../../firebase/firebase';
import FONT_FAMILY from '../../constants/font';
import { BackIcon, CheckFill, Discount, NextRight, PaymentArea } from '../../../assets/Customer/svgs';
import { OrderContext } from '../../context/OrderContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { checkAvailable } from '../../api/ProductApi';
import { checkPromotion } from '../../api/PromotionApi';
import { createOrder } from '../../api/OrderApi';
import fetchPaymentSheetParams from '../../api/PaymentApi';
import { useStripe } from '@stripe/stripe-react-native';
import Button from '../../components/Customer/Button';

function CheckoutScreen({ navigation }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const { promoCode, setPromoCode, address, setAddress, product, setProduct, payment, setPayment } = useContext(OrderContext);

  const [index, setIndex] = useState(0);
  

  const [promotion, setPromotion] = useState(false);

  const [totalMoney, setTotalMoney] = useState(0);
  
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  
  const [discount, setDiscount] = useState(0);
  
  const [totalOrder, setTotalOrder] = useState(0);


  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      setLoading(false);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      AddOrderInServer();
    }
  };
  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams(totalOrder);

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      }
    });
  };

  const HandlePayment = async () => {
    if(payment === 'OnlineBanking'){
      await initializePaymentSheet();
      await openPaymentSheet();
    }else{
      AddOrderInServer();
    }
   
  }
  const AddOrderInServer = async () => {
    const orderData = {
      userId: firebase.auth().currentUser.uid,
      name: address.TenNguoiMua,
      phone: address.SDT, // Số điện thoại của người đặt hàng
      address: address.DiaChi + " " + address.PhuongXa + " " + address.QuanHuyen + " " + address.TinhThanhPho, // Địa chỉ giao hàng
      promotionId: promoCode == null ? null : promoCode._id, // ID của khuyến mãi được áp dụng (nếu có)
      products: product, // Danh sách sản phẩm đơn hàng
      discount: discount, // Giảm giá được áp dụng (nếu có)
      deliveryFees: deliveryCharge, // Phí vận chuyển
      paymentMethod: payment, // Phương thức thanh toán
      totalProduct: totalMoney, // Tổng giá trị đơn hàng
      totalPrice: totalOrder, // Tổng giá trị đơn hàng
      status: 'Confirm' // Trạng thái đơn hàng
    };
    const res = await createOrder({data: orderData});
    setLoading(false)
    if(res.status === 200){
      //Alert.alert('Notification', 'Order successfully!');
      navigation.navigate('ThankScreen');
    }else{
      Alert.alert('Notification', 'Order failed!');
    }
  }


  const handleTotal = () => {
    let total = 0;
    product.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalMoney(total);
    const deliveryCharge = 30000;
    setDeliveryCharge(deliveryCharge);
    const discount = 0;
    const totalOrder = total + deliveryCharge - discount;
    console.log(totalOrder);
    setTotalOrder(totalOrder);
    setDiscount(discount);
    if(promoCode != null){
      if(totalMoney >= promoCode.DonToiThieu){
        const deliveryCharge = promoCode.Loai === 'MienPhiVanChuyen' ? 0 : 30000;
        const discount = promoCode.Loai === 'GiamGia'
            ? totalMoney * promoCode.TiLe
            : 0;
        const totalOrder = totalMoney + deliveryCharge - discount;
        setTotalOrder(totalOrder);
        setDiscount(discount);
        setDeliveryCharge(deliveryCharge);
        setPromotion(true);
      }else{
        //Alert.alert('Notification', 'Does not reach the minimum order value!');
        setPromotion(false);
      }
    }
  };


  const AddDonHang = async () => {
    try{
        let hasUnavailableProduct = false;
        setLoading(true);
        const res = await checkAvailable({data: product});
        if(res.status === 200){
          const data = res.data;
          data.map((item) => {
            if(!item.available){
              Alert.alert('Notification', 'Sản phẩm ' + item.productId.TenSP + ' đã hết hàng. Vui lòng chọn sản phẩm khác!');
              hasUnavailableProduct = true;
            }
          })
          // Nếu có sản phẩm hết hàng, dừng lại
          if (hasUnavailableProduct) {
            setLoading(false);
            return;
          }
          if(promoCode == null){
              console.log('null');
              HandlePayment();
          }else{
              const res = await checkPromotion({id: promoCode._id});
              if(res.status === 200){
                HandlePayment();
              }else{
                Alert.alert('Notification', 'Promotion does not exist or expired!');
                return;
              }
          }
        }else{
          console.log(res);
        }
      }catch(error){
        console.log(error);
      }
    
  };


  const MoveNext = () => {
    setIndex(index == product.length - 1 ? 0 : index + 1);
  };

  useEffect(() => {
    handleTotal();
  }, [product, address, promoCode]);


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
          style={{
            padding: 12,
          }}
          onPress={() => {
            setPromoCode(null);
            navigation.goBack();
          }}>
          <BackIcon/>
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
        {product ? (
          <ProductCheckOut
            source={product[index].image[0]}
            title={product[index].name}
            color={product[index].color}
            size={product[index].size}
            price={product[index].price}
            number={product[index].quantity}
            check={product.length > 1 ? true : false}
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
            navigation.navigate('Promotion')
          }>
          <Text
            style={{
              fontSize: 18,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Offers Details
          </Text>
          <NextRight/>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          {promoCode != null && promotion ? (
            <Promotion
              source={promoCode.HinhAnhKM}
              title={promoCode.TenKM}
              minimum={promoCode.DonToiThieu}
              expiry={formatDate(promoCode.NgayBatDau) + ' - ' + formatDate(promoCode.NgayKetThuc)}
            />
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <PaymentArea>
                  <Discount/>
                </PaymentArea>
                <Text
                  style={{
                    fontSize: 17,
                    marginLeft: 20,
                    fontFamily: FONT_FAMILY.CeraPro
                  }}>
                  Choose promotion
                </Text>
            </View>
            
          )}
          {promoCode && promotion ? (
            <CheckFill fill={CUSTOM_COLOR.Green} />
          ) : (
            <CheckFill fill={CUSTOM_COLOR.LightGray} />
          )}
          
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
            navigation.navigate('Delivery')
          }>
          <Text
            style={{
              fontSize: 18,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Delivery Address
          </Text>
          <NextRight/>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: 20,
          }}>
          {address != null ? (
            <Delivery
              name={address.TenNguoiMua}
              phoneNumber={address.SDT}
              ward={address.PhuongXa}
              district={address.QuanHuyen}
              city={address.TinhThanhPho}
              address={address.DiaChi}
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
                  fontFamily: FONT_FAMILY.CeraPro
                }}>
                Add your address
              </Text>
            </View>
          )}
          {address ? <CheckFill fill={CUSTOM_COLOR.Green} /> : <CheckFill fill={CUSTOM_COLOR.LightGray} />}
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
            navigation.navigate('PaymentMethod')
          }>
          <Text
            style={{
              fontSize: 18,
              color: CUSTOM_COLOR.Black,
              fontFamily: FONT_FAMILY.Medium
            }}>
            Payment Method
          </Text>
          <NextRight/>
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
            {payment ? (
              payment === 'Cash Payment' ? (
                <Text style={{ ...styles.textPayment }}>Cash Payment</Text>
              ) : payment === 'Online Banking' ? (
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
          {payment ? <CheckFill fill={CUSTOM_COLOR.Green} /> : <CheckFill fill={CUSTOM_COLOR.LightGray} />}
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
            {formatCurrency(totalMoney)} đ
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
            {formatCurrency(deliveryCharge)} đ
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
            - {formatCurrency(discount)} đ
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
            {formatCurrency(totalOrder)} đ
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
              address && payment
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
      {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={CUSTOM_COLOR.FlushOrange} />
          </View>
        )}
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
    fontFamily: FONT_FAMILY.CeraPro
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
},
});

export default CheckoutScreen
