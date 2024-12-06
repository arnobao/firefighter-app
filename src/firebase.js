
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpExzdxd-2XcJ051I1kJDJADLJPHk7sTM",
  authDomain: "firefighter-app-8d3c8.firebaseapp.com",
  projectId: "firefighter-app-8d3c8",
  storageBucket: "firefighter-app-8d3c8.firebasestorage.app",
  messagingSenderId: "1093404421535",
  appId: "1:1093404421535:web:f265a4997bdc08094ea1aa",
  measurementId: "G-JNC7F1JX5D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);