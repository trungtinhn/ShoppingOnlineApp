import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ImageBackground,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import CUSTOM_COLOR from '../../constants/color';
import CustomHeader from '../../components/Admin/CustomHeader';
import CheckBox from '@react-native-community/checkbox';
import ButtonDetail from '../../components/Admin/ButtonDetail';
import FONT_FAMILY from '../../constants/font';
import { Dropdown } from 'react-native-element-dropdown';

export default function AddProduct({ navigation }) {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [image, setImage] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [lengthName, setLengthName] = useState(0);
  const [lengthDescription, setLengthDescription] = useState(0);
  const [categorize, setCategorize] = useState()

  const [color, setColor] = useState([]);
  const [soLuongSPDanhMuc, setSoLuongSPDanhMuc] = useState()
  const [size, setSize] = useState([
    {
      id: 'sizeS',
      title: 'S',
      checked: false,
    },
    {
      id: 'sizeM',
      title: 'M',
      checked: false,
    },
    {
      id: 'sizeL',
      title: 'L',
      checked: false,
    },
    {
      id: 'sizeXL',
      title: 'XL',
      checked: false,
    },
    {
      id: 'sizeXXL',
      title: 'XXL',
      checked: false,
    },
    {
      id: 'sizeXXXL',
      title: 'XXXL',
      checked: false,
    },
  ]);

  const [danhMuc, setDanhMuc] = useState([]);

  const handleCheckColor = key => {
    const newList = color.map(item =>
      item.key === key ? { ...item, checked: !item.checked } : item,
    );
    setColor(newList);
  };

  const handleCheckSize = id => {
    const newList = size.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item,
    );
    setSize(newList);
  };

  const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      multiple: true,
      selectionLimit: 5,
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage([...image, ...response.assets]);
        console.log(image);
      }
    });
  };

  const setData = async () => {
    

  };

  const UploadFile = async () => {
    try {
      
    }catch (error) {
        console.log(error);
      }
    }




  useEffect(() => {
    //setColor([{ id: 1, title: 'red', checked: true }, { id: 2, title: 'blue', checked: false }])
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: CUSTOM_COLOR.White }}>
      <View
        style={{
          width: '90%',
          height: '100%',
          marginHorizontal: '5%',
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        <>
          <View style={{ width: '100%', height: 60 }}>
            <CustomHeader
              onPress={() => navigation.goBack()}
              title="Product/ Add product"
            />
          </View>
        </>

        <ScrollView style={{ backgroundColor: CUSTOM_COLOR.White }}>
          <View style={{ width: '100%', height: 10 }} />
          <>
            <View style={styles.addImageContainer}>
              <View style={{ width: 20, height: '100%' }} />
              <TouchableOpacity
                style={{ width: 75, height: 75 }}
                onPress={selectImage}>
                <ImageBackground
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  source={border_add}
                  resizeMode="cover">
                  <Text style={styles.icAddStyle}>+</Text>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{ width: 20, height: '100%' }} />
              {image ? (
                <ScrollView horizontal={true}>
                  {image.map(img => (
                    <Image
                      key={img.uri}
                      source={{ uri: img.uri }}
                      style={{ height: 90, width: 90, margin: 5 }}
                    />
                  ))}
                </ScrollView>
              ) : (
                <Text style={{ marginLeft: 30 }}>(Add picture or video)</Text>
              )}
            </View>
          </>

          <View style={{ width: '100%', height: 10 }} />

          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Name Of Product</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <Text style={styles.titleInputStyle}>{lengthName}/200</Text>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              <View style={{ width: '100%', height: 5 }} />
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={text => {
                    if (text.length < 200) {
                      setName(text);
                      setLengthName(text.length);
                    }
                  }}
                  value={name}
                />
                <View style={{ width: '5%', height: '100%' }} />
              </View>
            </View>
          </>

          <View style={{ width: '100%', height: 10 }} />

          <>
            <View style={[styles.inputContainer, { height: 100 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Description</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <Text style={styles.titleInputStyle}>
                    {lengthDescription}/500
                  </Text>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              <View style={{ width: '100%', height: 5 }} />
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={text => {
                    if (text.length <= 500) {
                      setDescription(text);
                      setLengthDescription(text.length);
                    }
                  }}
                  value={description}
                  multiline={true}
                />
                <View style={{ width: '5%', height: '100%' }} />
              </View>
            </View>
          </>

          <View style={{ width: '100%', height: 10 }} />

          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Price</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={text => setPrice(text)}
                  value={price}
                  keyboardType="numeric"
                />
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.titleInputStyle}>VNĐ</Text>
                </View>
              </View>
            </View>
          </>

          <View style={{ width: '100%', height: 10 }} />

          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Color</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '3%', height: '100%' }} />
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
                  {color
                    ? color.map(item => (
                      <CheckBox
                        key={item.key}
                        style={{ flex: 1, padding: 10 }}
                        onClick={() => {
                          //setChecked(!checked)
                          handleCheckColor(item.key);
                        }}
                        isChecked={item.checked}
                        leftText={item.TenMau}
                        leftTextStyle={{ fontSize: 15, marginHorizontal: 5 }}
                      />
                    ))
                    : null}
                </ScrollView>
                <View
                  style={{
                    width: '5%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </>

          <View style={{ width: '100%', height: 10 }} />

          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Size</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '3%', height: '100%' }} />
                <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
                  {size
                    ? size.map(item => (
                      <CheckBox
                        key={item.id}
                        style={{ flex: 1, padding: 10 }}
                        isChecked={item.checked}
                        leftText={item.title}
                        leftTextStyle={{ fontSize: 15, marginHorizontal: 5 }}
                        onClick={() => {
                          handleCheckSize(item.id);
                        }}
                      />
                    ))
                    : null}
                </ScrollView>
                <View
                  style={{
                    width: '5%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </>

          <View style={{ width: '100%', height: 10 }} />

          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Amount</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <View style={{ width: '5%', height: '100%' }} />
                <TextInput
                  style={{ flex: 1, fontSize: 17 }}
                  onChangeText={text => setAmount(text)}
                  value={amount}
                  keyboardType="numeric"
                />
                <View
                  style={{
                    width: '20%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {/* <Text style={styles.titleInputStyle}>%</Text> */}
                </View>
              </View>
            </View>
          </>

          <View style={{ width: '100%', height: 10 }} />

          <>
            <View style={[styles.inputContainer, { height: 90 }]}>
              <View style={{ width: '100%', height: 10 }} />
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-start' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                  <Text style={styles.titleInputStyle}>Categorize</Text>
                  <Text
                    style={[styles.titleInputStyle, { color: CUSTOM_COLOR.Red }]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    { justifyContent: 'flex-end' },
                  ]}>
                  <View style={{ width: '10%', height: '100%' }} />
                </View>
              </View>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View style={{ width: '5%', height: '100%' }} />
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={danhMuc}
                  search
                  maxHeight={200}
                  labelField="TenDM"
                  valueField="key"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.key);
                    setIsFocus(false);

                    setSoLuongSPDanhMuc(item.SoLuongSP)
                  }}
                />
                <View
                  style={{
                    width: '5%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </>

          <View style={{ width: '100%', height: 15 }} />

          <>
            <View
              style={{
                width: '100%',
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ButtonDetail
                title="Add now"
                style={{ width: '100%', height: '90%' }}
                onPress={() => {
                  setData();
                }}
                color={CUSTOM_COLOR.DarkOrange}
              />
            </View>
          </>
          <View style={{ width: '100%', height: 15 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  addImageContainer: {
    width: '100%',
    height: 100,
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icAddStyle: {
    color: CUSTOM_COLOR.FlushOrange,
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 50,
  },
  addImageTextStyles: {
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.Semibold,
    fontSize: 15,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    width: '90%',
    height: '80%',
    // height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 15,
    // marginHorizontal: 20,
    // marginTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
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
});
