import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChjaNrr6Tp3uHRQnMoDLx7GZPjOA9Vdyw",
  authDomain: "my-dojo-fc275.firebaseapp.com",
  projectId: "my-dojo-fc275",
  storageBucket: "my-dojo-fc275.appspot.com",
  messagingSenderId: "537956070823",
  appId: "1:537956070823:web:32c149e0c0dc0a0e86f282",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init services
const myFSProject = getFirestore(app);
const myFSAuth = getAuth(app);
const myFSStorage = getStorage(app);

export { myFSProject, myFSAuth, myFSStorage };
