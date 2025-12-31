import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDY90U7eP_2h8bnH-9rBY-Sv6kvqKnPUcU",
  authDomain: "new-year-resolution-19aea.firebaseapp.com",
  projectId: "new-year-resolution-19aea",
  storageBucket: "new-year-resolution-19aea.firebasestorage.app",
  messagingSenderId: "180203403270",
  appId: "1:180203403270:web:0cdecfd7458de02c41ab87",
  measurementId: "G-FD4JF22JT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
