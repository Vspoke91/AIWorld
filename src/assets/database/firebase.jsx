// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARM976K3XVIWFEgeQfgm7C_PcFxb1DERI",
  authDomain: "ai-world-eae98.firebaseapp.com",
  projectId: "ai-world-eae98",
  storageBucket: "ai-world-eae98.appspot.com",
  messagingSenderId: "35286819252",
  appId: "1:35286819252:web:837f6c187d586ed74952e1",
  measurementId: "G-DNZC2CL223"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);