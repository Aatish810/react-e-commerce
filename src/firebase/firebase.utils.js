import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAdkhC_ugODXhbLKjbr3S6w-M5kMq6e2WA",
    authDomain: "e-commerce-test-db-8552a.firebaseapp.com",
    databaseURL: "https://e-commerce-test-db-8552a.firebaseio.com",
    projectId: "e-commerce-test-db-8552a",
    storageBucket: "e-commerce-test-db-8552a.appspot.com",
    messagingSenderId: "86068295882",
    appId: "1:86068295882:web:3a082fafe7df26946c5c33",
    measurementId: "G-GH0S43H4WT"
  };

  firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;