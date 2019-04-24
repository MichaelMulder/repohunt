<template>
  <v-card flat color="grey lighten-2">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex>
          <v-card>
            <v-toolbar flat dark>
              <span class="headline">{{note.title}}</span>
            </v-toolbar>
            <v-card-text class="subheading">{{note.description}}</v-card-text>
            <v-card-actions>
              <v-card-text class="caption">{{repo.full_name}}</v-card-text>
              <EditNote :note="note" :repo="note.repo" :user="user"></EditNote>
              <v-btn icon @click="deleteNote(note.id)">
                <v-icon color="red">delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { db } from "../base";
import EditNote from "./EditNote";

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
    },
    user: {
      type: Object
    }
  },
  name: "NoteCard",
  methods: {
    deleteNote(id) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("notes")
        .doc(id)
        .delete();
    }
  },
  components: {
    EditNote
  }
};
</script>