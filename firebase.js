import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhU9D1CjhQiTscO5g0j0jaSsD_Mg398ns",
  authDomain: "mpma-ttn.firebaseapp.com",
  projectId: "mpma-ttn",
  storageBucket: "mpma-ttn.appspot.com",
  messagingSenderId: "452922707536",
  appId: "1:452922707536:web:6d9f9e545fa06902bf0b55",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
