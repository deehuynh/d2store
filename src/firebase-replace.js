import firebase from "firebase";

const firebaseConfig = {
    apiKey: "x",
    authDomain: "xxx.firebaseapp.com",
    databaseURL: "https://xxx.firebaseio.com",
    projectId: "x",
    storageBucket: "x.appspot.com",
    messagingSenderId: "x",
    appId: "x",
    measurementId: "x"
  };

var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database();