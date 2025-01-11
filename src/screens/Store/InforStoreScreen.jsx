import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {createStore} from '../../api/StroreApi';
import {getCurrentUserData} from '../../api/UserApi';
import TextInputCard from '../../components/Login_SignUp/TextInputCard';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import {firebase} from '../../../firebase/firebase';

const InforStoreScreen = ({navigation}) => {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const isValidForm = (storeName, storeAddress, storeDescription) => {
    if (storeName === '' && storeAddress === '' && storeDescription === '') {
      return 'Please enter your information then click ';
    } else if (storeName === '') {
      return 'Please enter your store name';
    } else if (storeAddress === '') {
      return 'Please enter your store address';
    } else if (storeDescription === '') {
      return 'Please enter your store description';
    }
    return null;
  };
  const handleCurrentUser = async () => {
    const userUid = firebase.auth().currentUser.uid;
    const res = await getCurrentUserData({userId: userUid});
    if (res.status === 200) {
      setCurrentUser(res.data);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const handleSave = async () => {
    const storeData = {
      name: storeName,
      address: storeAddress,
      description: storeDescription,
      ownerId: currentUser._id,
      status: 'pending',
      email: currentUser.email,
      phoneNumber: currentUser.phone,
      latidude: 0,
      longitude: 0,
    };
    const res = await createStore({data: storeData});
    if (res.status === 201) {
      Alert.alert('Success', 'Store created successfully');
      navigation.navigate('StoreHomeScreen');
    } else {
      console.log('Error:', res);
      Alert.alert('Error', 'Failed to create store. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={[styles.bodyContainer, styles.unitContainer]}>
          <View style={{height: 150}}>
            <TextInputCard
              title="Store name*"
              txtInput="Your Store name"
              onChangeText={storeName => setStoreName(storeName)}
            />
          </View>
          <View style={{height: 150}}>
            <TextInputCard
              title="Store Address*"
              txtInput="Your Store Address"
              onChangeText={storeAddress => setStoreAddress(storeAddress)}
            />
          </View>
          <View style={{height: 150}}>
            <TextInputCard
              title="Store Description*"
              txtInput="Your Store Description"
              onChangeText={storeDescription =>
                setStoreDescription(storeDescription)
              }
            />
          </View>

          <View style={styles.containerBot}>
            <View style={styles.button}>
              <CustomButton
                type="primary"
                text="Save"
                onPress={() => {
                  const errorMessage = isValidForm(
                    storeName,
                    storeAddress,
                    storeDescription,
                  );
                  if (errorMessage) {
                    Alert.alert('Error', errorMessage);
                  } else {
                    handleSave();
                  }
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  scrollview: {
    width: '100%',
    height: '100%',
  },
  unitContainer: {
    width: '80%',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
  topContainer: {
    height: 50,
    top: '-1%',
    left: '3%',
  },
  bodyContainer: {
    height: 780,
  },
  checkContainer: {
    height: '4%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  containerBot: {
    width: '100%',
    height: 55,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    width: '200%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-50%',
  },
  policyStyles: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.Light,
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
  },
  titleStyle: {
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 20,
    color: CUSTOM_COLOR.Black,
    left: '5%',
  },
});

export default InforStoreScreen;
