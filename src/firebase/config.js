import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Environment variables from .env file
import.meta.env.VITE_FIREBASE_API_KEY;
import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
import.meta.env.VITE_FIREBASE_PROJECT_ID;
import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
import.meta.env.VITE_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const myFSProject = getFirestore(app);
const myFSAuth = getAuth(app);
const myFSStorage = getStorage(app);

export { myFSProject, myFSAuth, myFSStorage };
