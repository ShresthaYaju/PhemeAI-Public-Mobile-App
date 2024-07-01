// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "",
  authDomain: "pheme-f91ee.firebaseapp.com",
  databaseURL: "https://pheme-f91ee-default-rtdb.firebaseio.com",
  projectId: "pheme-f91ee",
  storageBucket: "pheme-f91ee.appspot.com",
  messagingSenderId: "1078108175151",
  appId: "1:1078108175151:web:bb106b3e0ec66d21043fda",
  measurementId: "G-9L3CE2FRXV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getDatabase(app);
