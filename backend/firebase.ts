// Import the functions you need from the SDKs you need
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';
import withFirebaseAuth from 'react-with-firebase-auth';

// import serviceAccount from "./serviceAccountKey.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnDk8m_Css_cooyDN8QxoycQI3_zLh0WQ", 
  authDomain: "final-project-74749.firebaseapp.com",
  projectId: "final-project-74749",
  storageBucket: "final-project-74749.firebasestorage.app",
  messagingSenderId: "1008006262930",
  appId: "1:1008006262930:web:a3f10707cedafb9aa1f64b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export firebase instances for easy access
const db = getFirestore(app);

const providers = {
  googleProvider: new GoogleAuthProvider(),
};

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
});

const signInWithGoogle = () => {
  signInWithPopup(auth, providers.googleProvider);
};

const signOutFirebase = () => {
  signOut(auth);
};

export { 
  db,
  auth,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase as signOut,
 };