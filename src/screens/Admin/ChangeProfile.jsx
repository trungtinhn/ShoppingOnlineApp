import React, {useState, useEffect} from 'react';
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
  Platform,
  Button,
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
import { Acount } from './ViewShopScreen';
function ChangeProfile({navigation}) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [danhMuc, setDanhMuc] = useState([]);
  const [value, setValue] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState('01/01/2023');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(Acount);
  const [imageUrl, setImageUrl] = useState(null);
  const [backgroundUrl, setBackgroundUrl] = useState(null);
  const [image, setImage] = useState();

  const gioiTinh = [
    {
      id: 'Nam',
      title: 'Nam',
    },
    {
      id: 'Nữ',
      title: 'Nữ',
    },
  ];

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowPicker(false);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();

    console.log('Date of birth: ', fDate);
    setBirth(fDate);
    setDate(selectedDate);
  };

  const showDateTimePicker = () => {
    setShowPicker(true);
  };

  const fetchUserData = async userId => {
    try {
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchImageUrl = async (documentId, fieldName) => {
    try {
     
    } catch (error) {
      console.error('Error fetching image URL:', error);
      return null;
    }
  };

  const fetchBackgroundUrl = async (documentId, fieldName) => {
    try {
    
      
    } catch (error) {
      console.error('Error fetching image URL:', error);
      return null;
    }
  };

  const updateFullname = async (documentId, newData) => {
    try {
     

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updatePhoneNumber = async (documentId, newData) => {
    try {
      
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updateAddress = async (documentId, newData) => {
    try {
      
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updateBirth = async (documentId, newData) => {
    try {
    

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const UploadFile = async () => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  };

  const updateAvatar = async (documentId, avatar) => {
    const urlImage = image ? await UploadFile() : imageUrl;
    console.log(urlImage);

    try {
     
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const updateGender = async (documentId, newData) => {
    try {
     
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // Assume data is fetched here
      const fetchedData = 'Sample Data';
      setData(fetchedData);
      setIsLoading(false);
    }, 2000);

    const getCurrentDate = () => {
      const currentDate = date;
      let tempDate = new Date(currentDate);
      let fDate =
        tempDate.getDate() +
        '/' +
        (tempDate.getMonth() + 1) +
        '/' +
        tempDate.getFullYear();

      console.log('Current date: ', fDate);
      setBirth(fDate);
    };

    getCurrentDate();
  }, []);

  const chooseImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

      selectionLimit: 5,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.assets[0]);
        console.log(image);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {userData ? (
        <>
          <>
            <TouchableOpacity style={styles.backgroundContainer}>
              <ImageBackground
                source={backgroundUrl ? {uri: backgroundUrl} : IMG_Rectangle}
                resizeMode="cover"
                style={styles.image}>
                <>
                  <View style={styles.headerContainer}>
                    <CustomHeader
                      onPress={() => navigation.goBack()}
                      title="Account/ Change Profile"
                    />
                  </View>
                </>

                <>
                  <View style={styles.avataContainer}>
                    <TouchableOpacity
                      style={styles.avataStyle}
                      onPress={() => chooseImage()}>
                      {imageUrl ? (
                        <Image
                          source={image ? image : {uri: imageUrl}}
                          style={styles.avataStyle}
                        />
                      ) : (
                        <Image source={IC_User} style={styles.avataStyle} />
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              </ImageBackground>
            </TouchableOpacity>
          </>
          <View style={{width: '100%', height: '3%'}} />
          <>
            <View style={styles.bodyContainer}>
              <ScrollView style={{width: '100%', height: '100%'}}>
                <>
                  <View style={[styles.inputContainer, {height: 90}]}>
                    <View style={{width: '100%', height: 10}} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>Full name</Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-end'},
                        ]}>
                        {fullName ? (
                          <Text style={styles.titleInputStyle}>
                            {fullName.length}/50
                          </Text>
                        ) : null}
                        <View style={{width: '10%', height: '100%'}} />
                      </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{width: '5%', height: '100%'}} />
                      <TextInput
                        style={{flex: 1, fontSize: 17}}
                        onChangeText={setFullName}
                        value={fullName}
                      />
                      <View style={{width: '5%', height: '100%'}} />
                    </View>
                  </View>
                </>

                <View style={{width: '100%', height: 15}} />

                <>
                  <View style={[styles.inputContainer, {height: 90}]}>
                    <View style={{width: '100%', height: 10}} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>
                          Date of birth
                        </Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-end'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                      </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{width: '5%', height: '100%'}} />
                      <TouchableOpacity
                        style={styles.dateStyle}
                        onPress={showDateTimePicker}>
                        <Text style={{fontSize: 17, color: CUSTOM_COLOR.Black}}>
                          {' '}
                          {birth}
                        </Text>
                      </TouchableOpacity>
                      {showPicker && (
                        <DateTimePicker
                          value={date}
                          mode="date" // Can be "date", "time", or "datetime"
                          display="spinner" // Can be "default", "spinner", or "calendar"
                          onChange={onChange}
                        />
                      )}
                      <View style={{width: '5%', height: '100%'}} />
                    </View>
                  </View>
                </>

                <View style={{width: '100%', height: 15}} />

                <>
                  <View style={[styles.inputContainer, {height: 90}]}>
                    <View style={{width: '100%', height: 10}} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '5%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>Gender</Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{width: '5%', height: '100%'}} />
                      <Dropdown
                        style={[
                          styles.comboType,
                          isFocus && {borderColor: 'blue'},
                        ]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={gioiTinh}
                        search
                        maxHeight={200}
                        labelField="title"
                        valueField="id"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                          setValue(item.id);
                          setIsFocus(false);
                          setGender(item.id);
                        }}
                      />
                    </View>
                  </View>
                </>

                <View style={{width: '100%', height: 15}} />

                <>
                  <View style={[styles.inputContainer, {height: 90}]}>
                    <View style={{width: '100%', height: 10}} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>Address</Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-end'},
                        ]}>
                        {address ? (
                          <Text style={styles.titleInputStyle}>
                            {address.length}/150
                          </Text>
                        ) : null}
                        <View style={{width: '10%', height: '100%'}} />
                      </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{width: '5%', height: '100%'}} />
                      <TextInput
                        style={{flex: 1, fontSize: 17}}
                        onChangeText={setAddress}
                        value={address}
                      />
                      <View style={{width: '5%', height: '100%'}} />
                    </View>
                  </View>
                </>

                <View style={{width: '100%', height: 15}} />

                <>
                  <View style={[styles.inputContainer, {height: 90}]}>
                    <View style={{width: '100%', height: 10}} />
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>Phone number</Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-end'},
                        ]}>
                        {phoneNumber ? (
                          <Text style={styles.titleInputStyle}>
                            {phoneNumber.length}/10
                          </Text>
                        ) : null}
                        <View style={{width: '10%', height: '100%'}} />
                      </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                      <View style={{width: '5%', height: '100%'}} />
                      <TextInput
                        style={{flex: 1, fontSize: 17}}
                        onChangeText={setPhoneNumber}
                        value={phoneNumber}
                        keyboardType="phone-pad"
                      />
                      <View style={{width: '5%', height: '100%'}} />
                    </View>
                  </View>
                </>

                <View style={{width: '100%', height: 15}} />

                <>
                  <View
                    style={{
                      height: 70,
                      width: '100%',
                      elevation: 1.5,
                      borderRadius: 0.5,
                      shadowColor: CUSTOM_COLOR.Black,
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={[
                          styles.unitTitleContainer,
                          {justifyContent: 'flex-start'},
                        ]}>
                        <View style={{width: '10%', height: '100%'}} />
                        <Text style={styles.titleInputStyle}>Password</Text>
                        <Text
                          style={[
                            styles.titleInputStyle,
                            {color: CUSTOM_COLOR.Red},
                          ]}>
                          {' '}
                          *
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}>
                      <TouchableOpacity
                        style={styles.buttonChangePasswordContainer}>
                        <Text
                          style={{
                            color: CUSTOM_COLOR.Black,
                            fontWeight: 'bold',
                          }}
                          onPress={() => navigation.navigate('ChangePassword')}>
                          Change Password
                        </Text>
                        <Image
                          source={IC_Next}
                          style={{width: 25, height: 10}}
                          resizeMode="center"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>

                <View style={{width: '100%', height: 15}} />
                <View style={{width: '100%', height: 65}}>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    type="primary"
                    text="Save"
                    onPress={() => {
                      
                    }}
                  />
                </View>
              </View>
                <></>
              </ScrollView>
            </View>
          </>
        </>
      ) : (
        <LoadingComponent text="Loading data..." />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  headerContainer: {
    width: '90%',
    height: '32%',
    marginHorizontal: '5%',
  },
  backgroundContainer: {
    width: '100%',
    height: 185,
  },
  image: {
    flex: 1,
  },
  avataContainer: {
    width: '100%',
    height: '67%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonChangePasswordContainer: {
    width: '60%',
    height: '70%',
    marginRight: '5%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  avataStyle: {
    width: 100,
    height: 100,
    // aspectRatio: 1,
    borderRadius: 50,
    resizeMode: 'contain',
    borderColor: CUSTOM_COLOR.Black,
    borderWidth: 1,
  },
  bodyContainer: {
    width: '90%',
    marginHorizontal: '5%',
  },
  inputContainer: {
    width: '100%',
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'column',
  },
  unitTitleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleInputStyle: {},
  comboxContainer: {
    width: '100%',
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'row',
  },
  unitComboContainer: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  comboType: {
    width: '90%',
    height: '90%',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 17,
    color: CUSTOM_COLOR.Black,
  },
  selectedTextStyle: {
    fontSize: 17,
    color: CUSTOM_COLOR.Black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dateStyle: {
    width: '90%',
    height: '90%',
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '200%',
    height: '100%',
    bottom: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    left: '-50%',
  },
});
export default ChangeProfile;
