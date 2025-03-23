import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8BFhjIneytpKgVjdfjAbeGBRLREsmwCQ",
  authDomain: "interviewiq-45475.firebaseapp.com",
  projectId: "interviewiq-45475",
  storageBucket: "interviewiq-45475.firebasestorage.app",
  messagingSenderId: "36412052325",
  appId: "1:36412052325:web:21bf092cd484fffbad878c",
  measurementId: "G-PP6E1JTLXP"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)