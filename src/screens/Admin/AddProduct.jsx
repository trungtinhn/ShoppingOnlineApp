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
  Alert,
  Modal,
  Button,
} from 'react-native';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {Storage} from '../../../firebase/firebase';
import React, {useContext, useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import CUSTOM_COLOR from '../../constants/color';
import CustomHeader from '../../components/Admin/CustomHeader';
import CheckBox from '@react-native-community/checkbox';
import ButtonDetail from '../../components/Admin/ButtonDetail';
import FONT_FAMILY from '../../constants/font';
import {Dropdown} from 'react-native-element-dropdown';
import {border_add} from '../../../assets/Admin/images';
import {getCategory, updateProductAmount} from '../../api/CategoryApi';
import {addProduct} from '../../api/ProductApi';
export default function AddProduct({navigation}) {
  //const {addProduct} = useContext(useProducts);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState();
  const [lengthName, setLengthName] = useState(0);
  const [lengthDescription, setLengthDescription] = useState(0);
  const [categorize, setCategorize] = useState('');
  const [podtuctCategoryAmount, setpodtuctCategoryAmount] = useState();
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorCode, setNewColorCode] = useState('');
  const [newSize, setNewSize] = useState('');
  const [catesgories, setCategories] = useState([]);

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
        setImages([...images, ...response.assets]);
        console.log(images);
      }
    });
  };

  const setData = async () => {
    const types = [];
    colorList.forEach(color => {
      sizeList.forEach(size => {
        types.push({
          size: size,
          color: color.code,
          quantity: amount,
        });
      });
    });
    const imageUri = await UploadFile();
    const productData = {
      OriginalPrice: Number(price),
      DiscountPrice: Number(price),
      ProductImages: imageUri,
      CategoryId: categorize,
      Colors: colorList,
      Size: sizeList,
      Type: types,
      StockQuantity: Number(amount),
      ProductName: name,
      ProductDescription: description,
      Status: 'available',
      Trending: false,
      Onsale: false,
    };
    const res = await addProduct({data: productData}).then(handleUpdateProductCategoryAmount());
    
    if (res.status === 200) {
    } else {
      console.log(res);
      Alert.alert('Error', 'Cant add new product');
    }
    Alert.alert('Notification', 'Successfully added new Product!', [
      {text: 'OK', onPress: () => navigation.goBack(), style: 'cancel'},
    ]);
  };

  const UploadFile = async () => {
    const data = [];
    for (let index = 0; index < images.length; index++) {
      try {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', images[index].uri, true);
          xhr.send(null);
        });
        const storageRef = ref(Storage, `images/products/image-${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, blob);
        console.log('Upload successfully!');
        const url = await getDownloadURL(snapshot.ref);
        console.log('Get URL successfully');
        data.push(url);
      } catch (error) {
        console.log(error);
      }
    }
    console.log(data);
    return data;
  };
  const handleGetCategory = async () => {
    const categories = await getCategory();
    setCategories(categories.data);
  };
  const handleUpdateProductCategoryAmount = async () => {
    const res = await updateProductAmount({
      categoryId: categorize,
      numProduct: podtuctCategoryAmount + 1,
    });
    if(res.status === 200){
      
    }else{
      console.log(res.error);
    }
  };
  useEffect(() => {
    handleGetCategory();
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
        <>
          <View style={{width: '100%', height: 60}}>
            <CustomHeader
              onPress={() => navigation.goBack()}
              title="Product/ Add product"
            />
          </View>
        </>

        <ScrollView style={{backgroundColor: CUSTOM_COLOR.White}}>
          <View style={{width: '100%', height: 10}} />
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
              {images ? (
                <ScrollView horizontal={true}>
                  {images.map(img => (
                    <Image
                      key={img.uri}
                      source={{uri: img.uri}}
                      style={{height: 90, width: 90, margin: 5}}
                    />
                  ))}
                </ScrollView>
              ) : (
                <Text style={{marginLeft: 30}}>(Add picture or video)</Text>
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
              <View style={{width: '100%', height: 5}} />
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
              <View style={{width: '100%', height: 5}} />
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
                  <View style={{width: '10%', height: '100%'}} />
                </View>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{width: '5%', height: '100%'}} />
                <TextInput
                  style={{flex: 1, fontSize: 17}}
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
              <View style={{flex: 2, flexDirection: 'row', padding: 10}}>
                <View style={{width: '3%', height: '100%'}} />
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
              <View style={{flex: 2, flexDirection: 'row', padding: 10}}>
                <View style={{width: '3%', height: '100%'}} />
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
                  <View style={{width: '10%', height: '100%'}} />
                </View>
              </View>
              <View style={{flex: 2, flexDirection: 'row'}}>
                <View style={{width: '5%', height: '100%'}} />
                <TextInput
                  style={{flex: 1, fontSize: 17}}
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
                  <View style={{width: '10%', height: '100%'}} />
                </View>
              </View>
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
                    setpodtuctCategoryAmount(item.numProduct);
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
                title="Add now"
                style={{width: '100%', height: '90%'}}
                onPress={() => {
                  setData();
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
