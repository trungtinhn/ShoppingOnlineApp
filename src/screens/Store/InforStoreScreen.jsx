import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {addStore} from '../../api/StoreApi';
import {getCurrentUserData} from '../../api/UserApi';
import TextInputCard from '../../components/Login_SignUp/TextInputCard';
import CustomButton from '../../components/Login_SignUp/CustomButton';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import {firebase} from '../../../firebase/firebase';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const InforStoreScreen = ({navigation}) => {
  // Basic store information
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeDescription, setStoreDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  
  // GHN Address Information - simplified to match backend
  const [provinceName, setProvinceName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');
  
  // Remove these as backend doesn't need them
  // const [provinceId, setProvinceId] = useState('');
  // const [districtId, setDistrictId] = useState('');
  // const [wardCode, setWardCode] = useState('');
  
  // User data
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);

  // Image state
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const isValidForm = () => {
    if (!storeName.trim()) {
      return 'Please enter your store name';
    }
    if (!storeAddress.trim()) {
      return 'Please enter your store address';
    }
    if (!phoneNumber.trim()) {
      return 'Please enter your phone number';
    }
    if (!/^[0-9]{10,15}$/.test(phoneNumber)) {
      return 'Phone number must be 10-15 digits';
    }
    if (!email.trim()) {
      return 'Please enter your email';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address';
    }
    if (!provinceName.trim() || !districtName.trim() || !wardName.trim()) {
      return 'Please enter complete address information (Province, District, Ward names)';
    }
    if (storeDescription.length > 500) {
      return 'Store description must be less than 500 characters';
    }
    return null;
  };

  const handleCurrentUser = async () => {
    try {
      const userUid = firebase.auth().currentUser.uid;
      const res = await getCurrentUserData({userId: userUid});
      if (res.status === 200) {
        setCurrentUser(res.data);
        // Pre-fill email and phone from user data
        setEmail(res.data.email || '');
        setPhoneNumber(res.data.phone || '');
      }
    } catch (error) {
      console.log('Error getting current user:', error);
      Alert.alert('Error', 'Failed to load user information');
    }
  };

  // Request camera permission for Android
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        
        const cameraPermission = granted[PermissionsAndroid.PERMISSIONS.CAMERA];
        const storagePermission = granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];
        
        if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED || 
            storagePermission !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera or storage permission denied');
        }
      } catch (err) {
        console.warn('Permission request error:', err);
      }
    }
  };

  // Image picker options
  const imagePickerOptions = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
    quality: 0.8,
  };

  // Handle image selection
  const handleImagePicker = () => {
    Alert.alert(
      'Select Store Image',
      'Choose how you want to add a store image',
      [
        {
          text: 'Camera',
          onPress: () => openCamera(),
        },
        {
          text: 'Gallery',
          onPress: () => openGallery(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const openCamera = () => {
    launchCamera(imagePickerOptions, (response) => {
      handleImageResponse(response);
    });
  };

  const openGallery = () => {
    launchImageLibrary(imagePickerOptions, (response) => {
      handleImageResponse(response);
    });
  };

  const handleImageResponse = (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }

    if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
      Alert.alert('Error', 'Failed to select image. Please try again.');
      return;
    }

    if (response.assets && response.assets[0]) {
      const selectedImage = response.assets[0];
      setSelectedImage(selectedImage);
      setImageUri(selectedImage.uri);
      console.log('Image selected:', selectedImage);
    }
  };

  const removeImage = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove this image?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setSelectedImage(null);
            setImageUri(null);
          },
        },
      ]
    );
  };

  useEffect(() => {
    handleCurrentUser();
    requestCameraPermission();
  }, []);

  const handleSave = async () => {
    const errorMessage = isValidForm();
    if (errorMessage) {
      Alert.alert('Validation Error', errorMessage);
      return;
    }

    try {
      setLoading(true);
      
      // Debug: Log all values before processing
      // console.log('Raw values before processing:');
      // console.log('storeName:', storeName);
      // console.log('storeAddress:', storeAddress);
      // console.log('storeDescription:', storeDescription);
      // console.log('phoneNumber:', phoneNumber);
      // console.log('email:', email);
      // console.log('currentUser._id:', currentUser._id);
      // console.log('provinceName:', provinceName);
      // console.log('districtName:', districtName);
      // console.log('wardName:', wardName);

      //Phần này chưa có up ảnh lên firebase nên hiện tại store sẽ không có ảnh.
      const storeData = {
        name: storeName?.trim() || '',
        address: storeAddress?.trim() || '',
        description: storeDescription?.trim() || '',
        phoneNumber: phoneNumber?.trim() || '',
        email: email?.trim()?.toLowerCase() || '',
        image: selectedImage ? selectedImage.uri : 'default_image_url', // Use selected image
        ownerId: currentUser._id || '',
        status: 'pending',
        
        // Coordinates (required by backend)
        latitude: 10.7769,
        longitude: 106.7009,
        
        // Address names (backend will resolve to IDs automatically)
        provinceName: provinceName?.trim() || '',
        districtName: districtName?.trim() || '',
        wardName: wardName?.trim() || '',
      };

      console.log('Store data to submit:', storeData);
      
      const res = await addStore(storeData);
      
      if (res.status === 201) {
        Alert.alert(
          'Success', 
          'Store information submitted successfully! Your store is pending admin approval.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('StoreHomeScreen')
            }
          ]
        );
      } else {
        console.log('Error creating store:', res);
        Alert.alert('Error', res.data?.message || res.error || 'Failed to create store. Please try again.');
      }
    } catch (error) {
      console.log('Error in handleSave:', error);
      Alert.alert('Error', `An unexpected error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollview}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>Store Information</Text>
          <Text style={styles.subtitleText}>Fill in your store details</Text>
        </View>

        {/* Store Image Section */}
        <View style={styles.unitContainer}>
          <Text style={styles.sectionTitle}>Store Image</Text>
          
          <View style={styles.imageSection}>
            <TouchableOpacity 
              style={styles.imageContainer} 
              onPress={handleImagePicker}
            >
              {imageUri ? (
                <View style={styles.imageWrapper}>
                  <Image source={{uri: imageUri}} style={styles.selectedImage} />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={removeImage}
                  >
                    <Text style={styles.removeImageText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderIcon}>📷</Text>
                  <Text style={styles.imagePlaceholderText}>Tap to add store image</Text>
                  <Text style={styles.imagePlaceholderSubtext}>Camera or Gallery</Text>
                </View>
              )}
            </TouchableOpacity>
            
            {imageUri && (
              <View style={styles.imageInfo}>
                <Text style={styles.imageInfoText}>
                  ✓ Image selected ({selectedImage?.fileName || 'store-image.jpg'})
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Basic Information Section */}
        <View style={styles.unitContainer}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          {/* Store Name */}
          <View style={styles.inputContainer}>
            <TextInputCard
              title="Store Name *"
              txtInput="Enter your store name"
              value={storeName}
              onChangeText={setStoreName}
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputContainer}>
            <TextInputCard
              title="Phone Number *"
              txtInput="Enter store phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <TextInputCard
              title="Email *"
              txtInput="Enter store email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Store Description */}
          <View style={styles.inputContainer}>
            <TextInputCard
              title="Store Description"
              txtInput="Describe your store (optional)"
              value={storeDescription}
              onChangeText={setStoreDescription}
            />
            <Text style={styles.charCount}>{storeDescription.length}/500</Text>
          </View>
        </View>

        {/* Address Information Section */}
        <View style={styles.unitContainer}>
          <Text style={styles.sectionTitle}>Address Information</Text>
          
          {/* Full Address */}
          <View style={styles.inputContainer}>
            <TextInputCard
              title="Full Address *"
              txtInput="Enter complete store address"
              value={storeAddress}
              onChangeText={setStoreAddress}
            />
          </View>

          {/* Province Name */}
          <View style={styles.inputContainer}>
            <TextInputCard
              title="Province Name *"
              txtInput="e.g. Ho Chi Minh, Ha Noi"
              value={provinceName}
              onChangeText={setProvinceName}
            />
          </View>

          {/* District Name */}
          <View style={styles.inputContainer}>
            <TextInputCard
              title="District Name *"
              txtInput="e.g. District 1, District 3"
              value={districtName}
              onChangeText={setDistrictName}
            />
          </View>

          {/* Ward Name */}
          <View style={styles.inputContainer}>
            <TextInputCard
              title="Ward Name *"
              txtInput="e.g. Ben Nghe Ward, Nguyen Thai Binh Ward"
              value={wardName}
              onChangeText={setWardName}
            />
          </View>
        </View>

        {/* Info Note */}
        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>📋 Important Notes:</Text>
          <Text style={styles.noteText}>
            • All fields marked with (*) are required{'\n'}
            • Your store will be pending admin approval{'\n'}
            • Enter exact province/district/ward names for shipping{'\n'}
            • Default location: Ho Chi Minh City{'\n'}
            • Address will be automatically resolved by system
          </Text>
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            type="primary"
            text={loading ? "Creating..." : "Create Store"}
            onPress={handleSave}
            disabled={loading}
          />
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR?.White || '#FFFFFF',
  },
  scrollview: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    fontFamily: FONT_FAMILY?.Bold || 'System',
    color: CUSTOM_COLOR?.Black || '#000000',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY?.Light || 'System',
    color: CUSTOM_COLOR?.Gray || '#666666',
    textAlign: 'center',
  },
  unitContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: FONT_FAMILY?.Medium || 'System',
    color: CUSTOM_COLOR?.Black || '#000000',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: CUSTOM_COLOR?.LightGray || '#E0E0E0',
    paddingBottom: 10,
  },
  inputContainer: {
    height: 80, // Fixed height for TextInputCard compatibility
    marginBottom: 15,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: CUSTOM_COLOR?.Gray || '#666666',
    marginTop: 5,
  },
  noteContainer: {
    backgroundColor: CUSTOM_COLOR?.LightGray || '#F5F5F5',
    margin: 20,
    padding: 16,
    borderRadius: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontFamily: FONT_FAMILY?.Medium || 'System',
    color: CUSTOM_COLOR?.Black || '#000000',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY?.Light || 'System',
    color: CUSTOM_COLOR?.Gray || '#666666',
    lineHeight: 20,
  },
  buttonContainer: {
    height: 60, // Fixed height for CustomButton compatibility
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bottomSpace: {
    height: 30,
  },
  // Image Styles
  imageSection: {
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: CUSTOM_COLOR?.LightGray || '#E0E0E0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR?.White || '#FFFFFF',
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  imagePlaceholderIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  imagePlaceholderText: {
    fontSize: 16,
    fontFamily: FONT_FAMILY?.Medium || 'System',
    color: CUSTOM_COLOR?.Black || '#000000',
    marginBottom: 4,
  },
  imagePlaceholderSubtext: {
    fontSize: 12,
    fontFamily: FONT_FAMILY?.Light || 'System',
    color: CUSTOM_COLOR?.Gray || '#666666',
  },
  imageInfo: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: CUSTOM_COLOR?.LightGray || '#F0F0F0',
    borderRadius: 6,
  },
  imageInfoText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY?.Light || 'System',
    color: CUSTOM_COLOR?.Black || '#000000',
    textAlign: 'center',
  },
});
export default InforStoreScreen;