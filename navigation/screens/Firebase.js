// Import the functions you need from the SDKs you need

import { initializeApp, auth, database as firebaseDatabase } from "firebase/app";
import "firebase/auth";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG6jHCriyTispZhNiWAIQDjQfvl9Tebq4",
  authDomain: "lb-projekt-m335.firebaseapp.com",
  projectId: "lb-projekt-m335",
  storageBucket: "lb-projekt-m335.appspot.com",
  messagingSenderId: "604293644670",
  appId: "1:604293644670:web:c44d27a1b6c1c36f42732f"
};

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }
    
    const database = firebase.database();
    const auth = firebase.auth();

export {auth, database};