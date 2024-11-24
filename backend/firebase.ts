// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { ServiceAccount } from "firebase-admin";

var admin = require("firebase-admin");
var serviceAccount = require("./service_account.json");

// Ensure Firebase is initialized only once
if (!getApps().length) {
  initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

// Initialize Firebase Auth
const auth = getAuth();

// Export firebase instances for easy access
const db = getFirestore();

export { db, auth };
