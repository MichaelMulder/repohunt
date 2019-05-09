<template>
  <v-app>
    <Header @signIn="signIn" :user="user" :isLogged="isLogged" :userData="userData"></Header>
    <v-content class="bg-color">
      <br>
      <br>
      <br>
      <router-view :isLogged="isLogged" :user="user" :userData="userData"></router-view>
    </v-content>
  </v-app>
</template>
<style scoped>
.bg-color {
  background-color: #607d8b;
  background-image: url("cubes.png");
  background-repeat: repeat;
}
</style>

<script>
import { db, auth } from "./base";
import Header from "./components/Header.vue";
import Axios from "axios";

export default {
  name: "App",
  data() {
    return {
      user: {},
      userData: {},
      isLogged: false
    };
  },
  firestore() {
    return {
      userData: db.collection("users").doc(this.user.uid)
    };
  },
  methods: {
    signIn() {
      const provider = new auth.GithubAuthProvider();
      provider.addScope("repo");
      auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          this.user = result.user;
          this.user.token = token;
          this.isLogged = true;
          console.log(result.additionalUserInfo.isNewUser);
          console.log(result.user.uid);
          console.log(this.user.uid);
          if (result.additionalUserInfo.isNewUser) {
            db.collection("users")
              .doc(this.user.uid)
              .set({
                points: 1000
              });
          }
          this.getUserRepos(this.user);
          console.log(this.user);
        })
        .catch(error => {
          // Handle Errors here.
          // The firebase.auth.AuthCredential type that was used.
          console.error(error);
        });
    },
    getUserRepos(user) {
      Axios.get(`https://api.github.com/user/repos`, {
        headers: {
          Authorization: "token " + user.token
        }
      }).then(result => {
        user.repos = result.data;
      });
    }
  },
  components: {
    Header
  }
};
</script>
