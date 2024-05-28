import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";
const registerUser = async({data}) => {
    try {
        const url = "/user/register";
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
const getUserType = async({MaND}) => {
    try{
        const idToken = await getIdToken();
        const url = `/user/MaND=${MaND}`;
        const config = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`
          },
        };
        console.log("Token client " + idToken)
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

export {registerUser, getUserType}