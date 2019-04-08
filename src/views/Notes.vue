<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex sx10 md6>
        <v-card>
          <v-toolbar>
            <span class="headline">Your Notes</span>
          </v-toolbar>
          <NoteCard
            :note="note"
            v-for="note in notes"
            :key="note.id"
            :favorites="favorites"
            :notes="notes"
            :repo="note.repo"
          ></NoteCard>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NoteCard from "../components/NoteCard.vue";
import { db } from "../base";
export default {
  props: {
    notes: {
      type: Array
    },
    favorites: {
      type: Array
    }
  },

  name: "Notes",
  components: {
    NoteCard
  }
};
</script>

