// I create this file because I don't want to modify the firebase.js file

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCaDBpg8plpGlFlSl1ke7gH_lJKZ4VRjfs",
    authDomain: "d2-shop.firebaseapp.com",
    databaseURL: "https://d2-shop.firebaseio.com",
    projectId: "d2-shop",
    storageBucket: "d2-shop.appspot.com",
    messagingSenderId: "488705744297",
    appId: "1:488705744297:web:1f8d98ef2038ca788af8b8",
    measurementId: "G-37DR1GJ7DF"
  };

  firebase.initializeApp(firebaseConfig);

  firebase.analytics().logEvent('notification_received');