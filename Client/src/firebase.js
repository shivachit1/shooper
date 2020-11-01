import firebase from 'firebase/app';
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBg0Wbs6uPusb2GA-pjBkoqRYfEPhQMn7s",
    authDomain: "shooper-ead8e.firebaseapp.com",
    databaseURL: "https://shooper-ead8e.firebaseio.com",
    projectId: "shooper-ead8e",
    storageBucket: "shooper-ead8e.appspot.com",
    messagingSenderId: "659604619201",
    appId: "1:659604619201:web:edf9ad5a1ed944f58f7940",
    measurementId: "G-0SKS41W8MR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const storageRef = firebase.storage().ref();
 
  export  {
    storageRef, firebase as default
  }