// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Firebase Configuration (замените на свои данные)
const firebaseConfig = {
  apiKey: "AIzaSyBhY396dWOwhD5qdZ2TuHw3_TNpVje3BkI",
  authDomain: "smart-c2ab2.firebaseapp.com",
  projectId: "smart-c2ab2",
  storageBucket: "smart-c2ab2.firebasestorage.app",
  messagingSenderId: "702072861415",
  appId: "1:702072861415:web:5692dc8f76536c9d8de842"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, signOut, doc, setDoc, getDoc, onAuthStateChanged };
