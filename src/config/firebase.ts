// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQwNaX7hqrSq5x-HVgXlwEy7hCk8_mdRY",
  authDomain: "react-firebase-371f5.firebaseapp.com",
  projectId: "react-firebase-371f5",
  storageBucket: "react-firebase-371f5.appspot.com",
  messagingSenderId: "838570984117",
  appId: "1:838570984117:web:d183146e2fb7a261caf4fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app)