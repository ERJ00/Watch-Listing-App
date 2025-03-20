// Import the functions you need from the SDKs you need
//@ts-nocheck

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import config from "./config";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: config.AUTH_DOMAIN,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.MESSAGING_SENDER_ID,
  appId: config.APP_ID,
  measurementId: config.MEASUREMENT_ID,
};

// Initialize Firebase
export const FIREBASEAPP = initializeApp(firebaseConfig);
// export const ANALYTICS = getAnalytics(FIREBASEAPP);
export const FIREBASEAUTH = getAuth(FIREBASEAPP);
export const FIRESTORE = getFirestore(FIREBASEAPP);
