import * as firebase from 'firebase/app';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDCF-zZAVjG3NUxxF-Yqs5nHf5AqTTsgCs",
  authDomain: "virtual-doorman-x.firebaseapp.com",
  databaseURL: "https://virtual-doorman-x.firebaseio.com",
  projectId: "virtual-doorman-x",
  storageBucket: "virtual-doorman-x.appspot.com",
  messagingSenderId: "86802488380"
});

export default firebaseApp