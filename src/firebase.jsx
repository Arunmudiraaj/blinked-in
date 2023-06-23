import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBprkxhGHkC1qTYMbaRTgfPnrsq3QhBo-Q",
  authDomain: "blinked-in.firebaseapp.com",
  projectId: "blinked-in",
  storageBucket: "blinked-in.appspot.com",
  messagingSenderId: "1022834310798",
  appId: "1:1022834310798:web:b7ca013e9ecd625778d3df",
  measurementId: "G-L70X7WH7G1",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, googleAuth, storage, db };
