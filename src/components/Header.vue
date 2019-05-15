<template>
  <nav>
    <v-navigation-drawer v-model="drawer" class="grey lighten-2" fixed>
      <v-toolbar dark flat>
        <v-fade-transition>
          <Profile v-if="isLogged" :user="user"></Profile>
        </v-fade-transition>
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
        <v-fade-transition>
          <div class="py-4" v-show="!isLogged">
            <span class="title px-3">Welcome to Repohunt!</span>
            <div class="subtitle px-4 py-2">
              The GitHub project managing Tool made
              to not only find great repos, but actually make something with them.
              <br>Please sign in with your GitHub account to connitue!
            </div>
            <div class="text-xs-center">
              <v-btn @click="signIn">
                <v-icon>person</v-icon>sign in
              </v-btn>
            </div>
          </div>
        </v-fade-transition>
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
import Profile from "./Profile";

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
      drawer: null
    };
  },
  methods: {
    signIn() {
      this.$emit("signIn");
    }
  },
  components: {
    Profile
  }
};
</script>

