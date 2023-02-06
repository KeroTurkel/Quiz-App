// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyD8rMBZKDSz25MB_3Y52Br1eDc0GOXIe-E",
  authDomain: "lb-335-reactnative.firebaseapp./om",
  projectId: "lb-335-reactnative",
  storageBucket: "lb-335-reactnative.appspot.com",
  messagingSenderId: "134454312725",
  appId: "1:134454312725:web:3767ea33802a78f953f31c"
};*/
const firebaseConfig = {
  apiKey: "AIzaSyAG6jHCriyTispZhNiWAIQDjQfvl9Tebq4",
  authDomain: "lb-projekt-m335.firebaseapp.com",
  projectId: "lb-projekt-m335",
  storageBucket: "lb-projekt-m335.appspot.com",
  messagingSenderId: "604293644670",
  appId: "1:604293644670:web:c44d27a1b6c1c36f42732f"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.app();
}

export {firebase};