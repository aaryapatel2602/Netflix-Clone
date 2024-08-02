import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNCizmOwzEsogktuCEWs7dE5inT4KjElk",
  authDomain: "netflix-clone-f6c99.firebaseapp.com",
  projectId: "netflix-clone-f6c99",
  storageBucket: "netflix-clone-f6c99.appspot.com",
  messagingSenderId: "519347664130",
  appId: "1:519347664130:web:543e165c313a803193fe1b",
  measurementId: "G-1013H4SJW0"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const analytics = getAnalytics(app);

export const firebaseAuth = auth;