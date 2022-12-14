import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; //to upload img

const firebaseConfig = {
    apiKey: "AIzaSyDATWGSBRT9c69zfcZbTILLEmiFeF9INs4",
    authDomain: "chat-app-3-b704f.firebaseapp.com",
    projectId: "chat-app-3-b704f",
    storageBucket: "chat-app-3-b704f.appspot.com",
    messagingSenderId: "960078906382",
    appId: "1:960078906382:web:a9eb0d1966212f4e31685f"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
