import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const getAllGlobalCategory = async () => {
    const idToken = await getIdToken();
    const url = `/globalcategory`;
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

export { getAllGlobalCategory };