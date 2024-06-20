import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const knnRecommendLike = async ({ userId }) => {
    try {
        console.log(userId);
        const idToken = await getIdToken();
        const url = `/knn/knnRecommendLike/userId=${userId}`;
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
const knnRecommendSell = async ({ userId }) => {
    try {
        const idToken = await getIdToken();
        const url = `/knn/knnRecommendSell/userId=${userId}`;
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
const knnRecommendSearch = async ({ userId }) => {
    try {
        const idToken = await getIdToken();
        const url = `/knn/knnRecommendSearch/userId=${userId}`;
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
export { knnRecommendLike, knnRecommendSell, knnRecommendSearch }