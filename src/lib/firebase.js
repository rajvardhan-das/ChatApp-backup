// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBos0RZLmG0F1aP4xG3dHLD95P9cLNpL6Y",
  authDomain: "chatpal-8bafe.firebaseapp.com",
  projectId: "chatpal-8bafe",
  storageBucket: "chatpal-8bafe.appspot.com",
  messagingSenderId: "316923098583",
  appId: "1:316923098583:web:6d8fe08c80b27db0ebc792",
  measurementId: "G-LW4B2678K3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage()
export const auth = getAuth()
export const db = getFirestore()

