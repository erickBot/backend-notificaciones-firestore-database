// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
// const { getMessaging } = require('firebase/messaging');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZLxsV_T0JcE5btzS1pgdobuDmdclwOtk",
  authDomain: "alertastest-19f5b.firebaseapp.com",
  databaseURL: "https://alertastest-19f5b-default-rtdb.firebaseio.com",
  projectId: "alertastest-19f5b",
  storageBucket: "alertastest-19f5b.appspot.com",
  messagingSenderId: "662669577880",
  appId: "1:662669577880:web:bccf92d0d517b58685caed",
  measurementId: "G-T23S4R49EB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
// const database = getDatabase(app);
// const fcm = getMessaging(app);

module.exports={
 app,
 firestore,
};
