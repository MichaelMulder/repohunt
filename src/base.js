import VueFire from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(VueFire);
firebase.initializeApp({
  databaseURL: "https://gitrepohunt.firebaseio.com",
  projectId: "gitrepohunt"
});

export const db = firebase.firestore();
