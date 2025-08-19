import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0y4bvV4bEIvrC53tcjyk3Q81Bq-k4nY",
  authDomain: "formdataapp-7ba57.firebaseapp.com",
  projectId: "formdataapp-7ba57",
  storageBucket: "formdataapp-7ba57.appspot.com",
  messagingSenderId: "152887444557",
  appId: "1:152887444557:web:f96e4cb16ad6436dd8e804",
};
//initialize firebaseConfig
const app = initializeApp(firebaseConfig);

// Export Firestore DB instance
export const db = getFirestore(app);
