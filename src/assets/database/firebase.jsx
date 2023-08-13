// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
import { collection, getDocs, getDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
export const firestoreDataBase = getFirestore(app)

const database = {
  getWebsites: async () => {
    try{
      const documentsRef = await getDocs(collection(firestoreDataBase, 'websites'));
      return documentsRef.docs.map(doc => doc.data())
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default database

export const getDocumentData = async (document) =>{
  const documentRef = await getDoc(document);
  return documentRef.data();
};