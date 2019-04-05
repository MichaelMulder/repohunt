<template>
  <div>
    <v-flex>
      <v-text-field
        label="Search GitHub Repos"
        append-icon="search"
        v-model="search"
        @keyup.enter="getRepos()"
      ></v-text-field>
    </v-flex>
    <div v-if="!loaded" class="text-xs-center">
      <v-spacer></v-spacer>
      <v-progress-circular indeterminate></v-progress-circular>
      <span>Loading...</span>
    </div>

    <RepoCard v-show="search != null" :repo="repo" v-for="repo in repositories" :key="repo.id"></RepoCard>
  </div>
</template>
<script>
import axios from "axios";
import RepoCard from "../components/RepoCard.vue";

export default {
  data() {
    return {
      search: null,
      loaded: false,
      repositories: []
    };
  },
  methods: {
    getRepos() {
      axios
        .get(`https://api.github.com/search/repositories?q=${this.search}`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.repositories = response.data.items;
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => {
          this.loaded = true;
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