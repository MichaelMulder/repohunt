<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex sx10 md6>
        <v-card class="rounded-card">
          <v-card-text>
            <v-text-field
              label="Search GitHub Repos"
              append-icon="search"
              v-model="search"
              @keyup.enter="getRepos()"
            ></v-text-field>
            <div v-if="!loaded" class="text-xs-center">
              <v-spacer></v-spacer>
              <v-progress-circular indeterminate></v-progress-circular>
              <span>Loading...</span>
            </div>
          </v-card-text>

          <RepoCard
            v-show="search != null"
            :repo="repo"
            v-for="repo in repositories"
            :key="repo.id"
            :favorites="favorites"
          ></RepoCard>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style>
.rouned-card {
  border-radius: 50px;
}
</style>
<script>
import axios from "axios";
import RepoCard from "../components/RepoCard.vue";

export default {
  props: {
    favorites: {
      type: Array
    }
  },
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