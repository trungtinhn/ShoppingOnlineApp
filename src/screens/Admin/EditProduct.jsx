import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {Dropdown} from 'react-native-element-dropdown';
import CUSTOM_COLOR from '../../constants/color';
import CheckBox from '@react-native-community/checkbox';
import {border_add} from '../../../assets/Admin/images';
import ButtonDetail from '../../components/Admin/ButtonDetail';
import CustomHeader from '../../components/Admin/CustomHeader';
import FONT_FAMILY from '../../constants/font';
import {getCategory} from '../../api/CategoryApi';
import {updateProduct} from '../../api/ProductApi';

export default function EditProduct({navigation, route}) {
  const {item} = route.params;

  const [image, setImage] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [lengthName, setLengthName] = useState(0);
  const [lengthDescription, setLengthDescription] = useState(0);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorCode, setNewColorCode] = useState('');
  const [newSize, setNewSize] = useState('');
  const [catesgories, setCategories] = useState([]);
  const [categorize, setCategorize] = useState('');

  const addSize = () => {
    if (newSize) {
      setSizeList([...sizeList, newSize]);
      setNewSize('');
      setSizeModalVisible(false);
    }
  };

  const removeSize = index => {
    setSizeList(sizeList.filter((_, i) => i !== index));
  };

  const addColor = () => {
    if (newColorName && newColorCode) {
      setColorList([...colorList, {name: newColorName, code: newColorCode}]);
      setNewColorName('');
      setNewColorCode('');
      setColorModalVisible(false);
    }
  };

  const removeColor = index => {
    setColorList(colorList.filter((_, i) => i !== index));
  };

  const getDataCategories = async () => {
    const res = await getCategory();
    setCategories(res.data);
  };

  const getDataColor = async () => {
    const colors = item.MauSac;
    setColorList(colors);
  };

  const getDataSize = () => {
    const data = item.Size;
    setSizeList(data);
  };

  const UpdateData = async () => {
    const types = [];
    colorList.forEach(color => {
      sizeList.forEach(size => {
        types.push({
          size: size,
          color: color.name,
          quantity: amount,
        });
      });
    });
    const productData = {
      GiaGoc: Number(price),
      GiaGiam: Number(price),
      HinhAnhSP: image,
      MaDM: categorize,
      MauSac: colorList,
      Size: sizeList,
      Type: types,
      SoLuongSP: Number(amount),
      TenSP: name,
      MoTaSP: description,
      TrangThai: item.TrangThai,
      Trending: false,
      Onsale: false,
      TiLeKM: 0,
    };
    const res = await updateProduct({productId: item._id, data: productData});
    if (res.status === 200) {
      Alert.alert('Success', 'You product have been update');
      navigation.navigate('MyProduct');
    } else {
      console.log(res.error);
      Alert.alert('Error', 'Cant update new product');
    }
    //
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
      }
    });
  };

  useEffect(() => {
    setImage(item.HinhAnhSP);
    setName(item.TenSP);
    setDescription(item.MoTaSP);
    setPrice(item.GiaGoc);
    setAmount(item.SoLuongSP);
    setValue(item.MaDM);
    getDataColor();
    getDataSize();
    getDataCategories();
    setLengthName(item.TenSP.length);
    setLengthDescription(item.MoTaSP.length);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: CUSTOM_COLOR.White}}>
      <View
        style={{
          width: '90%',
          height: '100%',
          marginHorizontal: '5%',
          backgroundColor: CUSTOM_COLOR.White,
        }}>
        {/* <BackTo
          onPress={() => {
            navigation.goBack();
          }}
          Info="Edit Product"
        /> */}
        <>
          <View style={{width: '100%', height: 60}}>
            <CustomHeader
              onPress={() => navigation.goBack()}
              title="Product/ Edit product"
            />
          </View>
        </>

        <ScrollView style={{backgroundColor: CUSTOM_COLOR.White}}>
          <>
            <View style={styles.addImageContainer}>
              <View style={{width: 20, height: '100%'}} />
              <TouchableOpacity
                style={{width: 75, height: 75}}
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
              <View style={{width: 20, height: '100%'}} />

              {image ? (
                <ScrollView horizontal={true}>
                  {image.map((img, index) => (
                    <Image
                      key={index}
                      source={
                        typeof img === 'string' ? {uri: img} : {uri: img.uri}
                      }
                      style={{height: 90, width: 90, margin: 5}}
                    />
                  ))}
                </ScrollView>
              ) : (
                // <Image
                //   source={typeof image[0] === 'string' ? { uri: image } : image}
                //   style={{
                //     height: 75,
                //     width: 75,
                //   }}
                // />
                <Text style={styles.addImageTextStyles}>
                  (Add picture or video)
                </Text>
              )}
            </View>
          </>
          <View style={{width: '100%', height: 10}} />
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
                  <Text style={styles.titleInputStyle}>Name Of Product</Text>
                  <Text
                    style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    {justifyContent: 'flex-end'},
                  ]}>
                  <Text style={styles.titleInputStyle}>{lengthName}/200</Text>
                  <View style={{width: '10%', height: '100%'}} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{width: '5%', height: '100%'}} />
                <TextInput
                  style={{flex: 1, fontSize: 17}}
                  onChangeText={text => {
                    if (text.length < 200) {
                      setName(text);
                      setLengthName(text.length);
                    }
                  }}
                  value={name}
                />
                <View style={{width: '5%', height: '100%'}} />
              </View>
            </View>
          </>
          <View style={{width: '100%', height: 10}} />
          <>
            <View style={[styles.inputContainer, {height: 100}]}>
              <View style={{width: '100%', height: 10}} />
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View
                  style={[
                    styles.unitTitleContainer,
                    {justifyContent: 'flex-start'},
                  ]}>
                  <View style={{width: '10%', height: '100%'}} />
                  <Text style={styles.titleInputStyle}>Description</Text>
                  <Text
                    style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    {justifyContent: 'flex-end'},
                  ]}>
                  <Text style={styles.titleInputStyle}>
                    {lengthDescription}/500
                  </Text>
                  <View style={{width: '10%', height: '100%'}} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{width: '5%', height: '100%'}} />
                <TextInput
                  style={{flex: 1, fontSize: 17}}
                  onChangeText={text => {
                    if (text.length <= 500) {
                      setDescription(text);
                      setLengthDescription(text.length);
                    }
                  }}
                  value={description}
                  multiline={true}
                />
                <View style={{width: '5%', height: '100%'}} />
              </View>
            </View>
          </>
          <View style={{width: '100%', height: 10}} />
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
                  <Text style={styles.titleInputStyle}>Price</Text>
                  <Text
                    style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    {justifyContent: 'flex-end'},
                  ]}>
                  {/* <Text style={styles.titleInputStyle}>{lengthName}/200</Text> */}
                  <View style={{width: '10%', height: '100%'}} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{width: '5%', height: '100%'}} />
                <TextInput
                  style={{flex: 1, fontSize: 17}}
                  onChangeText={text => setPrice(parseInt(text))}
                  value={String(price)}
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
          <View style={{width: '100%', height: 10}} />
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
                  <Text style={styles.titleInputStyle}>Color</Text>
                  <Text
                    style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
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
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{flex: 2, flexDirection: 'row', padding: 8}}>
                <View style={{width: '3%', height: '100%'}} />
                {/* <ScrollView horizontal={true} style={{ flexDirection: 'row' }}>
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
                        leftTextStyle={{ fontSize: 15 }}
                      />
                    ))
                    : null}
                </ScrollView> */}
                <TouchableOpacity onPress={() => setColorModalVisible(true)}>
                  <Text style={styles.addSmall}>+</Text>
                </TouchableOpacity>
                {colorList.map((color, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.colorBlock, {backgroundColor: color.code}]}
                    onPress={() => removeColor(index)}></TouchableOpacity>
                ))}
                <Modal
                  transparent={true}
                  visible={colorModalVisible}
                  onRequestClose={() => setColorModalVisible(false)}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <TextInput
                        placeholder="Color Name"
                        value={newColorName}
                        onChangeText={setNewColorName}
                        style={styles.input}
                      />
                      <TextInput
                        placeholder="Color Code"
                        value={newColorCode}
                        onChangeText={setNewColorCode}
                        style={styles.input}
                      />
                      <ButtonDetail
                        title="Add Color"
                        onPress={addColor}
                        style={{width: '100%', height: '15%'}}
                        color={CUSTOM_COLOR.DarkOrange}
                      />
                      <View style={{height: 10}} />
                      <ButtonDetail
                        title="Cancel"
                        onPress={() => setColorModalVisible(false)}
                        style={{width: '100%', height: '15%'}}
                        color={CUSTOM_COLOR.DarkOrange}
                      />
                    </View>
                  </View>
                </Modal>
                <View
                  style={{
                    width: '5%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </>
          <View style={{width: '100%', height: 10}} />
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
                  <Text style={styles.titleInputStyle}>Size</Text>
                  <Text
                    style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
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
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{flex: 2, flexDirection: 'row', padding: 8}}>
                <View style={{width: '3%', height: '100%'}} />
                {/* <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
                  {sizeList
                    ? sizeList.map(item => (
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
                </ScrollView> */}
                <TouchableOpacity onPress={() => setSizeModalVisible(true)}>
                  <Text style={styles.addSmall}>+</Text>
                </TouchableOpacity>
                {sizeList.map((size, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.sizeBlock}
                    onPress={() => removeSize(index)}>
                    <Text>{sizeList[index]}</Text>
                  </TouchableOpacity>
                ))}
                <Modal
                  transparent={true}
                  visible={sizeModalVisible}
                  onRequestClose={() => setSizeModalVisible(false)}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <TextInput
                        placeholder="Size"
                        value={newSize}
                        onChangeText={setNewSize}
                        style={styles.input}
                      />
                      <ButtonDetail
                        title="Add Size"
                        onPress={addSize}
                        style={{width: '100%', height: '20%'}}
                        color={CUSTOM_COLOR.DarkOrange}
                      />
                      <View style={{height: 10}} />
                      <ButtonDetail
                        title="Cancel"
                        onPress={() => setSizeModalVisible(false)}
                        style={{width: '100%', height: '20%'}}
                        color={CUSTOM_COLOR.DarkOrange}
                      />
                    </View>
                  </View>
                </Modal>
                <View
                  style={{
                    width: '5%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
          </>
          <View style={{width: '100%', height: 10}} />
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
                  <Text style={styles.titleInputStyle}>Amount</Text>
                  <Text
                    style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    {justifyContent: 'flex-end'},
                  ]}>
                  {/* <Text style={styles.titleInputStyle}>{lengthName}/200</Text> */}
                  <View style={{width: '10%', height: '100%'}} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{width: '5%', height: '100%'}} />
                <TextInput
                  style={{flex: 1, fontSize: 17}}
                  onChangeText={text => setAmount(parseInt(text))}
                  value={String(amount)}
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
          <View style={{width: '100%', height: 10}} />
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
                  <Text style={styles.titleInputStyle}>Categorize</Text>
                  <Text
                    style={[styles.titleInputStyle, {color: CUSTOM_COLOR.Red}]}>
                    {' '}
                    *
                  </Text>
                </View>
                <View
                  style={[
                    styles.unitTitleContainer,
                    {justifyContent: 'flex-end'},
                  ]}>
                  {/* <Text style={styles.titleInputStyle}>{lengthName}/200</Text> */}
                  <View style={{width: '10%', height: '100%'}} />
                </View>
              </View>
              {/* <View style={{width: '100%', height: 5}} /> */}
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <View style={{width: '5%', height: '100%'}} />
                <Dropdown
                  style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={catesgories}
                  search
                  maxHeight={200}
                  labelField="name"
                  valueField="_id"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item._id);
                    setIsFocus(false);
                    setCategorize(item._id);
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
          <View style={{width: '100%', height: 15}} />
          <>
            <View
              style={{
                width: '100%',
                height: 55,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ButtonDetail
                title="Save"
                style={{width: '100%', height: '90%'}}
                onPress={() => {
                  UpdateData();
                }}
                color={CUSTOM_COLOR.DarkOrange}
              />
            </View>
          </>
          <View style={{width: '100%', height: 15}} />
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
  container: {
    flex: 1,
    padding: 16,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  addSmall: {
    color: CUSTOM_COLOR.FlushOrange,
    fontFamily: FONT_FAMILY.Medium,
    fontSize: 24,
  },
  sizeBlock: {
    height: 32,
    marginLeft: 8,
    padding: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.Gray,
  },
  colorBlock: {
    width: 32,
    height: 32,
    marginLeft: 8,
    padding: 8,
    borderRadius: 4,
  },
  colorName: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    height: 200,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});
