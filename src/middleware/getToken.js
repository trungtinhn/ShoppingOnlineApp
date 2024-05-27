import {firebase} from '../../firebase/firebase'

export const getIdToken = async () => {
  const user = firebase.auth().currentUser;
  if (user) {
    return await user.getIdToken();
  } else {
    throw new Error('User is not authenticated');
  }
};