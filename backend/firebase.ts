// Import the functions you need from the SDKs you need
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from "firebase/auth";
import withFirebaseAuth from 'react-with-firebase-auth';
import { GoogleAuthProvider } from "firebase/auth";


import serviceAccount from "./service_account.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurationx

const firebaseConfig = {
  apiKey: "AIzaSyCnDk8m_Css_cooyDN8QxoycQI3_zLh0WQ", 
  authDomain: "final-project-74749.firebaseapp.com",
  projectId: "final-project-74749",
  storageBucket: "final-project-74749.firebasestorage.app",
  messagingSenderId: "1008006262930",
  appId: "1:1008006262930:web:a3f10707cedafb9aa1f64b"
};

// const app = admin.initializeApp({
//   credential: cert(serviceAccount as ServiceAccount)
//   databaseURL: 'https://final-project-74749.firebaseio.com'
// });
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// export firebase instances for easy access
const db = getFirestore(app);



export { 
  db,
  auth,
 };