import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCeGKTYr4Pm1VYkXfNJ7PObZ0oWlFBzw90",
  authDomain: "notes-dd71e.firebaseapp.com",
  databaseURL: "https://notes-dd71e.firebaseio.com",
  projectId: "notes-dd71e",
  storageBucket: "notes-dd71e.appspot.com",
  messagingSenderId: "324542525669",
  appId: "1:324542525669:web:6c4961a2ac341bc39d240c",
  measurementId: "G-BN6Q5H02S6",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
