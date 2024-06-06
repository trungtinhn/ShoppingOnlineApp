import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Storage } from '../../../firebase/firebase';
import CUSTOM_COLOR from '../../constants/color';
import { border_add } from '../../../assets/Admin/images';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomHeader from '../../components/Admin/CustomHeader';
import FONT_FAMILY from '../../constants/font';
import ButtonDetail from '../../components/Admin/ButtonDetail';
import { updateCategory } from '../../api/CategoryApi';

function EditCategory({ route, navigation }) {
  const { category } = route.params;
  const [image, setImage] = useState(category.image);
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description || '');
  const [lengthName, setLengthName] = useState(category.name.length);

  const selectImage = () => {
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
        setImage(response.assets[0].uri);
      }
    });
  };

  const uploadFile = async () => {
    if (image.startsWith('http')) {
      return image; // Return existing URL if image is not changed
    }

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
        xhr.open('GET', image, true);
        xhr.send(null);
      });

      const storageRef = ref(Storage, `images/categories/image-${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, blob);
      console.log('Upload successfully!');
      const url = await getDownloadURL(snapshot.ref);
      console.log('Get URL successfully');
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (!validateInput()) {
      Alert.alert(
        'Notification',
        'Please fill in the information completely and accurately!',
        [{ text: 'OK', style: 'cancel' }],
      );
      return;
    }
    const imageUri = await uploadFile();
    const dataCategory = {
      name: name,
      image: imageUri,
      description: description,
    };
    console.log(dataCategory)
    const res = await updateCategory({categoryId: category._id, data: dataCategory});
    if (res.status === 200) {
      Alert.alert('Notification', 'Successfully updated category!', [
        { text: 'OK', onPress: () => navigation.goBack(), style: 'cancel' },
      ]);
    } else {
      console.log(res);
      Alert.alert("Error", 'Failed to update category');
    }
  };

  const validateInput = () => {
    return image && name;
  };

  const removeImage = () => {
    setImage(null);
  };

  useEffect(() => { }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', height: 10 }} />

      <>
        <View style={styles.headerContainer}>
          <CustomHeader
            onPress={() => navigation.goBack()}
            title="Edit Category"
          />
        </View>
      </>
      <>
        <View style={styles.bodyContainer}>
          <ScrollView style={{ width: '100%', height: '100%' }}>
            <>
              <View style={styles.addImageContainer}>
                <View style={{ width: 25, height: '100%' }} />
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
                <View style={{ width: 25, height: '100%' }} />

                {image ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image
                      source={{ uri: image }}
                      style={{
                        height: 75,
                        width: 75,
                      }}
                    />
                    <TouchableOpacity style={styles.removeButton} onPress={removeImage}>
                      <Text style={styles.removeButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.addImageTextStyles}>
                    (Add picture or video)
                  </Text>
                )}
              </View>
            </>

            <View style={styles.spaceContainer} />

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
                    <Text style={styles.titleInputStyle}>Name Of Category</Text>
                    <Text
                      style={[
                        styles.titleInputStyle,
                        { color: CUSTOM_COLOR.Red },
                      ]}>
                      {' '}
                      *
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.unitTitleContainer,
                      { justifyContent: 'flex-end' },
                    ]}>
                    <Text style={styles.titleInputStyle}>{lengthName}/100</Text>
                    <View style={{ width: '10%', height: '100%' }} />
                  </View>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <View style={{ width: '5%', height: '100%' }} />
                  <TextInput
                    style={{ flex: 1, fontSize: 17 }}
                    onChangeText={text => {
                      if (text.length < 100) {
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

            <View style={styles.spaceContainer} />
            <View style={styles.spaceContainer} />

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
                    <Text style={styles.titleInputStyle}>Description</Text>
                    <Text
                      style={[
                        styles.titleInputStyle,
                        { color: CUSTOM_COLOR.Red },
                      ]}>
                      {' '}
                      *
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <View style={{ width: '5%', height: '100%' }} />
                  <TextInput
                    style={{ flex: 1, fontSize: 17 }}
                    onChangeText={text => setDescription(text)}
                    value={description}
                    placeholder="Enter description"
                  />
                  <View style={{ width: '5%', height: '100%' }} />
                </View>
              </View>
            </>

            <View style={styles.spaceContainer} />
            <View style={styles.spaceContainer} />

            <>
              <View style={styles.buttonContainer}>
                <ButtonDetail
                  style={{ width: '100%', height: 50 }}
                  title={'Save'}
                  color={CUSTOM_COLOR.DarkOrange}
                  onPress={() => setData()}
                />
              </View>
            </>

            <View style={{ width: '100%', height: 10 }} />
          </ScrollView>
        </View>
      </>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  headerContainer: {
    width: '90%',
    height: 70,
    marginHorizontal: '5%',
  },
  bodyContainer: {
    width: '90%',
    height: '85%',
    marginHorizontal: '5%',
  },
  addImageContainer: {
    width: '100%',
    height: 100,
    elevation: 1.5,
    borderRadius: 0.5,
    shadowColor: CUSTOM_COLOR.Black,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagePreviewContainer: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: CUSTOM_COLOR.Red,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: CUSTOM_COLOR.White,
    fontSize: 12,
    fontWeight: 'bold',
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
  spaceContainer: {
    width: '100%',
    height: 10,
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
  buttonContainer: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default EditCategory;
