import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-mern-10dd5.firebaseapp.com",
  projectId: "auth-mern-10dd5",
  storageBucket: "auth-mern-10dd5.appspot.com",
  messagingSenderId: "695194737176",
  appId: "1:695194737176:web:d199940cf967daa097016d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
