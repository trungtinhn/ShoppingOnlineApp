import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const addAddress = async ({ data }) => {
  try {
    const idToken = await getIdToken();
    const url = "/addresses/addAddress";
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
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

const updateAddress = async ({ addressId, data }) => {
  try {
    const idToken = await getIdToken();
    const url = `/addresses/updateAddress/id=${addressId}`;
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
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

const deleteAddress = async ({ addressId }) => {
  try {
    const idToken = await getIdToken();
    const url = `/addresses/deleteAddress/id=${addressId}`;
    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
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

const getAllAddresses = async () => {
  try {
    const idToken = await getIdToken();
    const url = "/addresses/getAddresses";
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
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

const getAddressById = async ({ addressId }) => {
  try {
    const idToken = await getIdToken();
    const url = `/addresses/getAddress/id=${addressId}`;
    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
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

export { addAddress, updateAddress, deleteAddress, getAllAddresses, getAddressById };
