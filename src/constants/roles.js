// src/constants/roles.js
// Định nghĩa các Role IDs cố định
// LƯU Ý: Thay đổi các ID này theo database thực tế của bạn

export const ROLE_IDS = {
  CUSTOMER: '682cf29a7d2a6f720e274fac',        // Thay bằng ID thực từ database
  STORE_OWNER: '682cf25e7d2a6f720e274fa6',  // Thay bằng ID thực từ database  
  STAFF: '682cf2827d2a6f720e274fa9',              // Thay bằng ID thực từ database
};

export const ROLE_NAMES = {
  CUSTOMER: 'customer',
  STORE_OWNER: 'admin_shop', 
  ADMIN: 'admin_app',
  STAFF: 'admin_staff',
};

// Helper function để lấy role ID từ role name
export const getRoleIdByName = (roleName) => {
  const roleMap = {
    [ROLE_NAMES.CUSTOMER]: ROLE_IDS.CUSTOMER,
    [ROLE_NAMES.STORE_OWNER]: ROLE_IDS.STORE_OWNER,
    [ROLE_NAMES.ADMIN]: ROLE_IDS.ADMIN,
    [ROLE_NAMES.STAFF]: ROLE_IDS.STAFF,
  };
  
  return roleMap[roleName] || null;
};

// Helper function để lấy role name từ role ID  
export const getRoleNameById = (roleId) => {
  const idMap = {
    [ROLE_IDS.CUSTOMER]: ROLE_NAMES.CUSTOMER,
    [ROLE_IDS.STORE_OWNER]: ROLE_NAMES.STORE_OWNER,
    [ROLE_IDS.ADMIN]: ROLE_NAMES.ADMIN,
    [ROLE_IDS.STAFF]: ROLE_NAMES.STAFF,
  };
  
  return idMap[roleId] || null;
};