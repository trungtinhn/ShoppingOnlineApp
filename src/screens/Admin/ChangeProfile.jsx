import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Text,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { IC_Next, IC_User } from '../../../assets/Admin/icons';
import CUSTOM_COLOR from '../../constants/color';
import { Dropdown } from 'react-native-element-dropdown';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import LoadingComponent from '../../components/LoadingComponent';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomHeader from '../../components/Admin/CustomHeader';
import { IMG_Rectangle } from '../../../assets/Login_SignUp/images';
import { launchImageLibrary } from 'react-native-image-picker';
import { firebase } from '../../../firebase/firebase';
import { getUserType, updateUser, updateUserProfile } from '../../api/UserApi';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { Storage } from '../../../firebase/firebase';
import { updateAddress } from '../../../server/controllers/addressController';

function ChangeProfile({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [backgroundUrl, setBackgroundUrl] = useState(null);
  const [image, setImage] = useState(null);

  const genders = [
    { id: 'Nam', title: 'Nam' },
    { id: 'Nữ', title: 'Nữ' },
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    setBirth(formattedDate);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const fetchUserData = async () => {
    try {
      const user = firebase.auth().currentUser;
      const res = await getUserType({ MaND: user.uid });
      const birthDay = new Date(res.data.NgaySinh);
      const formattedDate = `${birthDay.getDate()}/${birthDay.getMonth() + 1}/${birthDay.getFullYear()}`;
      setUserData(res.data);
      setFullName(res.data.TenND || '');
      setPhoneNumber(res.data.Phone || '');
      setBirth(formattedDate || '');
      setAddress(res.data.DiaChi || '');
      setGender(res.data.GioiTinh || '');
      setImageUrl(res.data.Avatar || '');
      setBackgroundUrl(res.data.backgroundUrl || '');
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const chooseImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      selectionLimit: 1,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0]);
      }
    });
  };

  const upLoadImage = async ({image}) => {
    try {
      setIsLoading(true)
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image.uri, true);
        xhr.send(null);
      });
      const storageRef = ref(Storage, `images/users/image-${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, blob);
      console.log('Upload successfully!');
      const url = await getDownloadURL(snapshot.ref);
      console.log('Get URL successfully');
      return url;
    } catch (error) {
      console.log("up load error: "  + error);
    }
  }

  const handleSave = async () => {
    try {
      let uploadedImageUrl = ""
      if (image) {
        uploadedImageUrl = await upLoadImage({image: image});
        setIsLoading(false)
      }
      const updatedData = {
        "_id": userData._id,
        "TenND": fullName,
        "Phone": phoneNumber,
        "NgaySinh": date,
        "DiaChi": address,
        "GioiTinh": gender,
        "Avatar": uploadedImageUrl,
        "LoaiND": userData.LoaiND,
        "MaND": userData.MaND,
        "Email": userData.Email,
      };
      console.log(updatedData)
      const res = await updateUser({MaND: userData.MaND, data: updatedData}); // Assuming updateUserProfile updates the user's profile in your backend
      if(res.status === 200){
        Alert.alert('Notification', 'Change Profile Sucess!', [
          {text: 'OK', onPress: () => navigation.goBack(), style: 'cancel'},
        ]);
      }else{
        console.log(res);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    setIsLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <LoadingComponent text="Loading data..." />
      ) : (
        <>
          <TouchableOpacity style={styles.backgroundContainer}>
            <ImageBackground
              source={backgroundUrl ? { uri: backgroundUrl } : IMG_Rectangle}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.headerContainer}>
                <CustomHeader onPress={() => navigation.goBack()} title="Account/ Change Profile" />
              </View>
              <View style={styles.avataContainer}>
                <TouchableOpacity style={styles.avataStyle} onPress={chooseImage}>
                  {imageUrl ? (
                    <Image source={image ? { uri: image.uri } : { uri: imageUrl }} style={styles.avataStyle} />
                  ) : (
                    <Image source={IC_User} style={styles.avataStyle} />
                  )}
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <View style={{ width: '100%', height: '3%' }} />
          <ScrollView style={{ width: '90%', marginHorizontal: '5%' }}>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={[styles.unitTitleContainer, { justifyContent: 'flex-start' }]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Full name</Text>
                  <Text style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}> *</Text>
                </View>
                <View style={[styles.unitTitleContainer, { justifyContent: 'flex-end' }]}>
                  {fullName ? (
                    <Text style={styles.titleInputStyle}>{fullName.length}/50</Text>
                  ) : null}
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={setFullName}
                  value={fullName}
                />
                <View style={{ width: '5%', height: '100%' }} />
              </View>
            </View>
            <View style={{ width: '100%', height: 15 }} />
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={[styles.unitTitleContainer, { justifyContent: 'flex-start' }]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Date of birth</Text>
                  <Text style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}> *</Text>
                </View>
                <View style={[styles.unitTitleContainer, { justifyContent: 'flex-end' }]}>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TouchableOpacity style={styles.dateStyle} onPress={showDateTimePicker}>
                  <Text style={{ fontSize: 17, color: CUSTOM_COLOR.Black }}>{birth}</Text>
                </TouchableOpacity>
                {showPicker && (
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onChange}
                  />
                )}
                <View style={{ width: '5%', height: '100%' }} />
              </View>
            </View>
            <View style={{ width: '100%', height: 15 }} />
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={[styles.unitTitleContainer, { justifyContent: 'flex-start' }]}>
                  <View style={{ width: '5%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Gender</Text>
                  <Text style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}> *</Text>
                </View>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={genders}
                  search
                  maxHeight={300}
                  labelField="title"
                  valueField="id"
                  placeholder={!isFocus ? 'Select gender' : '...'}
                  searchPlaceholder="Search..."
                  value={gender}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setGender(item.id);
                    setIsFocus(false);
                  }}
                />
                <View style={{ width: '5%', height: '100%' }} />
              </View>
            </View>
            <View style={{ width: '100%', height: 15 }} />
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={[styles.unitTitleContainer, { justifyContent: 'flex-start' }]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Phone number</Text>
                  <Text style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}> *</Text>
                </View>
                <View style={[styles.unitTitleContainer, { justifyContent: 'flex-end' }]}>
                  {phoneNumber ? (
                    <Text style={styles.titleInputStyle}>{phoneNumber.length}/10</Text>
                  ) : null}
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={setPhoneNumber}
                  value={phoneNumber}
                />
                <View style={{ width: '5%', height: '100%' }} />
              </View>
            </View>
            <View style={{ width: '100%', height: 15 }} />
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={[styles.unitTitleContainer, { justifyContent: 'flex-start' }]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Address</Text>
                  <Text style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}> *</Text>
                </View>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={setAddress}
                  value={address}
                />
                <View style={{ width: '5%', height: '100%' }} />
              </View>
            </View>
            <View style={{ width: '100%', height: 15 }} />
          </ScrollView>
          <CustomButton type="primary" text="SAVE" onPress={handleSave} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
    alignItems: 'center',
  },
  backgroundContainer: {
    width: '100%',
    height: 180,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    height: '50%',
    marginLeft: 20,
  },
  avataContainer: {
    position: 'absolute',
    bottom: "10%",
  },
  avataStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.White,
  },
  inputContainer: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.Gray,
  },
  unitTitleContainer: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleInputStyle: {
    color: CUSTOM_COLOR.Black,
    fontWeight: 'bold',
    fontSize: 15,
  },
  dateStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 17,
    color: CUSTOM_COLOR.Black,
  },
  selectedTextStyle: {
    fontSize: 17,
    color: CUSTOM_COLOR.Black,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 17,
  },
});

export default ChangeProfile;
