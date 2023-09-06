import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth" ;
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCNPudnrSBa7nt2ea_MH_I59tFhrmiMssc",
    authDomain: "notely-d3a91.firebaseapp.com",
    projectId: "notely-d3a91",
    storageBucket: "notely-d3a91.appspot.com",
    messagingSenderId: "236730801545",
    appId: "1:236730801545:web:96c7802990e449f1c89558",
    measurementId: "G-8GEY6MQYVT"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) ;
export const db = getFirestore(app) ;
const analytics = getAnalytics(app);
export default app ;