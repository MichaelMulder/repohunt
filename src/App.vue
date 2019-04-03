<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Repo Hunt</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6>
        <v-text-field label="Search GitHub Repos" append-icon="search" v-model="searchTerm"></v-text-field>
      </v-flex>
    </v-toolbar>

    <v-content>
      <ul v-if="repos && repos.length">
        <li v-for="repo of repos" :key="repo.id">
          <p>
            <strong>{{repo.name}}</strong>
          </p>
          <p>{{repo.decscription}}</p>
        </li>
      </ul>

      <ul v-if="errors && errors.length">
        <li v-for="error of errors">{{error.message}}</li>
      </ul>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  data() {
    return {
      repos: [],
      errors: [],
      searchTerm: ""
    };
  },

  // Fetches posts when the component is created.
  created() {
    axios
      .get(`https://api.github.com/search/repositories?q=react`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.repos = response.data.items;
        console.log(response.data.items);
      })
      .catch(e => {
        this.errors.push(e);
      });
  }
};
</script>
