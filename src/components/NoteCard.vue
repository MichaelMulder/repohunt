<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex sx10 md6>
        <v-card>
          <v-toolbar>
            <span>{{note.title}}</span>
          </v-toolbar>
          <v-card-text class="subheading">{{note.description}}</v-card-text>
          <v-card-text>{{repo.full_name}}</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RepoCard from "../components/RepoCard.vue";
export default {
  props: {
    notes: {
      type: Array
    },
    note: {
      type: Object
    },
    favorites: {
      type: Array
    },
    repo: {
      type: Object
    }
  },
  name: "NoteCard",
  component: {
    RepoCard
  }
};
</script>