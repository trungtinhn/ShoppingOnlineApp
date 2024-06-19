import {api} from "./AppApi";
import {getIdToken} from "../middleware/getToken";

const fetchPaymentSheetParams = async (totalOrder) => {
    try {
        const idToken = await getIdToken();
        const url = "/payment/paymentSheet";
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
            },
            data: {totalOrder},
        };
        const res = await api(url, config);
        const { paymentIntent, ephemeralKey, customer} = res.data;
        return {
        paymentIntent,
        ephemeralKey,
        customer,
        };
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            throw error;
        }
    }
};

export default fetchPaymentSheetParams