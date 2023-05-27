// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEf1bLPVxORuLbNH-OJ26ipiSpS3HC2Qg",
  authDomain: "clout-b3565.firebaseapp.com",
  projectId: "clout-b3565",
  storageBucket: "clout-b3565.appspot.com",
  messagingSenderId: "112651103607",
  appId: "1:112651103607:web:e0bdaeb9d37f339e988572",
  measurementId: "G-JPXF39QLG5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();