// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPw4_SZc0gdWPxTpApjid0SrbbdRFnsRA",
  authDomain: "shoppingapp-a20a4.firebaseapp.com",
  projectId: "shoppingapp-a20a4",
  storageBucket: "shoppingapp-a20a4.appspot.com",
  messagingSenderId: "290796953622",
  appId: "1:290796953622:web:19baaa4f754afa99a6d537",
  measurementId: "G-GS65ZJ605C"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
export {firebase};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
//const messaging = getMessaging(app);
// Initialize Firebase Authentication and get a reference to the service
//const auth = getAuth(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });