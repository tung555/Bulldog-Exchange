// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv7SzjrqMjj99ew9t84LTrOD8GSwxWZMo",
  authDomain: "bulldog-exchange-c7a72.firebaseapp.com",
  projectId: "bulldog-exchange-c7a72",
  storageBucket: "bulldog-exchange-c7a72.firebasestorage.app",
  messagingSenderId: "812528548386",
  appId: "1:812528548386:web:f0cc04655c4ea0931e287b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);