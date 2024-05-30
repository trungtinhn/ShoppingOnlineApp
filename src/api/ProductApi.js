import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const addProduct = async ({ data }) => {
  try {
    const idToken = await getIdToken();
    const url = "/products/addProduct";
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

const updateProduct = async ({ productId, data }) => {
  try {
    const idToken = await getIdToken();
    const url = `/products/updateProducts/id=${productId}`;
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

const deleteProduct = async ({ productId }) => {
  try {
    const idToken = await getIdToken();
    const url = `/products/deleteProducts/id=${productId}`;
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

const getAllProducts = async () => {
  try {
    const idToken = await getIdToken();
    const url = "/products/getProducts";
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

const getProductById = async ({ productId }) => {
  try {
    const idToken = await getIdToken();
    const url = `/products/getProduct/id=${productId}`;
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

export { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById };
