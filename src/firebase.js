import firebase from "firebase";
import {getAnalytics} from "firebase/analytics";

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

var fireDb = firebase.initializeApp(firebaseConfig);
var analytics = getAnalytics(fireDb);

export default fireDb.database();