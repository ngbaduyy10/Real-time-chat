import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAfUnuOJP4Y_96EA07FnvMSd9nfJ-XcjKU",
    authDomain: "fir-realtime-chat-cdd93.firebaseapp.com",
    projectId: "fir-realtime-chat-cdd93",
    storageBucket: "fir-realtime-chat-cdd93.appspot.com",
    messagingSenderId: "389967038565",
    appId: "1:389967038565:web:e7f79467866f3189065e8c",
    measurementId: "G-GV6W450GJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

if (window.location.hostname === "localhost") {
    connectFirestoreEmulator(db, "localhost", process.env.REACT_APP_FIRESTORE_PORT);
    connectAuthEmulator(auth, process.env.REACT_APP_FIREBASE_AUTH);
}
export {auth, db};