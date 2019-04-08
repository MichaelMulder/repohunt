<template>
  <v-container fluid>
    <v-layout align-center justify-center wrap>
      <v-flex sx10 md8 lg6>
        <v-card color="grey darken-4">
          <v-card-text>
            <v-text-field
              label="Search GitHub Repos"
              append-icon="search"
              v-model="search"
              dark
              solo
              @keyup.enter="getRepos()"
            ></v-text-field>
            <div v-if="!loaded" class="text-xs-center white--text">
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
            :notes="notes"
          ></RepoCard>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import RepoCard from "../components/RepoCard.vue";

export default {
  props: {
    favorites: {
      type: Array
    },
    notes: {
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