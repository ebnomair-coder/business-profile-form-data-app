import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCimJ7P8RaDJPq0lOF-fIKQeM9BiPXsda0",
  authDomain: "my-dashboard-734e7.firebaseapp.com",
  projectId: "my-dashboard-734e7",
  storageBucket: "my-dashboard-734e7.firebasestorage.app",
  messagingSenderId: "746956010344",
  appId: "1:746956010344:web:628d811af2d5d1b1d59cdd",
  measurementId: "G-BNZ02W46B1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
