import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBvrnfEFpasPvlqmnAuWY3EnJAetTYEqKY",
    authDomain: "snapchat-evyatar-haim.firebaseapp.com",
    projectId: "snapchat-evyatar-haim",
    storageBucket: "snapchat-evyatar-haim.appspot.com",
    messagingSenderId: "968421433688",
    appId: "1:968421433688:web:2c1621a44c7b773afc052d",
    measurementId: "G-TX77JRPDFB"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, storage, provider}
