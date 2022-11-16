import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDrG_dP9VS7vkBr22Q8l82eILTSjG0QJt0",
  authDomain: "pelets-project.firebaseapp.com",
  projectId: "pelets-project",
  storageBucket: "pelets-project.appspot.com",
  messagingSenderId: "650608095749",
  appId: "1:650608095749:web:7d0ff21a6cb279ebb4626c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

