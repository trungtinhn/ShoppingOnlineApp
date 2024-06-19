import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const addPromotion = async ({ data }) => {
  try {
    const idToken = await getIdToken();
    const url = "/promotion/addPromotion";
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

const getAllPromotions = async () => {
  try {
    const idToken = await getIdToken();
    const url = "/promotion/getAllPromotions";
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

const getPromotionById = async ({ id }) => {
  try {
    const idToken = await getIdToken();
    const url = `/promotion/getPromotionById/id=${id}`;
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

const updatePromotion = async ({ id, data }) => {
  try {
    const idToken = await getIdToken();
    const url = `/promotion/updatePromotion/id=${id}`;
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

const deletePromotion = async ({ id }) => {
  try {
    const idToken = await getIdToken();
    const url = `/promotion/deletePromotion/id=${id}`;
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

const getPromotionCurrent = async () => {
  try {
    const idToken = await getIdToken();
    const url = "/promotion/getPromotionCurrent";
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

const checkPromotion = async ({ id }) => {
  try {
    const idToken = await getIdToken();
    const url = `/promotion/checkPromotion/id=${id}`;
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

export { addPromotion, getAllPromotions, getPromotionById, updatePromotion, deletePromotion, getPromotionCurrent, checkPromotion };
