import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createRole, getAllRole, updateRole} from '../../api/RoleApi';
import {firebase} from '../../../firebase/firebase';
import {getCurrentUserData} from '../../api/UserApi';

const StoreRoleManagement = () => {
  const [storeRole, setStoreRole] = useState(null); // Chỉ 1 role duy nhất
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    displayName: '',
    permissions: [],
  });

  // Danh sách quyền mặc định cho nhân viên cửa hàng
  const defaultPermissions = [
    {key: 'manage_storePromotion', label: 'Quản lý khuyến mãi'},
    {key: 'manage_category', label: 'Quản lý danh mục'},
    {key: 'manage_product', label: 'Quản lý sản phẩm'},
    {key: 'manage_inventory', label: 'Quản lý kho hàng'},
    {key: 'manage_order', label: 'Quản lý đơn hàng'},
    {key: 'view_report', label: 'Xem báo cáo'},
    {key: 'chat_with_customer', label: 'Chat với khách hàng'},
    {key: 'manage_customer', label: 'Quản lý khách hàng'},
  ];

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      setLoading(true);
      const userUid = firebase.auth().currentUser.uid;
      const userData = await getCurrentUserData({userId: userUid});
      
      if (userData.status === 200) {
        setCurrentUser(userData.data);
        await fetchStoreRole(userData.data.storeId);
      } else {
        Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi tải dữ liệu');
      console.log('Error initializing data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStoreRole = async (storeId) => {
    try {
      const res = await getAllRole();
      
      if (res.status === 200) {
        // Tìm role duy nhất của cửa hàng
        const foundRole = res.data.find(role => {
          const roleStoreId = role.storeId?.toString() || role.storeId;
          const currentStoreId = storeId?.toString() || storeId;
          return roleStoreId === currentStoreId && role.name === 'admin_staff';
        });
        
        if (foundRole) {
          setStoreRole(foundRole);
          setFormData({
            displayName: foundRole.displayName || '',
            permissions: foundRole.permissions || [],
          });
        } else {
          setStoreRole(null);
          setFormData({
            displayName: '',
            permissions: [],
          });
        }
      }
    } catch (error) {
      console.log('Error fetching role:', error);
    }
  };

  const handlePermissionToggle = (permissionKey) => {
    const newPermissions = formData.permissions.includes(permissionKey)
      ? formData.permissions.filter(p => p !== permissionKey)
      : [...formData.permissions, permissionKey];
    
    setFormData(prev => ({
      ...prev,
      permissions: newPermissions,
    }));
  };

  const handleSaveRole = async () => {
    if (!formData.displayName.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên hiển thị cho vai trò');
      return;
    }

    try {
      setSaving(true);
      
      const roleData = {
        name: 'admin_staff',
        displayName: formData.displayName.trim(),
        permissions: formData.permissions,
        storeId: currentUser.storeId,
      };

      let response;
      if (storeRole) {
        // Cập nhật role có sẵn
        response = await updateRole(storeRole._id, roleData);
      } else {
        // Tạo role mới
        response = await createRole(roleData);
      }
      if (response?.status === 200 || response?.status === 201) {
        Alert.alert('Thành công', 'Lưu cài đặt quyền thành công!');
        
        // Refresh lại data
        await fetchStoreRole(currentUser.storeId);
      } else {
        Alert.alert('Lỗi', response?.message || 'Không thể lưu cài đặt');
      }
    } catch (error) {
      console.log('Save error:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi lưu: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateNewRole = () => {
    setFormData({
      displayName: 'Nhân viên cửa hàng',
      permissions: [],
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF4500" />
          <Text style={styles.loadingText}>Đang tải cài đặt quyền...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cài đặt quyền nhân viên</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
        {storeRole || formData.displayName ? (
          // Hiển thị form chỉnh sửa trực tiếp
          <View style={styles.roleContainer}>
            <View style={styles.roleHeader}>
              <Text style={styles.roleTitle}>Quyền hạn nhân viên cửa hàng</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Tên vai trò *</Text>
              <TextInput
                style={styles.input}
                value={formData.displayName}
                onChangeText={text =>
                  setFormData(prev => ({...prev, displayName: text}))
                }
                placeholder="Ví dụ: Nhân viên bán hàng, Quản lý kho..."
              />
            </View>

            <View style={styles.permissionsSection}>
              <Text style={styles.sectionTitle}>Phân quyền chức năng</Text>
              <Text style={styles.sectionDescription}>
                Chọn các quyền phù hợp cho nhân viên cửa hàng
              </Text>

              {defaultPermissions.map(permission => (
                <View key={permission.key} style={styles.permissionItem}>
                  <View style={styles.permissionInfo}>
                    <Text style={styles.permissionLabel}>{permission.label}</Text>
                  </View>
                  <Switch
                    value={formData.permissions.includes(permission.key)}
                    onValueChange={() => handlePermissionToggle(permission.key)}
                    trackColor={{false: '#cccccc', true: '#FFA500'}}
                    thumbColor={
                      formData.permissions.includes(permission.key)
                        ? '#FF4500'
                        : '#f4f3f4'
                    }
                  />
                </View>
              ))}
            </View>

            <View style={styles.saveSection}>
              <TouchableOpacity
                style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                onPress={handleSaveRole}
                disabled={saving}>
                {saving ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>
                    {saving ? 'Đang lưu...' : 'Lưu cài đặt'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {storeRole && (
              <View style={styles.infoSection}>
                <Text style={styles.infoText}>
                  Cài đặt này áp dụng cho tất cả nhân viên có vai trò "{formData.displayName}"
                </Text>
                <Text style={styles.lastUpdate}>
                  Cập nhật lần cuối: {new Date(storeRole.updatedAt).toLocaleString('vi-VN')}
                </Text>
              </View>
            )}
          </View>
        ) : (
          // Hiển thị giao diện tạo mới khi chưa có role
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Chưa có cài đặt quyền</Text>
            <Text style={styles.emptyDescription}>
              Cửa hàng của bạn chưa thiết lập quyền hạn cho nhân viên.{'\n'}
              Hãy tạo cài đặt quyền đầu tiên.
            </Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateNewRole}>
              <Text style={styles.createButtonText}>Thiết lập quyền hạn</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212529',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  roleContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginLeft: 10,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#212529',
  },
  permissionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
    lineHeight: 20,
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa',
  },
  permissionInfo: {
    flex: 1,
    marginRight: 16,
  },
  permissionLabel: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
  saveSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#FF4500', // OrangeRed
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#CD853F', // Peru
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 8,
  },
  lastUpdate: {
    fontSize: 12,
    color: '#6c757d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginTop: 24,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  createButton: {
    backgroundColor: '#FF4500',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#495057',
  },
});

export default StoreRoleManagement;