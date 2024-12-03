import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDi9l2NfEvAlD1fvxmVhUcrSjf6lgzmqyM",
  authDomain: "climax-d35c9.firebaseapp.com",
  projectId: "climax-d35c9",
  storageBucket: "climax-d35c9.firebasestorage.app",
  messagingSenderId: "74594409435",
  appId: "1:74594409435:web:9b514aa52f5c1397f0e5fe",
  measurementId: "G-EX3QSWEK5N"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);