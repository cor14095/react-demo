import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAcMCNtPy3qihzQ8iu8Mf9egv2tSba9Yks",
    authDomain: "proyecto-progra-15e61.firebaseapp.com",
    databaseURL: "https://proyecto-progra-15e61.firebaseio.com",
    projectId: "proyecto-progra-15e61",
    storageBucket: "proyecto-progra-15e61.appspot.com",
    messagingSenderId: "989810536809",
    appId: "1:989810536809:web:2c53a56d7eda0d4bda0df8",
    measurementId: "G-JKJ19ZJK4H"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Students API ***
  student = sid => this.db.ref(`students/${sid}`);

  students = () => this.db.ref('students');

  // *** Classes API ***
  class = cid => this.db.ref(`classes/${cid}`);

  classes = () => this.db.ref('classes');

}

export default Firebase;
