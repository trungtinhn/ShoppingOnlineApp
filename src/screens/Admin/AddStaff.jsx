import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import LoadingComponent from '../../components/LoadingComponent';
import CUSTOM_COLOR from '../../constants/color';
import FONT_FAMILY from '../../constants/font';
import { firebase } from '../../../firebase/firebase';
import { registerUser, getCurrentUserData } from '../../api/UserApi';
import { getStaffRole, checkStaffRole } from '../../api/RoleApi';

const AddStaff = ({ navigation }) => {
  // Form data states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dateOfBirth: new Date(),
    userType: '', // Role ID sẽ được set tự động
    password: '',
    confirmPassword: '',
  });

  // UI states
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [staffRole, setStaffRole] = useState(null);

  // Validation states
  const [errors, setErrors] = useState({});

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setIsLoading(true);
    try {
      await getCurrentUser();
    } catch (error) {
      console.error('Error initializing data:', error);
      Alert.alert('Lỗi', 'Không thể tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      const user = firebase.auth().currentUser;
      if (user) {
        const response = await getCurrentUserData({ userId: user.uid });
        const userData = response.data;
        setCurrentUserData(userData);
        
        // Load staff role cho store
        await loadStaffRole(userData.storeId);
      }
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  };

  const loadStaffRole = async (storeId) => {
    try {
      // Kiểm tra xem có role admin_staff chưa
      const checkResponse = await checkStaffRole({ storeId });
      if (checkResponse.status === 200) {
        // Nếu có role, lấy thông tin role
        const roleResponse = await getStaffRole({ storeId });
        if (roleResponse.status === 200) {
          setFormData(prev => ({ ...prev, userType: roleResponse.data.data._id }));
        }
      } else {
        // Nếu chưa có role admin_staff, yêu cầu tạo
        Alert.alert(
          'Thiết lập vai trò nhân viên',
          'Cửa hàng của bạn chưa có vai trò "Nhân viên cửa hàng". Bạn cần thiết lập vai trò này trước khi thêm nhân viên.',
          [
            {
              text: 'Hủy',
              style: 'cancel',
              onPress: () => navigation.goBack(),
            },
            {
              text: 'Thiết lập vai trò',
              onPress: () => {
                navigation.navigate('StoreRoleManagement', { 
                  storeId: storeId,
                  returnTo: 'AddStaff',
                  needCreateStaffRole: true
                });
              },
            },
          ],
        );
      }
    } catch (error) {
      console.error('Error loading staff role:', error);
      Alert.alert('Lỗi', 'Không thể tải thông tin vai trò nhân viên.');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-15 chữ số)';
    }

    if (!formData.userType) {
      newErrors.userType = 'Lỗi: Chưa có vai trò nhân viên được thiết lập';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận mật khẩu không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Lỗi', 'Vui lòng kiểm tra lại thông tin đã nhập.');
      return;
    }

    setIsLoading(true);
    
    // Lưu thông tin user hiện tại
    const currentUser = firebase.auth().currentUser;
    
    try {
      // Tạo tài khoản Firebase Authentication cho nhân viên
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );

      const firebaseUser = userCredential.user;

      // Tạo user trong database với cấu trúc giống như handleRegister
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        userId: firebaseUser.uid,
        userType: formData.userType, // Role ID của admin_staff
        avatar: 'default_avatar_url', // Giống như mặc định
        storeId: currentUserData.storeId,
        address: formData.address,
        gender: formData.gender,
      };

      console.log('Creating staff account with data:', userData);
      const response = await registerUser({ data: userData });

      if (response.status === 201) {
        // Đăng xuất tài khoản nhân viên vừa tạo
        await firebase.auth().signOut();
        
        // Đăng nhập lại với tài khoản chủ cửa hàng
        if (currentUser) {
          // Sử dụng signInWithCredential để đăng nhập lại
          // Hoặc có thể reload lại currentUser
          await firebase.auth().updateCurrentUser(currentUser);
        }

        Alert.alert(
          'Thành công',
          'Tài khoản nhân viên đã được tạo thành công!\nBạn vẫn đang đăng nhập với tài khoản chủ cửa hàng.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        console.log('Register staff failed:', response);
        throw new Error(response.data?.message || 'Không thể tạo tài khoản');
      }
    } catch (error) {
      console.error('Error creating staff account:', error);
      
      // Đảm bảo đăng nhập lại với tài khoản chủ cửa hàng nếu có lỗi
      try {
        if (currentUser && firebase.auth().currentUser?.uid !== currentUser.uid) {
          await firebase.auth().updateCurrentUser(currentUser);
        }
      } catch (authError) {
        console.error('Error restoring auth state:', authError);
      }
      
      // Handle specific Firebase errors
      let userFriendlyMessage = 'Không thể tạo tài khoản. Vui lòng thử lại.';
      if (error.code === 'auth/email-already-in-use') {
        userFriendlyMessage = 'Email này đã được sử dụng. Vui lòng sử dụng email khác.';
      } else if (error.code === 'auth/weak-password') {
        userFriendlyMessage = 'Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn.';
      } else if (error.code === 'auth/invalid-email') {
        userFriendlyMessage = 'Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại email.';
      }
      
      Alert.alert('Lỗi tạo tài khoản', userFriendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, dateOfBirth: selectedDate });
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN');
  };

  // Function để chuyển đổi permission key thành label tiếng Việt
  const getPermissionLabel = (permissionKey) => {
    const permissionMap = {
      'manage_storePromotion': 'Quản lý khuyến mãi',
      'manage_category': 'Quản lý danh mục',
      'manage_product': 'Quản lý sản phẩm',
      'manage_inventory': 'Quản lý kho hàng',
      'manage_order': 'Quản lý đơn hàng',
      'view_report': 'Xem báo cáo',
      'chat_with_customer': 'Chat với khách hàng',
      'manage_customer': 'Quản lý khách hàng',
    };
    return permissionMap[permissionKey] || permissionKey;
  };

  // Callback khi quay lại từ StoreRoleManagement
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Reload staff role khi quay lại màn hình
      if (currentUserData?.storeId && !staffRole) {
        loadStaffRole(currentUserData.storeId);
      }
    });

    return unsubscribe;
  }, [navigation, currentUserData, staffRole]);

  if (isLoading) {
    return <LoadingComponent text="Đang xử lý..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Thêm nhân viên mới</Text>
          <Text style={styles.headerSubtitle}>
            Nhập thông tin để tạo tài khoản cho nhân viên
          </Text>
          {staffRole && (
            <View style={styles.roleInfoContainer}>
              <Text style={styles.roleInfoText}>
                Vai trò: <Text style={styles.roleInfoHighlight}>{staffRole.displayName}</Text>
              </Text>
              <Text style={styles.permissionTitle}>Quyền hạn nhân viên:</Text>
              <View style={styles.permissionsContainer}>
                {staffRole.permissions && staffRole.permissions.length > 0 ? (
                  staffRole.permissions.map((permission, index) => (
                    <View key={index} style={styles.permissionBadge}>
                      <Text style={styles.permissionText}>
                        {getPermissionLabel(permission)}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noPermissionsText}>Chưa có quyền nào được cấp</Text>
                )}
              </View>
            </View>
          )}
        </View>

        <View style={styles.formContainer}>
          {/* Họ tên */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Họ và tên *</Text>
            <TextInput
              style={[styles.input, errors.fullName && styles.inputError]}
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
              placeholder="Nhập họ và tên"
              placeholderTextColor={CUSTOM_COLOR.SlateGray}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Nhập email"
              placeholderTextColor={CUSTOM_COLOR.SlateGray}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Số điện thoại */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại *</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholder="Nhập số điện thoại"
              placeholderTextColor={CUSTOM_COLOR.SlateGray}
              keyboardType="phone-pad"
            />
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
          </View>

          {/* Địa chỉ */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Địa chỉ</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              placeholder="Nhập địa chỉ"
              placeholderTextColor={CUSTOM_COLOR.SlateGray}
            />
          </View>

          {/* Giới tính */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Giới tính</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'male' && styles.genderButtonSelected
                ]}
                onPress={() => setFormData({ ...formData, gender: 'male' })}
              >
                <Text style={[
                  styles.genderButtonText,
                  formData.gender === 'male' && styles.genderButtonTextSelected
                ]}>Nam</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderButton,
                  formData.gender === 'female' && styles.genderButtonSelected
                ]}
                onPress={() => setFormData({ ...formData, gender: 'female' })}
              >
                <Text style={[
                  styles.genderButtonText,
                  formData.gender === 'female' && styles.genderButtonTextSelected
                ]}>Nữ</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Ngày sinh */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ngày sinh</Text>
            <TouchableOpacity
              style={styles.dateSelector}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(formData.dateOfBirth)}</Text>
              <Text style={styles.dropdownIcon}>📅</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={formData.dateOfBirth}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}
          </View>

          {/* Mật khẩu */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mật khẩu *</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
              placeholderTextColor={CUSTOM_COLOR.SlateGray}
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Xác nhận mật khẩu */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Xác nhận mật khẩu *</Text>
            <TextInput
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor={CUSTOM_COLOR.SlateGray}
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          {/* Hiển thị lỗi role nếu có */}
          {errors.userType && (
            <View style={styles.roleErrorContainer}>
              <Text style={styles.errorText}>{errors.userType}</Text>
              <TouchableOpacity
                style={styles.retryRoleButton}
                onPress={() => loadStaffRole(currentUserData?.storeId)}
              >
                <Text style={styles.retryRoleButtonText}>Thử lại</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!staffRole || isLoading) && styles.submitButtonDisabled
            ]}
            onPress={handleSubmit}
            disabled={!staffRole || isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Đang tạo...' : 'Tạo tài khoản'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_COLOR.White,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.Semibold,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: CUSTOM_COLOR.SlateGray,
    fontFamily: FONT_FAMILY.Semibold,
  },
  roleInfoContainer: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c3e6c3',
  },
  roleInfoText: {
    fontSize: 14,
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.Semibold,
    marginBottom: 4,
  },
  roleInfoHighlight: {
    fontWeight: 'bold',
    color: '#2d5a2d',
  },
  permissionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d5a2d',
    marginTop: 8,
    marginBottom: 8,
    fontFamily: FONT_FAMILY.Medium,
  },
  permissionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  permissionBadge: {
    backgroundColor: '#d4edda',
    borderWidth: 1,
    borderColor: '#c3e6c3',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 4,
  },
  permissionText: {
    fontSize: 11,
    color: '#2d5a2d',
    fontWeight: '500',
    fontFamily: FONT_FAMILY.Medium,
  },
  noPermissionsText: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
    fontFamily: FONT_FAMILY.Semibold,
  },
  rolePermissionsText: {
    fontSize: 12,
    color: '#2d5a2d',
    fontFamily: FONT_FAMILY.Semibold,
    fontStyle: 'italic',
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: CUSTOM_COLOR.Black,
    marginBottom: 8,
    fontFamily: FONT_FAMILY.Medium,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: CUSTOM_COLOR.White,
    fontFamily: FONT_FAMILY.Semibold,
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginTop: 5,
    fontFamily: FONT_FAMILY.Semibold,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: CUSTOM_COLOR.White,
  },
  genderButtonSelected: {
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    borderColor: CUSTOM_COLOR.FlushOrange,
  },
  genderButtonText: {
    fontSize: 16,
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.Semibold,
  },
  genderButtonTextSelected: {
    color: CUSTOM_COLOR.White,
    fontWeight: 'bold',
  },
  dateSelector: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: CUSTOM_COLOR.White,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: CUSTOM_COLOR.Black,
    fontFamily: FONT_FAMILY.Semibold,
  },
  dropdownIcon: {
    fontSize: 12,
    color: CUSTOM_COLOR.SlateGray,
  },
  roleErrorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffe6e6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  retryRoleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    borderRadius: 6,
  },
  retryRoleButtonText: {
    color: CUSTOM_COLOR.White,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.Medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: CUSTOM_COLOR.SlateGray,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: CUSTOM_COLOR.SlateGray,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.Medium,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: CUSTOM_COLOR.FlushOrange,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    fontSize: 16,
    color: CUSTOM_COLOR.White,
    fontWeight: 'bold',
    fontFamily: FONT_FAMILY.Medium,
  },
  bottomPadding: {
    height: 30,
  },
});

export default AddStaff;