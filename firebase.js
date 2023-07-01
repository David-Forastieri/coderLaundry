// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-lZ3iMDX9B8n_WdhPmAy3sNY6mhjCY8I",
  authDomain: "codlaundry-app.firebaseapp.com",
  projectId: "codlaundry-app",
  storageBucket: "codlaundry-app.appspot.com",
  messagingSenderId: "291811085769",
  appId: "1:291811085769:web:73a4938f2038a8cc1c2c18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore()

export { auth, db }