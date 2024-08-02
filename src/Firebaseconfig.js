// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAD07sbg0e6JcK2wiCot_cDgvhZ9JolBug",
    authDomain: "keep-db-7b8d2.firebaseapp.com",
    projectId: "keep-db-7b8d2",
    storageBucket: "keep-db-7b8d2.appspot.com",
    messagingSenderId: "852157031088",
    appId: "1:852157031088:web:e70985d49c7a3bb5ba9175"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);