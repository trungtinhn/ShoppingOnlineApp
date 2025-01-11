import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const createStore = async({data}) => {
    try {
        const idToken = await getIdToken();
        const url = "/store/addStore";
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
export { createStore };