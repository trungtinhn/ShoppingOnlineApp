import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LoadingComponent from '../../components/LoadingComponent';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import FunctionCard from '../../components/Admin/FunctionCard';
import MenuIcon from '../../components/Admin/MenuIcon';
import { IC_Catgory, IC_User, IC_financial, IC_logout, IC_messenger, IC_order, IC_product, IC_promotions, IC_user } from '../../../assets/Admin/icons';
import ViewNowStatus from '../../components/Admin/ViewNowStatus';
import { IC_Bell, IC_Order } from '../../../assets/Customer/icons';
import {firebase} from '../../../firebase/firebase';
export default function OverViewScreen({navigation}) {

    const [userData, setUserData] = useState('Tinh');   
    const [imageUrl, setImageUrl] = useState('https://media.viez.vn/prod/2021/8/26/large_image_cea52c0e2f.png'); 
    return (
    <SafeAreaView style={styles.container}>
      {userData ? (
        <>
          <>
            <View style={styles.menuContainer}>
              <View style={{ width: 32, height: 37 }}>
                <MenuIcon
                  onPress={() => navigation.navigate('ChangeProfile')}
                  source={IC_User}
                />
              </View>
              <View style={{ width: 10, height: '100%' }} />
              <View style={{ width: 30, height: 30 }}>
                <MenuIcon
                  onPress={() => navigation.navigate('Chat')}
                  source={IC_messenger}
                />
              </View>
              {/* <View style={{width: 5, height: '100%'}} />
                <View style={{width: 35, height: 35}}>
                  <MenuIcon
                    onPress={() => navigation.navigate('Notification')}
                    source={IC_notification}
                  />
                </View> */}
              <View style={{ width: 5, height: '100%' }} />
              <View style={{ width: 32, height: 32, marginHorizontal: 5 }}>
                <MenuIcon
                  onPress={() => {
                    firebase.auth().signOut();
                  }}
                  source={IC_logout}
                />
              </View>
              <View style={{ width: 10, height: '100%' }} />
            </View>
          </>

          <View style={styles.spaceContainer} />

          <>
            <View style={styles.accountContainer}>
              <View style={styles.infoContainer}>
                <View style={{ width: 10, height: '100%' }} />
                <View style={styles.avataContainer}>
                  {imageUrl ? (
                    <Image
                      source={{ uri: imageUrl }}
                      style={{
                        width: 90,
                        height: 90,
                        aspectRatio: 1,
                        borderRadius: 60,
                        resizeMode: 'center',
                        borderColor: CUSTOM_COLOR.Black,
                        borderWidth: 1,
                      }}
                    />
                  ) : (
                    <Image
                      source={IC_User}
                      style={{
                        width: '100%',
                        height: '100%',
                        aspectRatio: 1,
                        borderRadius: 60,
                        resizeMode: 'center',
                        borderColor: CUSTOM_COLOR.Black,
                        borderWidth: 1,
                      }}
                    />
                  )}
                </View>
                <View
                  style={{ flexDirection: 'column', justifyContent: 'center' }}>
                  <Text style={[styles.textViewStyles, { fontSize: 20 }]}>
                    Nguyễn Trung Tính
                  </Text>
                  <View style={{ width: '100%', height: 5 }} />
                  <Text style={[styles.textViewStyles, { fontSize: 15 }]}>
                    Admin
                  </Text>
                </View>
              </View>
              <View style={styles.viewShopContainer}>
                <TouchableOpacity style={styles.butViewShopContainer}>
                  <Text
                    style={{ color: CUSTOM_COLOR.Red }}
                    onPress={() => navigation.navigate('ViewShopScreen')}>
                    View Shop
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>

          <View style={styles.spaceContainer} />

          <>
            <View style={styles.oderContainer}>
              <View style={{ width: '100%', height: '5%' }} />
              <View style={styles.textContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  <Text style={styles.textViewStyles}>Order New</Text>
                </View>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}>
                  <Text
                    style={styles.textViewStyles}
                    onPress={() => navigation.navigate('Order')}>
                    View Now{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.listOderConatiner}>
                {/* <FlatList
                  horizontal={true}
                  data={Order}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => {
                    return (
                      <ViewNow number={item.number} status={item.status} />
                    );
                  }}
                /> */}

                <ViewNowStatus number={0} status={"Confirm"} />
                <ViewNowStatus number={0} status={"On wait"} />
                <ViewNowStatus number={0} status={"Delovering"} />
                <ViewNowStatus number={0} status={"Delivered"} />
              </View>
            </View>
          </>

          <View style={styles.spaceContainer} />

          <>
            <View style={styles.functionContainer}>
              <View style={styles.unitContainer}>
                <View style={styles.unitContainer}>
                  <FunctionCard
                    onPress={() => navigation.navigate('Categories')}
                    source={IC_Catgory}
                    text="Categories"
                  />
                </View>
                <View style={styles.unitContainer}>
                  <FunctionCard
                    onPress={() => navigation.navigate('MyProduct')}
                    source={IC_product}
                    text="Products"
                  />
                </View>
                <View style={styles.unitContainer}>
                  <FunctionCard
                    onPress={() => navigation.navigate('Order')}
                    source={IC_order}
                    text="Orders"
                  />
                </View>

              </View>
              <View style={styles.unitContainer}>
                <View style={styles.unitContainer}>
                  <FunctionCard
                    onPress={() => navigation.navigate('Promotion')}
                    source={IC_promotions}
                    text="Promotions"
                  />
                </View>
                <View style={styles.unitContainer}>
                  <FunctionCard
                    onPress={() => navigation.navigate('ManageUser')}
                    source={IC_order}
                    text="Order"
                  />
                </View>
                <View style={styles.unitContainer}>
                  <FunctionCard
                    onPress={() => navigation.navigate('ManageUser')}
                    source={IC_user}
                    text="Manage User"
                  />
                </View>

              </View>
            </View>
          </>
        </>
      ) : (
        <LoadingComponent text="Loading data..." />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CUSTOM_COLOR.White,
      },
      spaceContainer: {
        flex: 0.5,
        backgroundColor: CUSTOM_COLOR.SlateGray,
      },
      menuContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
      accountContainer: {
        flex: 4,
        flexDirection: 'row',
      },
      infoContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      avataContainer: {
        width: '33%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
      },
      textViewStyles: {
        fontFamily: FONT_FAMILY.Semibold,
        fontSize: 15,
        fontWeight: 'bold',
        color: CUSTOM_COLOR.Black,
      },
      viewShopContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      butViewShopContainer: {
        width: 100,
        height: 40,
        borderColor: CUSTOM_COLOR.FlushOrange,
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 20,
      },
      oderContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textContainer: {
        width: '90%',
        height: '20%',
        flexDirection: 'row',
      },
      listOderConatiner: {
        height: '75%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      functionContainer: {
        flex: 10,
        flexDirection: 'column',
      },
      unitContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
})