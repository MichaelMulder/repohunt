<template>
  <nav>
    <v-navigation-drawer dark v-model="drawer" fixed>
      <v-toolbar dark flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">Repo Hunt</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>search</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Search Git Hub Repositories</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/favorites">
          <v-list-tile-action>
            <v-icon>favorites</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Your Favorites</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/notes">
          <v-list-tile-action>
            <v-icon>note</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Your Notes</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-btn @click="signIn">
            <v-icon>person</v-icon>sign in
          </v-btn>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark fixed>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Repo Hunt</v-toolbar-title>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    };
  },

  methods: {
    signIn() {
      this.$emit("signIn");
    }
  }
};
</script>

