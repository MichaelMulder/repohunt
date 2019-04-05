<template>
  <v-app>
    <Header></Header>
    <v-content>
      <br>
      <br>
      <br>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  data() {
    return {
      favorites: []
    };
  },
  components: {
    Header
  }
};
</script>
