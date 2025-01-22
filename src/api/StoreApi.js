import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

export const getStoreById = async (id) => {
    const idToken = await getIdToken();
    const url = `store/getStoreById/id=${id.idShop}`;
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
        },
    };
    const res = await api(url, config);
    return res;
};

