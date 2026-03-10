// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDstt1Uz_F9uxIbTMDNjc2_Le8P5-VJLII",
    authDomain: "learingclaude.firebaseapp.com",
    projectId: "learingclaude",
    storageBucket: "learingclaude.firebasestorage.app",
    messagingSenderId: "773075052606",
    appId: "1:773075052606:web:63b989161bc66a15ff096f",
    measurementId: "G-2K5SGREBRD"
};

import { getAuth } from "firebase/auth";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);