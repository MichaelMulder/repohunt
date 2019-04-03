<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Repo Hunt</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6>
        <v-text-field
          label="Search GitHub Repos"
          append-icon="search"
          v-model="searchTerm"
          @keyup.enter="getRepos()"
        ></v-text-field>
      </v-flex>
    </v-toolbar>

    <v-content>
      <div v-if="loading = true" class="text-xs-center">
        <v-spacer></v-spacer>
        <v-progress-circular indeterminate></v-progress-circular>
        <span>Loading...</span>
      </div>

      <RepoCard :repo="repo" v-for="repo in repos" :key="repo.id"></RepoCard>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import RepoCard from "./components/RepoCard.vue";

export default {
  name: "App",

  data() {
    return {
      repos: [],
      searchTerm: "",
      loading: false,
      error: false
    };
  },
  methods: {
    getRepos() {
      axios
        .get(`https://api.github.com/search/repositories?q=${this.searchTerm}`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.repos = response.data.items;
        })
        .catch(e => {
          console.error(e);
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    this.getRepos();
  },
  components: {
    RepoCard
  }
};
</script>
