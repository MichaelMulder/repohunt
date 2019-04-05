<template>
  <v-app>
    <Header></Header>
    <v-content>
      <br>
      <br>
      <br>
      <router-view :repos="filteredRepos" :search="search" :loaded="loaded" :getRepos="getRepos"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import Header from "./components/Header.vue";

export default {
  name: "App",
  data() {
    return {
      repositories: [],
      search: null,
      loaded: false,
      favorites: []
    };
  },
  methods: {
    getRepos() {
      axios
        .get(`https://api.github.com/search/repositories?q=${this.search}`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.repositories = response.data.items;
          console.log(response.data.items[1].name);
        })
        .catch(e => {
          console.error(e);
        })
        .finally(() => {
          this.loaded = true;
        });
    }
  },

  computed: {
    filteredRepos() {
      this.repositories.filter(repos => {
        const regex = new RegExp(this.search, "gi");
        return repos.full_name.match(regex) || repos.name.match(regex);
      });
    }
  },
  mounted() {
    this.getRepos();
  },
  components: {
    Header
  }
};
</script>
