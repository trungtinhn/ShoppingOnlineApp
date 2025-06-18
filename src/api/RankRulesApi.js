import {getIdToken} from '../middleware/getToken';
import {api} from './AppApi';

const getAllRankRules = async () => {
  try {
    const idToken = await getIdToken();
    const url = '/rankRule/all';
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
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
const upDateRankRule = async ({rank, data}) => {
  try {
    console.log(data);
    const idToken = await getIdToken();
    const url = `/rankRule/${rank}`;
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
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
export {getAllRankRules, upDateRankRule};
