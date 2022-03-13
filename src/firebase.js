import  { initializeApp } from 'firebase/app'


import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDJTJc6rI7kGQ9KTjOQf_rVZwl1KB5Qj8U",
  authDomain: "todoapp-bb89b.firebaseapp.com",
  projectId: "todoapp-bb89b",
  storageBucket: "todoapp-bb89b.appspot.com",
  messagingSenderId: "173699688335",
  appId: "1:173699688335:web:36078e98b6588548680dfa",
});

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export default firebaseApp; 