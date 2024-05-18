import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import BackTo from '../../components/Admin/BackTo';
import OneOrder from '../../components/Admin/OneOrder';
import PerSon from '../../components/Admin/PerSon';
import CUSTOM_COLOR from '../../constants/color';
import Status from '../../components/Admin/Status';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const orders = [
  {
    MaDH: 'DH001',
    TrangThai: 'Confirm',
    Avatar: 'https://example.com/avatar1.jpg',
    TenND: 'Nguyen Van A',
    MaND: 'ND001',
    DatHang: [
      {
        SanPham: {
          HinhAnhSP: ['https://example.com/product1.jpg'],
          TenSP: 'Áo phông nam',
          GiaSP: 250000,
        },
        MauSac: 'Trắng',
        Size: 'L',
        SoLuong: 2,
        ThanhTien: 500000,
      },
      {
        SanPham: {
          HinhAnhSP: ['https://example.com/product2.jpg'],
          TenSP: 'Quần jeans nữ',
          GiaSP: 300000,
        },
        MauSac: 'Xanh',
        Size: 'M',
        SoLuong: 1,
        ThanhTien: 300000,
      },
    ],
  },
  {
    MaDH: 'DH002',
    TrangThai: 'OnWait',
    Avatar: 'https://example.com/avatar2.jpg',
    TenND: 'Tran Thi B',
    MaND: 'ND002',
    DatHang: [
      {
        SanPham: {
          HinhAnhSP: ['https://example.com/product3.jpg'],
          TenSP: 'Giày thể thao',
          GiaSP: 500000,
        },
        MauSac: 'Đen',
        Size: '42',
        SoLuong: 1,
        ThanhTien: 500000,
      },
    ],
  },
  {
    MaDH: 'DH003',
    TrangThai: 'Delivering',
    Avatar: 'https://example.com/avatar3.jpg',
    TenND: 'Le Van C',
    MaND: 'ND003',
    DatHang: [
      {
        SanPham: {
          HinhAnhSP: ['https://example.com/product4.jpg'],
          TenSP: 'Túi xách nữ',
          GiaSP: 700000,
        },
        MauSac: 'Đỏ',
        Size: 'M',
        SoLuong: 1,
        ThanhTien: 700000,
      },
    ],
  },
  {
    MaDH: 'DH004',
    TrangThai: 'Delivered',
    Avatar: 'https://example.com/avatar4.jpg',
    TenND: 'Pham Thi D',
    MaND: 'ND004',
    DatHang: [
      {
        SanPham: {
          HinhAnhSP: ['https://example.com/product5.jpg'],
          TenSP: 'Áo khoác nam',
          GiaSP: 800000,
        },
        MauSac: 'Xám',
        Size: 'XL',
        SoLuong: 1,
        ThanhTien: 800000,
      },
    ],
  },
];

export default function Order({ navigation }) {
  const [confirm, setConfirm] = useState(true);
  const [onWait, setOnWait] = useState(false);
  const [delivering, setDelivering] = useState(false);
  const [delivered, setDelivered] = useState(false);

  const [donHangConfirm, setDonHangConfirm] = useState([]);
  const [donHangOnWait, setDonHangOnWait] = useState([]);
  const [donHangDelivering, setDonHangDelivering] = useState([]);
  const [donHangDelivered, setDonHangDelivered] = useState([]);

  const ConfirmDonHang = async item => {
    // const confirmRef = doc(Firestore, 'DONHANG', item.MaDH);

    // await updateDoc(confirmRef, {
    //   TrangThai: 'OnWait',
    // });

    getDonHangConfirm();
  };

  const OnWaitDonHang = async item => {
    // const confirmRef = doc(Firestore, 'DONHANG', item.MaDH);

    // await updateDoc(confirmRef, {
    //   TrangThai: 'Delivering',
    // });

    getDonHangOnWait();
  };

  const DeliveringDonHang = async item => {
    // const confirmRef = doc(Firestore, 'DONHANG', item.MaDH);

    // await updateDoc(confirmRef, {
    //   TrangThai: 'Delivered',
    // });

    getDonHangDelivering();
  };

  const getUsers = async item => {
    
  };

  const getDatHang = async item => {
    
  };

  const getDonHangConfirm = () => {
    
  };

  const getDonHangOnWait = () => {
    
  };

  const getDonHangDelivering = () => {
    
  };

  const getDonHangDelivered = () => {
    
  };

  useEffect(() => {
    // Phân loại các đơn hàng theo trạng thái
    const confirmOrders = orders.filter(order => order.TrangThai === 'Confirm');
    const onWaitOrders = orders.filter(order => order.TrangThai === 'OnWait');
    const deliveringOrders = orders.filter(order => order.TrangThai === 'Delivering');
    const deliveredOrders = orders.filter(order => order.TrangThai === 'Delivered');

    setDonHangConfirm(confirmOrders);
    setDonHangOnWait(onWaitOrders);
    setDonHangDelivering(deliveringOrders);
    setDonHangDelivered(deliveredOrders);
  }, []);

  if (confirm == true) {
    return (
      <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Order" />
        </View>

        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="Confirm"
            Color={CUSTOM_COLOR.DarkOrange}
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            countProduct={donHangConfirm.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOnWait(true), setConfirm(false);
            }}
            title="On Wait"
            countProduct={donHangOnWait.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivering(true), setConfirm(false);
            }}
            title="Delivering"
            countProduct={donHangDelivering.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivered(true), setConfirm(false);
            }}
            title="Delivered"
            countProduct={donHangDelivered.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <FlatList
            data={donHangConfirm}
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
              //console.log(item)
              return (
                <View style={{ width: '100%' }}>
                  <View
                    style={{ width: '100%', height: 60, flexDirection: 'row' }}>
                    <View
                      style={{
                        width: '75%',
                        height: '100%',
                        justifyContent: 'center',
                      }}>
                      <PerSon
                        avartar={item.Avatar}
                        name={item.TenND}
                        id={item.MaND}
                      />
                    </View>
                    <View
                      style={{
                        width: '25%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DeTailsDelivery', { item });
                        }}
                        style={{
                          backgroundColor: CUSTOM_COLOR.White,
                          width: '95%',
                          height: '75%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                          // borderWidth: 1,
                          // borderColor: CUSTOM_COLOR.DarkOrange,
                        }}>
                        <Text
                          style={{
                            color: CUSTOM_COLOR.DarkOrange,
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <FlatList
                    data={item.DatHang}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                      console.log(item);
                      return (
                        <View>
                          <OneOrder
                            source={item.SanPham.HinhAnhSP[0]}
                            title={item.SanPham.TenSP}
                            price={item.SanPham.GiaSP}
                            number={item.SoLuong}
                            totalPrice={item.ThanhTien}
                            color={item.MauSac}
                            size={item.Size}
                            Code={item.MaDH}
                            onPress={() => {
                              navigation.navigate('DeTailsDelivery');
                            }}
                            PressConfirm={() => { }}
                          />
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        console.log(item);

                        ConfirmDonHang(item);
                      }}
                      style={{
                        backgroundColor: CUSTOM_COLOR.DarkOrange,
                        width: '90%',
                        height: 53,
                        marginHorizontal: '5%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                      }}>
                      <Text
                        style={{
                          color: CUSTOM_COLOR.White,
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.White,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.LightGray,
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  if (onWait == true) {
    return (
      <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Order" />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="Confirm"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setConfirm(true), setOnWait(false);
            }}
            countProduct={donHangConfirm.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="On Wait"
            countProduct={donHangOnWait.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivering(true), setOnWait(false);
            }}
            title="Delivering"
            countProduct={donHangDelivering.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivered(true), setOnWait(false);
            }}
            title="Delivered"
            countProduct={donHangDelivered.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <FlatList
            data={donHangOnWait}
            keyExtractor={item => item.MaDH}
            renderItem={({ item }) => {
              //console.log(item)
              return (
                <View style={{ width: '100%' }}>
                  <View
                    style={{ width: '100%', height: 60, flexDirection: 'row' }}>
                    <View
                      style={{
                        width: '75%',
                        height: '100%',
                        justifyContent: 'center',
                      }}>
                      <PerSon
                        avartar={item.Avatar}
                        name={item.TenND}
                        id={item.MaND}
                      />
                    </View>
                    <View
                      style={{
                        width: '25%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DeTailsDelivery', { item });
                        }}
                        style={{
                          backgroundColor: CUSTOM_COLOR.White,
                          width: '95%',
                          height: '75%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                          // borderWidth: 1,
                          // borderColor: CUSTOM_COLOR.DarkOrange,
                        }}>
                        <Text
                          style={{
                            color: CUSTOM_COLOR.DarkOrange,
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 10 }} />
                  <FlatList
                    data={item.DatHang}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                      console.log(item);
                      return (
                        <View>
                          <OneOrder
                            source={item.SanPham.HinhAnhSP[0]}
                            title={item.SanPham.TenSP}
                            price={item.SanPham.GiaSP}
                            number={item.SoLuong}
                            totalPrice={item.ThanhTien}
                            Code={item.MaDH}
                            onPress={() => {
                              navigation.navigate('DeTailsDelivery');
                            }}
                            PressConfirm={() => { }}
                          />
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        OnWaitDonHang(item);
                      }}
                      style={{
                        backgroundColor: CUSTOM_COLOR.DarkOrange,
                        width: '90%',
                        height: 53,
                        marginHorizontal: '5%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                      }}>
                      <Text
                        style={{
                          color: CUSTOM_COLOR.White,
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.White,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.LightGray,
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  if (delivering == true) {
    return (
      <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Order" />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="Confirm"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setConfirm(true), setDelivering(false);
            }}
            countProduct={donHangConfirm.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOnWait(true), setDelivering(false);
            }}
            title="On Wait"
            countProduct={donHangOnWait.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="Delivering"
            countProduct={donHangDelivering.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivered(true), setDelivering(false);
            }}
            title="Delivered"
            countProduct={donHangDelivered.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <FlatList
            data={donHangDelivering}
            keyExtractor={item => item.MaDH}
            renderItem={({ item }) => {
              //console.log(item)
              return (
                <View style={{ width: '100%' }}>
                  <View
                    style={{ width: '100%', height: 60, flexDirection: 'row' }}>
                    <View
                      style={{
                        width: '75%',
                        height: '100%',
                        justifyContent: 'center',
                      }}>
                      <PerSon
                        avartar={item.Avatar}
                        name={item.TenND}
                        id={item.MaND}
                      />
                    </View>
                    <View
                      style={{
                        width: '25%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DeTailsDelivery', { item });
                        }}
                        style={{
                          backgroundColor: CUSTOM_COLOR.White,
                          width: '95%',
                          height: '75%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                          // borderWidth: 1,
                          // borderColor: CUSTOM_COLOR.DarkOrange,
                        }}>
                        <Text
                          style={{
                            color: CUSTOM_COLOR.DarkOrange,
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 10 }} />
                  <FlatList
                    data={item.DatHang}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                      console.log(item);
                      return (
                        <View>
                          <OneOrder
                            source={item.SanPham.HinhAnhSP[0]}
                            title={item.SanPham.TenSP}
                            price={item.SanPham.GiaSP}
                            number={item.SoLuong}
                            totalPrice={item.ThanhTien}
                            Code={item.MaDH}
                            onPress={() => {
                              navigation.navigate('DeTailsDelivery');
                            }}
                            PressConfirm={() => { }}
                          />
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 60,
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        DeliveringDonHang(item);
                      }}
                      style={{
                        backgroundColor: CUSTOM_COLOR.DarkOrange,
                        width: '90%',
                        height: 53,
                        marginHorizontal: '5%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                      }}>
                      <Text
                        style={{
                          color: CUSTOM_COLOR.White,
                          fontWeight: 'bold',
                          fontSize: 17,
                        }}>
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.White,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.LightGray,
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  if (delivered == true) {
    return (
      <SafeAreaView style={{ backgroundColor: CUSTOM_COLOR.White, flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 30,
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <BackTo onPress={() => navigation.goBack()} Info="My Order" />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 15,
          }}>
          <Status
            title="Confirm"
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setConfirm(true), setDelivered(false);
            }}
            countProduct={donHangConfirm.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setOnWait(true), setDelivered(false);
            }}
            title="On Wait"
            countProduct={donHangOnWait.length}
          />
          <Status
            Color={CUSTOM_COLOR.Black}
            onPress={() => {
              setDelivering(true), setDelivered(false);
            }}
            title="Delivering"
            countProduct={donHangDelivering.length}
          />
          <Status
            botwidth={2}
            borderColor={CUSTOM_COLOR.Red}
            Color={CUSTOM_COLOR.DarkOrange}
            title="Delivered"
            countProduct={donHangDelivered.length}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 10,
            backgroundColor: CUSTOM_COLOR.LightGray,
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: CUSTOM_COLOR.White,
          }}>
          <FlatList
            data={donHangDelivered}
            keyExtractor={item => item.MaDH}
            renderItem={({ item }) => {
              //console.log(item)
              return (
                <View style={{ width: '100%' }}>
                  <View
                    style={{ width: '100%', height: 60, flexDirection: 'row' }}>
                    <View
                      style={{
                        width: '75%',
                        height: '100%',
                        justifyContent: 'center',
                      }}>
                      <PerSon
                        avartar={item.Avatar}
                        name={item.TenND}
                        id={item.MaND}
                      />
                    </View>
                    <View
                      style={{
                        width: '25%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('DeTailsDelivery', { item });
                        }}
                        style={{
                          backgroundColor: CUSTOM_COLOR.White,
                          width: '95%',
                          height: '75%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 15,
                          // borderWidth: 1,
                          // borderColor: CUSTOM_COLOR.DarkOrange,
                        }}>
                        <Text
                          style={{
                            color: CUSTOM_COLOR.DarkOrange,
                            fontWeight: 'bold',
                            fontSize: 15,
                          }}>
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ width: '100%', height: 10 }} />

                  <FlatList
                    data={item.DatHang}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => {
                      console.log(item);
                      return (
                        <View>
                          <OneOrder
                            source={item.SanPham.HinhAnhSP[0]}
                            title={item.SanPham.TenSP}
                            price={item.SanPham.GiaSP}
                            number={item.SoLuong}
                            totalPrice={item.ThanhTien}
                            color={item.MauSac}
                            size={item.Size}
                          />
                        </View>
                      );
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.White,
                    }}
                  />
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                      backgroundColor: CUSTOM_COLOR.LightGray,
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({});
