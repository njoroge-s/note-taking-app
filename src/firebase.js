import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth" ;
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAkVB4gKl5SEWN4O31ncEgS5u5Tm5W9PKQ",
    authDomain: "notely-4c51d.firebaseapp.com",
    projectId: "notely-4c51d",
    storageBucket: "notely-4c51d.appspot.com",
    messagingSenderId: "107600633523",
    appId: "1:107600633523:web:ef0329700ec3a0822d1ac6",
    measurementId: "G-M6LZ9NH3FP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ;
export const db = getFirestore(app) ;
const analytics = getAnalytics(app);
export default app ;