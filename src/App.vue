<template>
  <v-app>
    <Header></Header>
    <v-content>
      <br>
      <br>
      <br>
      <router-view :favorites="favorites"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { db } from "./base";
import Header from "./components/Header.vue";

export default {
  name: "App",
  data() {
    return {
      favorites: []
    };
  },
  created() {
    db.collection("favorites")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.favorites.push(doc.data());
        });
      });
  },
  components: {
    Header
  }
};
</script>
