import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

// Fetch the latest message and unread count for each chat
const getChatSummary = async ({data}) => {
  try {
    const idToken = await getIdToken();
    const url = `/messages/chat/summary`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
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
};

export { getChatSummary};
