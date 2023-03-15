import { getAuth, signOut } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKewfZeXKrf-OcexBJQFZRWKeKQNHsXBk",
  authDomain: "login-test-380108.firebaseapp.com",
  projectId: "login-test-380108",
  storageBucket: "login-test-380108.appspot.com",
  messagingSenderId: "998270835142",
  appId: "1:998270835142:web:2997eb9de9cac394ba3ac7",
  measurementId: "G-Q9CF8MD2Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {
    auth,
    signOut
}