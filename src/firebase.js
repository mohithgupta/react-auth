import firebase from "firebase/app";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCwK-VgYvmUhC6HjZEMrTC0bS0N-UPulfc",
    authDomain: "auth-dev-357df.firebaseapp.com",
    databaseURL: "https://auth-dev-357df-default-rtdb.firebaseio.com",
    projectId: "auth-dev-357df",
    storageBucket: "auth-dev-357df.appspot.com",
    messagingSenderId: "702824377425",
    appId: "1:702824377425:web:60aa6a05f73ed7e3891c70"
  };

const app = firebase.initializeApp(config);

const auth = app.auth();

export {auth};
export default app;
