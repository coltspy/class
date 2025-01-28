// app/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const app = initializeApp({
  apiKey: "AIzaSyBhGU_212blcxW71AtqKDl4bgivBqCZqi0",
  authDomain: "class-43242.firebaseapp.com",
  projectId: "class-43242"
});

export const auth = getAuth(app);
export const db = getFirestore(app);