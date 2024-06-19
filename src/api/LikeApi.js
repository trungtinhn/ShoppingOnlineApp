import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const addLike = async ({data}) => {
    try {
        const idToken = await getIdToken();
        const url = "/like/addLike";
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
            return error.response;
        } else {
            throw error;
        }
    }
}

const deleteLike = async ({data}) => {
    try {
        const idToken = await getIdToken();
        const url = "/like/deleteLike";
        const config = {
            method: "DELETE",
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
            return error.response;
        } else {
            throw error;
        }
    }
}

const getLikeByUser = async (MaND) => {
    try {
      const idToken = await getIdToken();
      const url = `/like/getLikeByUser/MaND=${MaND}`;
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        }
      };
      const res = await api(url, config);
      return res;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        throw error;
      }
    }
}
const checkLike = async ({data}) => {
    try {
        console.log(data);
        const idToken = await getIdToken();
        const url = "/like/checkLike";
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
            return error.response;
        } else {
            throw error;
        }
    }
}

export { addLike, deleteLike, getLikeByUser, checkLike };
