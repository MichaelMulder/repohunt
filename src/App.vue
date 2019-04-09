<template>
  <v-app>
    <Header></Header>
    <v-content class="bg-color">
      <br>
      <br>
      <br>
      <router-view :favorites="favorites" :notes="notes"></router-view>
    </v-content>
  </v-app>
</template>
<style scoped>
.bg-color {
  background-color: #607d8b;
}
</style>

<script>
import { db } from "./base";
import Header from "./components/Header.vue";

export default {
  name: "App",
  data() {
    return {
      favorites: [],
      notes: []
    };
  },

  firestore: {
    favorites: db.collection("favorites"),
    notes: db.collection("notes")
  },

  components: {
    Header
  }
};
</script>
