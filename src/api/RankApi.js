import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const upsertRank = async (data) => {
    const idToken = await getIdToken();
    const url = `/rank/upsertRank`;
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        },
        data: JSON.stringify(data),
    }
    const res = await api(url, config);
    return res;
}

const getRank = async (userId) => {
    const idToken = await getIdToken();
    const url = `/rank/${userId}`;
    const config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
        },
    }
    const res = await api(url, config);
    return res;
}

export { upsertRank, getRank }