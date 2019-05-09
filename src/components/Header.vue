<template>
  <nav>
    <v-navigation-drawer v-model="drawer" class="grey lighten-2" fixed>
      <v-toolbar dark flat>
        <v-list>
          <v-spacer></v-spacer>
          <v-list-tile v-if="isLogged">
            <v-list-tile-avatar>
              <img :src="user.photoURL" :alt="user.displayName">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title class="title">{{user.displayName}}</v-list-tile-title>
              <v-list-tile-title class="subtitle">Points: {{userData.points}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list>
        <v-list-tile to="/search" activeClass="blue--text">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Search Git Hub Repositories</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/favorites" activeClass="red--text">
          <v-list-tile-action>
            <v-icon>favorites</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Your Favorites</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/notes" activeClass="green--text">
          <v-list-tile-action>
            <v-icon>note</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Your Notes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/projects" activeClass="deep-purple--text">
          <v-list-tile-action>
            <v-icon>web</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Your Projects</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-show="!isLogged">
          <v-btn @click="signIn">
            <v-icon>person</v-icon>sign in
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Repo Hunt</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
  </nav>
</template>

<script>
import { db } from "../base";
export default {
  props: {
    user: {
      type: Object
    },
    isLogged: {
      type: Boolean
    },
    userData: {
      type: Object
    }
  },
  data() {
    return {
      drawer: null,
      userData: {}
    };
  },
  firestore() {
    return {
      userData: db.collection("users").doc(this.user.uid)
    };
  },

  methods: {
    signIn() {
      this.$emit("signIn");
    }
  }
};
</script>

