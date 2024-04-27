// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9i5u5FB_WSj2dUX5X_r2ctgnzknQF6FA",
  authDomain: "react-proj-dc179.firebaseapp.com",
  projectId: "react-proj-dc179",
  storageBucket: "react-proj-dc179.appspot.com",
  messagingSenderId: "268456475781",
  appId: "1:268456475781:web:41261e3f617144db3dfdec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app)