import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseApp from '../initialization';

import socketClient from 'root/modules/socket-module';
import eventNames from 'root/modules/socket-module/eventNames';

import store from 'root/modules/redux-module/store';
import {userActionsTypes} from 'root/modules/redux-module/types';
import {logInUser} from 'root/modules/redux-module/actions/user';

const addUserIntoRedux = user => store.dispatch(logInUser(user));
const logOut = () => store.dispatch({type: userActionsTypes.LOG_OUT});

export const currentUser = () => firebase.auth().currentUser;

// listener for signIn - signOut
firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
      getToken().then(idToken => socketClient.connect(idToken));

      socketClient.on(eventNames.authenticated, authenticatedUser => {
        addUserIntoRedux(authenticatedUser);
      });

      socketClient.on(eventNames.unauthorized, err => {
        console.error(err);
        console.log('There was an error with the authentication:', err.message);
      });
    } else {
      logOut();
    }
  }
);

// return promise with user info
const getToken = () => firebase.auth().currentUser.getIdToken(true);

export const signInWithEmail = (email, password) =>
  firebaseApp.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => {
  firebaseApp.auth().signOut();
};


// [NOTE] UTILS
// return promise when it done
export const createUser = (email, password) =>
  firebaseApp.auth().createUserWithEmailAndPassword(email, password);

// return promise when it done
export const updateUserEmail = email => currentUser().updateEmail(email);

// return promise when it done
export const sendEmailVerification = () => currentUser().sendEmailVerification();

// return promise when it done
export const updateUserPassword = newPassword => currentUser().updatePassword(newPassword);

// return promise when it done
export const sendPasswordResetEmail = email => auth.sendPasswordResetEmail(email);
