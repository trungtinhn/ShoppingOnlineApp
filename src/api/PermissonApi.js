import { getIdToken } from '../middleware/getToken';
import { api } from './AppApi';

// Lấy bảng phân quyền
const getPermissions = async () => {
  try {
    const idToken = await getIdToken();
    const url = '/permissions/getPermissions';
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    };
    const res = await api(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

// Cập nhật bảng phân quyền
const updatePermissions = async ({data: data}) => {
  try {
    const idToken = await getIdToken();
    const url = '/permissions/setPermissions';
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      data: data,
    };
    const res = await api(url, config);
    return res;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      throw error;
    }
  }
};

export {
  getPermissions,
  updatePermissions,
};
