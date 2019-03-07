import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
//import config_values from './vars'

// Use actual config values from registered firebase app
var config = {
  apiKey: config_values.FIREBASE_API_KEY,
  authDomain: config_values.FIREBASE_AUTH_DOMAIN,
  databaseURL: config_values.FIREBASE_DATABASE_URL,
  projectId: config_values.FIREBASE_PROJECT_ID,
  storageBucket: config_values.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: config_values.FIREBASE_MESSAGING_SENDER_ID
};


firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
