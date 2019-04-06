import firebase from "firebase/app";
import "firebase/firestore";

firebase.initializeApp({
  databaseURL: "https://gitrepohunt.firebaseio.com",
  projectId: "gitrepohunt"
});

export const db = firebase.firestore();
