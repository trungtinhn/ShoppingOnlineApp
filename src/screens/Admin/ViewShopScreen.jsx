import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CUSTOM_COLOR from '../../constants/color';
import scale from '../../constants/responsive';
import SortDropdown from '../../components/Admin/SortDropdown';
import ProductView from '../../components/Customer/ProductView';
import ItemList from '../../components/Admin/ItemList';
import { backto } from '../../../assets/Admin/icons';
import { PR_1, PR_2 } from '../../../assets/Customer/images';

export const Acount = {
  name: 'Nguyen Trung Tinh',
  avartar:
    'https://icdn.dantri.com.vn/thumb_w/660/2021/09/24/lucasweibo-1632498824939.jpeg',
  id: '21520115',
  address: 'Binh Tan, Ho Chi Minh',
  phone: '0704408389',
  sex: 'male',
  day: '16/12/2003',
  background:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9z5m7BtaVEQCqDkL5UI2QrBqr1EiCI6-YXA&usqp=CAU',
};

export default function ViewShopScreen({navigation}) {
  const avatar = 'https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png';
  const [detail, setdetail] = useState(false);
  const [product, setproduct] = useState(true);
  const items = [
    {
      TenSP: 'Sản phẩm 1',
      GiaSP: 50,
      HinhAnhSP: [PR_1, PR_1],
      // Các thông tin khác nếu cần
    },
    {
      TenSP: 'Sản phẩm 2',
      GiaSP: 75,
      HinhAnhSP: [PR_2, PR_2],
      // Các thông tin khác nếu cần
    },
    // Các mục sản phẩm khác có thể được thêm vào đây
  ];
  const dataCategory = [
    {
      AnhDM: avatar,
      TenDM: 'Danh mục 1',
      SoLuongSP: 10,
      // Các thông tin khác nếu cần
    },
    {
      AnhDM: avatar,
      TenDM: 'Danh mục 2',
      SoLuongSP: 5,
      // Các thông tin khác nếu cần
    },
    // Các mục danh sách sản phẩm khác có thể được thêm vào đây
  ];
  
    if (product == true && detail == false) {
        return (
          <SafeAreaView
            style={{
              backgroundColor: CUSTOM_COLOR.White,
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: 180,
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: CUSTOM_COLOR.LavenderBlush,
              }}>
              <View style={{width: '100%', height: 10}} />
              <View style={{width: '90%', height: 50, marginHorizontal: '5%'}}>
                {/* <Search onSearch={handleSearch} /> */}
              </View>
              <Image
                style={{
                  width: scale(72),
                  height: scale(72),
                  aspectRatio: 1,
                  borderRadius: 55,
                  marginTop: 5,
                }}
                source={{uri: Acount.avartar}}
                resizeMode="contain"
              />
              <Text
                style={{
                  color: CUSTOM_COLOR.Black,
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 2,
                }}>
                FAUGET
              </Text>
            </View>
            <View style={{width: '100%', height: 40, flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  width: '50%',
                  height: '100%',
                  borderBottomWidth: 2,
                  borderColor: CUSTOM_COLOR.Red,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginTop: 5,
                    color: CUSTOM_COLOR.DarkOrange,
                    fontSize: 20,
                  }}>
                  Product
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setproduct(false)}
                style={{
                  width: '50%',
                  height: '100%',
                  alignItems: 'center',
                  //color: CUSTOM_COLOR.Black,
                }}>
                <Text style={{marginTop: 5, fontSize: 20}}>List Item</Text>
              </TouchableOpacity>
            </View>
            {/* <SortDropdown onSelectSort={handleSort} /> */}
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginTop: 14,
              }}
            />
            <View style={{width: '100%', height: '90%', flex: 1}}>
              <FlatList
                nestedScrollEnabled={true}
                data={items}
                numColumns={2}
                renderItem={({item}) => {
                  return (
                    //<TouchableOpacity
                    //  onPress={() => navigation.navigate('ViewShop2')}
                    //style = {{
                    //flexDirection: 'row',
                    //justifyContent: 'space-around'
                    // }}>
                    <ProductView
                      onPress={() => {
                        navigation.navigate('ViewShopProduct', {item});
                      }}
                      source={item.HinhAnhSP[0]}
                      title={item.TenSP}
                      price={item.GiaSP}
                    />
                  );
                }}
              />
            </View>
          </SafeAreaView>
        );
      } else {
        if (product == false && detail == false) {
          return (
            <SafeAreaView
              style={{
                backgroundColor: CUSTOM_COLOR.White,
                width: '100%',
                height: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  height: 180,
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: CUSTOM_COLOR.LavenderBlush,
                }}>
                <View style={{width: '100%', height: 10}} />
                <View style={{width: '90%', height: 50, marginHorizontal: '5%'}}>
                  {/* <Search onSearch={handleSearch} /> */}
                </View>
                <Image
                  style={{
                    width: scale(72),
                    height: scale(72),
                    aspectRatio: 1,
                    borderRadius: 55,
                    marginTop: 5,
                  }}
                  source={{uri: Acount.avartar}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 2,
                  }}>
                  FAUGET
                </Text>
              </View>
              <View style={{width: '100%', height: 40, flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => setproduct(true)}
                  style={{width: '50%', height: '100%', alignItems: 'center'}}>
                  <Text
                    style={{marginTop: 5, fontSize: 20, color: CUSTOM_COLOR.Black}}>
                    Product
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: '50%',
                    height: '100%',
                    borderBottomWidth: 2,
                    borderColor: CUSTOM_COLOR.Red,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      marginTop: 5,
                      color: CUSTOM_COLOR.DarkOrange,
                      fontSize: 20,
                    }}>
                    List Item
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '100%', height: '65%'}}>
                <FlatList
                  data={dataCategory}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        style={{
                          flexDirection: 'row',
                          //justifyContent: 'space-around'
                        }}>
                        <ItemList
                          source={item.AnhDM}
                          namelist={item.TenDM}
                          numberitem={item.SoLuongSP}
                          onPress={() =>
                            navigation.navigate('ViewDetailsinList', {item})
                          }
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </SafeAreaView>
          );
        } else {
          return (
            <SafeAreaView
              style={{
                backgroundColor: CUSTOM_COLOR.White,
                width: '100%',
                height: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  height: 180,
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: CUSTOM_COLOR.LavenderBlush,
                }}>
                {/* <Search onSearch={handleSearch} /> */}
                <Image
                  style={{
                    width: scale(72),
                    height: scale(72),
                    aspectRatio: 1,
                    borderRadius: 55,
                    marginTop: 5,
                  }}
                  source={{uri: imageUrl}}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: CUSTOM_COLOR.Black,
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 2,
                  }}>
                  FAUGET
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 30,
                  flexDirection: 'row',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => setdetail(false)}
                  style={{width: 17, height: 17, marginLeft: 18, marginTop: 5}}>
                  <Image
                    resizeMode="contain"
                    source={backto}
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
                <Text
                  style={{color: CUSTOM_COLOR.Black, fontSize: 18, marginLeft: 10}}>
                  List Item
                </Text>
              </View>
              {/* <SortDropdown onSelectSort={handleSort} /> */}
              <View>
                <FlatList
                  horizontal={false}
                  data={dataCategories}
                  key={2}
                  numColumns={2}
                  renderItem={({item}) => {
                    return (
                      <ProductView
                        onPress={() => {
                          navigation.navigate('ViewShop2', {item});
                        }}
                        source={item.HinhAnhSP[0]}
                        title={item.TenSP}
                        price={item.GiaSP}
                      />
                      //</View> </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </SafeAreaView>
          );
        }
    }
}

const styles = StyleSheet.create({})