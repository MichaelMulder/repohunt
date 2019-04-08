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
