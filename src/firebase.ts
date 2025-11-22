// src/firebase.ts   ← THIS IS THE ONLY PLACE
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvOB1GlWICfHlBmCAd9k-nP77iNp7UYjk",
  authDomain: "veltrix-b303c.firebaseapp.com",
  projectId: "veltrix-b303c",
  storageBucket: "veltrix-b303c.firebasestorage.app",
  messagingSenderId: "65897056794",
  appId: "1:65897056794:web:7c954e9ab6fd83d8a11fa3",
  measurementId: "G-DDW7XJ3N3D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Optional: always ask for account picker
googleProvider.setCustomParameters({ prompt: 'select_account' });