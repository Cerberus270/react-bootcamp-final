// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBMAxYDg_71lSCi2IzFTxmUJT7AIpNLrFU",
    authDomain: "react-bootcamp-7ec1f.firebaseapp.com",
    projectId: "react-bootcamp-7ec1f",
    storageBucket: "react-bootcamp-7ec1f.appspot.com",
    messagingSenderId: "109347105526",
    appId: "1:109347105526:web:b1e53b0ef4974283651ad7",
    measurementId: "G-G82TKVXH2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export {
    app,
    auth,
    db,
}
/*export const config = {
    firebaseConfig: {
        apiKey: "AIzaSyBMAxYDg_71lSCi2IzFTxmUJT7AIpNLrFU",
        authDomain: "react-bootcamp-7ec1f.firebaseapp.com",
        projectId: "react-bootcamp-7ec1f",
        storageBucket: "react-bootcamp-7ec1f.appspot.com",
        messagingSenderId: "109347105526",
        appId: "1:109347105526:web:b1e53b0ef4974283651ad7",
        measurementId: "G-G82TKVXH2C"
    }
}*/