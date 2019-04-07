<template>
  <v-app dark>
    <Header></Header>
    <v-content>
      <br>
      <br>
      <br>
      <router-view :favorites="favorites" :notes="notes"></router-view>
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
      favorites: [],
      notes: []
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
    db.collection("notes").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type == "added") {
          this.notes.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  },
  components: {
    Header
  }
};
</script>
