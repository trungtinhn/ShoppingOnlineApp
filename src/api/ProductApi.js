import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const addProduct = async ({ data }) => {
  try {
    const idToken = await getIdToken();
    const url = "/products";
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
    const url = `/products/${productId}`;
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
    const url = `/products/${productId}`;
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
    const url = "/products";
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
    const url = `/products/${productId}`;
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
const getProductTrending = async () => {
    try {
      const idToken = await getIdToken();
      const url = "/products/getProductTrending";
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
  
  const getProductOnsale = async () => {
    try {
      const idToken = await getIdToken();
      const url = "/products/getProductOnsale";
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
  
  const getProductByCategory = async ({ MaDM }) => {
    try {
      const idToken = await getIdToken();
      const url = `/products/getProductByCategory/MaDM=${MaDM}`;
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
  
  const getProductAvailable = async () => {
    try {
      const idToken = await getIdToken();
      const url = "/products/getProductAvailable";
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
  
  const getProductOnwait = async () => {
    try {
      const idToken = await getIdToken();
      const url = "/products/getProductOnwait";
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
  
  const getProductOutofstock = async () => {
    try {
      const idToken = await getIdToken();
      const url = "/products/getProductOutofstock";
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
  
  export {
    getProductTrending,
    getProductOnsale,
    getProductByCategory,
    getProductAvailable,
    getProductOnwait,
    getProductOutofstock
  };  

export { addProduct, updateProduct, deleteProduct, getAllProducts, getProductById };
