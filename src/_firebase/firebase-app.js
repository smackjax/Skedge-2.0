import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDKHgjzn-tfjKOUQIMplBQo_qdeV4hG9NE",
    authDomain: "emmets-fcd9f.firebaseapp.com",
    databaseURL: "https://emmets-fcd9f.firebaseio.com",
    projectId: "emmets-fcd9f",
    storageBucket: "",
    messagingSenderId: "726674836509"
};
const app = firebase.initializeApp(config);

const auth = firebase.auth;
const database = firebase.database;

export default app;

export {
    auth,
    database
};
