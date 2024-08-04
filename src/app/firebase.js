// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsji4pyK4i2rio4GdKSdvIicAl7af7Eik",
  authDomain: "pantry-app-52f8e.firebaseapp.com",
  projectId: "pantry-app-52f8e",
  storageBucket: "pantry-app-52f8e.appspot.com",
  messagingSenderId: "24101476894",
  appId: "1:24101476894:web:4fe9cbf490d76ddbd36c0f",
  measurementId: "G-YS911GF5V2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
