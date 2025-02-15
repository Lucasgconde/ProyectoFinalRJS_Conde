// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtMzS1iV74O8vyNTK1mUEGQ2P673C1Yr0",
  authDomain: "sponsor-dios.firebaseapp.com",
  projectId: "sponsor-dios",
  storageBucket: "sponsor-dios.firebasestorage.app",
  messagingSenderId: "653248392110",
  appId: "1:653248392110:web:a38963169f51e6ff26363f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)