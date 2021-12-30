// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBr7T9KDw1yEv3qxHGKLvfMucypqj8jprk",
    authDomain: "tinder-clone-bd59d.firebaseapp.com",
    projectId: "tinder-clone-bd59d",
    storageBucket: "tinder-clone-bd59d.appspot.com",
    messagingSenderId: "48890232946",
    appId: "1:48890232946:web:b9b34a685a1018d67102eb",
    measurementId: "G-RG1S1PHGW8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// exporta essas funções pro app todo
export { auth, db };