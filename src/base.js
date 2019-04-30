import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyDayKPVTCkqmXBuCNVxTruuZ7pLBwjANqU",
  authDomain: "gitrepohunt.firebaseapp.com",
  databaseURL: "https://gitrepohunt.firebaseio.com",
  projectId: "gitrepohunt"
});
export const auth = firebase.auth;
export const db = firebase.firestore();
export const fs = firebase.firestore;
