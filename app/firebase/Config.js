import { initializeApp } from "firebase/app";

import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth'
import {getFirestore, collection, doc, onSnapshot, query, orderBy, where, serverTimestamp, getDocs, getDoc, addDoc, updateDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID
  };
  
  // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 const firestore = getFirestore();
 const USERS = "users";

 export{
    firestore,
    USERS,
    collection,
    doc,
    onSnapshot,
    query,
    orderBy,
    where,
    serverTimestamp,
    getDocs,
    getDoc,
    addDoc,
    updateDoc
 } 