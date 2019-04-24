<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex sx10 md8 lg6>
        <div v-if="!isLogged">
          <v-alert :value="true" type="error">You have to be logged in to view your favorites</v-alert>
        </div>
        <v-card v-else>
          <v-toolbar dark>
            <span class="headline">Your Favorites</span>
          </v-toolbar>
          <RepoCard
            :repo="favorite"
            v-for="favorite in favorites"
            :key="favorite.id"
            :favorites="favorites"
            :notes="notes"
            :user="user"
          ></RepoCard>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from "../base";
import RepoCard from "../components/RepoCard.vue";
export default {
  props: {
    user: {
      type: Object
    },
    isLogged: {
      type: Boolean
    }
  },
  data() {
    return {
      favorites: [],
      notes: []
    };
  },
  firestore() {
    return {
      favorites: db
        .collection("users")
        .doc(this.user.uid)
        .collection("favorites"),
      notes: db
        .collection("users")
        .doc(this.user.uid)
        .collection("notes")
    };
  },
  components: {
    RepoCard
  }
};
</script>