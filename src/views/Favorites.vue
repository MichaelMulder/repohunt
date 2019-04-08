<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex sx10 md8 lg6>
        <v-card>
          <v-toolbar dark>
            <span class="headline">Your Favorites</span>
          </v-toolbar>
          <RepoCard
            :repo="favorite"
            v-for="favorite in favorites"
            :key="favorite.id"
            :favorites="favorites"
            :notes="notes"
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
    favorites: {
      type: Array
    },
    notes: {
      type: Array
    }
  },
  components: {
    RepoCard
  }
};
</script>