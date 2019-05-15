<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex sx10 md8 lg6>
        <div v-if="!isLogged">
          <v-alert :value="true" type="error">You need to be logged in to see your notes</v-alert>
        </div>
        <v-card v-else>
          <v-toolbar dark>
            <span class="headline">Your Notes</span>
          </v-toolbar>
          <v-slide-x-reverse-transition group>
            <NoteCard
              :note="note"
              v-for="note in notes"
              :key="note.id"
              :favorites="favorites"
              :notes="notes"
              :repo="note.repo"
              :user="user"
            ></NoteCard>
          </v-slide-x-reverse-transition>
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

  name: "Notes",
  components: {
    NoteCard
  }
};
</script>

