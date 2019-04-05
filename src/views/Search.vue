<template>
  <div>
    <v-flex>
      <v-text-field
        label="Search GitHub Repos"
        append-icon="search"
        :value="search"
        @keyup.enter="getRepos()"
      ></v-text-field>
    </v-flex>
    <div v-if="!loaded" class="text-xs-center">
      <v-spacer></v-spacer>
      <v-progress-circular indeterminate></v-progress-circular>
      <span>Loading...</span>
    </div>

    <RepoCard v-show="search != null" :repo="repo" v-for="repo in repos" :key="repo.id"></RepoCard>
  </div>
</template>
<script>
import RepoCard from "../components/RepoCard.vue";

export default {
  props: {
    search: {
      type: String
    },
    loaded: {
      type: Boolean
    },
    repos: {
      type: Array
    }
  },

  components: {
    RepoCard
  },

  methods: {
    getRepos() {
      this.$emit("getRepos");
    }
  }
};
</script>