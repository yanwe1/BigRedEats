import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };