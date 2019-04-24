<template>
  <v-app>
    <Header @signIn="signIn"></Header>
    <v-content class="bg-color">
      <br>
      <br>
      <br>
      <router-view :isLogged="isLogged" :user="user"></router-view>
    </v-content>
  </v-app>
</template>
<style scoped>
.bg-color {
  background-color: #607d8b;
}
</style>

<script>
import { db, auth } from "./base";
import Header from "./components/Header.vue";

export default {
  name: "App",
  data() {
    return {
      user: {},
      isLogged: false
    };
  },

  methods: {
    signIn() {
      const provider = new auth.GithubAuthProvider();
      auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          this.user = result.user;
          console.log(this.user.uid);
          this.isLogged = true;
          // ...
        })
        .catch(error => {
          // Handle Errors here.
          // The firebase.auth.AuthCredential type that was used.
          console.error(error);
        });
    }
  },

  components: {
    Header
  }
};
</script>
