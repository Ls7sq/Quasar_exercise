import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

//require('firebase/compat/auth')
const firebaseConfig = {
    apiKey: "AIzaSyDZcdwqGSGnn3l2HCQd4NmmiyBm1b1N-0s",
    authDomain: "foods-9d417.firebaseapp.com",
    projectId: "foods-9d417",
    storageBucket: "foods-9d417.appspot.com",
    messagingSenderId: "955933331208",
    appId: "1:955933331208:web:5eeef4912657639e1e26bd"
  }

  // // Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)

let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export{ firebaseAuth , firebaseDb}