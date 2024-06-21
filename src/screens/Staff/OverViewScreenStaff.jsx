import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoadingScreen from '../LoadingScreen';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import FunctionCard from '../../components/Admin/FunctionCard';
import MenuIcon from '../../components/Admin/MenuIcon';
import {
  IC_Catgory,
  IC_User,
  IC_financial,
  IC_logout,
  IC_messenger,
  IC_order,
  IC_product,
  IC_promotions,
  IC_user,
  IC_FunctionPermisson,
} from '../../../assets/Admin/icons';
import { ref, onValue } from "firebase/database";
import ViewNowStatus from '../../components/Admin/ViewNowStatus';
import {database, firebase} from '../../../firebase/firebase';
import {getUserType} from '../../api/UserApi';

function OverViewScreenStaff({navigation}) {
  const [userData, setUserData] = useState();
  const [imageUrl, setImageUrl] = useState('https://media.viez.vn/prod/2021/8/26/large_image_cea52c0e2f.png',);
  const [permissions, setPermissions] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleGetCurrentUser = async () => {
    const user = firebase.auth().currentUser;
    const res = await getUserType({MaND: user.uid});
    if (res.status === 200) {
      setUserData(res.data);
      setImageUrl(res.data.Avatar);
      if (res.data.LoaiND === 'staff') {
        const permissionsRef = ref(database, 'Permission');
        onValue(permissionsRef, (snapshot) => {
          const permData = snapshot.val();
          if (permData) {
            setPermissions(permData);
            console.log(permData);
          }
          setLoading(false); // Set loading to false when data is fetched
        });
      } else {
        setLoading(false); // Set loading to false if user is not admin
      }
    } else {
      setLoading(false); // Set loading to false if user data fetch fails
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  const functionCardsData = [
    {
      key: 'category',
      permission: permissions?.category,
      onPress: () => navigation.navigate('Categories'),
      source: IC_Catgory,
      text: 'Categories',
    },
    {
      key: 'product',
      permission: permissions?.product,
      onPress: () => navigation.navigate('MyProduct'),
      source: IC_product,
      text: 'Products',
    },
    {
      key: 'order',
      permission: permissions?.order,
      onPress: () => navigation.navigate('Order'),
      source: IC_order,
      text: 'Orders',
    },
    {
      key: 'promotion',
      permission: permissions?.promotion,
      onPress: () => navigation.navigate('Promotion'),
      source: IC_promotions,
      text: 'Promotions',
    },
    {
      key: 'permission',
      permission: permissions?.permission,
      onPress: () => navigation.navigate('FunctionPermission'),
      source: IC_FunctionPermisson,
      text: 'Permission',
    },
    {
      key: 'user',
      permission: permissions?.user,
      onPress: () => navigation.navigate('ManageUser'),
      source: IC_User,
      text: 'Manage User',
    },
  ];
  
  if (loading) {
    return <LoadingScreen />; 
  }

  return (
    <SafeAreaView style={styles.container}>
      {userData ? (
        <>
          <View style={styles.menuContainer}>
            <View style={{width: 32, height: 37}}>
              <MenuIcon
                onPress={() => navigation.navigate('ChangeProfile')}
                source={IC_User}
              />
            </View>
            <View style={{width: 10, height: '100%'}} />
            <View style={{width: 30, height: 30}}>
              <MenuIcon
                onPress={() => navigation.navigate('Chat')}
                source={IC_messenger}
              />
            </View>
            <View style={{width: 5, height: '100%'}} />
            <View style={{width: 32, height: 32, marginHorizontal: 5}}>
              <MenuIcon
                onPress={() => {
                  firebase.auth().signOut();
                }}
                source={IC_logout}
              />
            </View>
            <View style={{width: 10, height: '100%'}} />
          </View>

          <View style={styles.spaceContainer} />

          <View style={styles.accountContainer}>
            <View style={styles.infoContainer}>
              <View style={{width: 10, height: '100%'}} />
              <View style={styles.avataContainer}>
                <Image
                  source={{uri: imageUrl}}
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
              </View>
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <Text style={[styles.textViewStyles, {fontSize: 20}]}>
                  {userData.TenND}
                </Text>
                <View style={{width: '100%', height: 5}} />
                <Text style={[styles.textViewStyles, {fontSize: 15}]}>
                  {userData.LoaiND}
                </Text>
              </View>
            </View>
            <View style={styles.viewShopContainer}>
              <TouchableOpacity style={styles.butViewShopContainer}>
                <Text
                  style={{color: CUSTOM_COLOR.Red}}
                  onPress={() => navigation.navigate('ViewShopScreen')}>
                  View Shop
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.spaceContainer} />

          <View style={styles.oderContainer}>
            <View style={{width: '100%', height: '5%'}} />
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
                  View Now
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.listOderConatiner}>
              <ViewNowStatus number={1} status={'Confirm'} />
              <ViewNowStatus number={1} status={'On wait'} />
              <ViewNowStatus number={1} status={'Delovering'} />
              <ViewNowStatus number={1} status={'Delivered'} />
            </View>
          </View>

          <View style={styles.spaceContainer} />

          <View style={styles.functionContainer}>
            <FlatList
              data={functionCardsData.filter(card => card.permission)}
              renderItem={({item}) => (
                <View style={styles.unitContainer}>
                  <FunctionCard
                    onPress={item.onPress}
                    source={item.source}
                    text={item.text}
                  />
                </View>
              )}
              keyExtractor={item => item.key}
              horizontal={false}
              numColumns={3}
              contentContainerStyle={styles.functionList}
            />
          </View>
        </>
      ) : (
        <LoadingScreen/>
      )}
    </SafeAreaView>
  );
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
    flexDirection: 'row', // Chỉ định hiển thị ngang
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: '#ffffff',
  },
  unitContainer: {
    height: 120,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  functionList: {
    justifyContent: 'space-around', // Các phần tử được căn cách đều nhau
    flexGrow: 1,
    padding: 10,
  },
});
export default OverViewScreenStaff;
