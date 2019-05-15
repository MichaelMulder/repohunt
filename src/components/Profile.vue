<template>
  <v-list-tile>
    <v-list-tile-avatar>
      <img :src="user.photoURL" :alt="user.displayName">
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title class="title">{{user.displayName}}</v-list-tile-title>
      <v-list-tile-title class="subheading px-1 pb-1">Points: {{userData.points}}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
import { db } from "../base";

export default {
  name: "Profile",
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      userData: {}
    };
  },
  firestore() {
    return {
      userData: db.collection("users").doc(this.user.uid)
    };
  }
};
</script>
