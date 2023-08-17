// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js';
import { getFirestore, collection, getDocs, getDoc, query, where, DocumentReference } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js';

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
const firestoreDataBase = getFirestore(app)

//database
const database = {
  /* - Expected Return <Object> -
    { 
      name: <string>,
      description: <string>,
      webLink: <string>,
      tag: { 
        color: <string>, 
        text: <string> 
      },
      categories: [ { color: <string>, text: <string>} ],
      featured: <boolean>,
      logoUrl: <string>
    }
  */
  getWebsites: async () => {

    //documentsRef equals to <QuerySnapshot : Object>
    const documentsRef = await getDocs(collection(firestoreDataBase, 'Public/websites/siteId'));

    /* - Expected Return <Array> -
      [
        { 
          name: <string>,
          description: <string>,
          webLink: <string>,
          tag: <DocumentReference>,
          categories: [ <DocumentReference> ],
          featured: <boolean>,
          logoUrl: <string>
        }
      ]
    */
    let dataArray = documentsRef.docs.map(doc => doc.data())

    // updatesDataArray holds dataArray with all <DocumentReference> already fetch
    let updatedDataArray = await Promise.all(dataArray.map(async dataObject => {

      if(dataObject.tag instanceof DocumentReference){

        //re-assign tag from data inside <DocumentReference>
        dataObject.tag = (await getDoc(dataObject.tag)).data()

      }

      if(dataObject.categories instanceof Array){
        dataObject.categories = await Promise.all(dataObject.categories.map(async value => {
          if(value instanceof DocumentReference){
            //return from data inside <DocumentReference>
            return (await getDoc(value)).data()
          }

          return value
        }))
      }
      return dataObject;
    }))

    return updatedDataArray;
  },
  getCategories: async () => {
    try{
      const documentsRef = await getDocs(collection(firestoreDataBase, 'Public/websites/categoryId'));
      return documentsRef.docs.map(doc => doc.data())
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getFeaturedWebsites: async () => {
    try{
      const collectionRef = collection(firestoreDataBase, 'Public/websites/siteId')
      const queryRef = await getDocs(query(collectionRef, where('featured', '==', true)));
      return queryRef.docs.map( doc => doc.data()) 

    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
export default database;

export const authentication = {
  login: async (email, password) => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password)
      return true;
  
    } catch(error){
      console.log(error)
      return false;
    }
  },
  getUserInfo: async () =>{
    try{
      const collectionRef = collection(firestoreDataBase, 'Users/database/userId')
      const queryRef = await getDocs(query(collectionRef, where('uid', '==', getAuth().currentUser.uid)));
      
      //array of data from the query specified
      const queryArray = queryRef.docs.map( doc => doc.data());

      if(queryArray.length == 1){
        return queryArray[0]
      }else{
        console.error(`multiple users (${queryArray[0].uid}) with the same UID`)
      }

    } catch (error) {
      console.error(error);
      return [];
    }
  }
}