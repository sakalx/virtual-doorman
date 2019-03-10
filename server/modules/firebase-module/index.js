const firebaseAdmin = require('firebase-admin');
const serviceFirebaseAccount = require('./virtual-doorman-x-firebase-adminsdk-lzfpe-239dfa3e37.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceFirebaseAccount),
  databaseURL: "https://virtual-doorman-x.firebaseio.com"
});

module.exports = firebaseAdmin;