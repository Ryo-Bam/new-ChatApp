import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import {firebaseConfig} from "./config";
import 'firebase/database'

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp;


const database = firebase.database();
export const messagesRef = database.ref('messages');

export const pushMessage = ({ name, text }) => {
  messagesRef.push({ name, text });
};

