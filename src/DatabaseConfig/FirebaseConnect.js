"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyARA95q8snrs58SHjB66Y1flppNPP6ZUiA",
    authDomain: "book-31cfe.firebaseapp.com",
    projectId: "book-31cfe",
    storageBucket: "book-31cfe.appspot.com",
    messagingSenderId: "152871186263",
    appId: "1:152871186263:web:f04cdce4c1982e74c51812",
    measurementId: "G-GFVL227MZP"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };