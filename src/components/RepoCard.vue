<template>
  <v-card flat>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex>
          <v-card>
            <v-container fill-height fluid pa-2>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="title" v-text="repo.full_name"></span>
                </v-flex>
              </v-layout>
              <v-list align-end>
                <v-chip color="lightgrey" small class="caption">
                  {{repo.stargazers_count}}
                  <v-icon right>star</v-icon>
                </v-chip>
                <v-chip color="amber" small>
                  {{repo.language}}
                  <v-icon right>code</v-icon>
                </v-chip>
              </v-list>
            </v-container>
            <div class="grey--text px-2 py-0">{{repo.description}}</div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-if="faved" class="red--text" @click="removeFavorite" icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn v-else class="grey--text" @click="addFavorite" icon>
                <v-icon>favorite_outline</v-icon>
              </v-btn>
              <NoteDialog :notes="notes" :repo="repo"></NoteDialog>
              <v-btn icon>
                <v-icon color="blue">link</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { db } from "../base.js";
import NoteDialog from "./NoteDialog.vue";

export default {
  name: "RepoCard",
  props: {
    repo: {
      type: Object,
      required: true
    },
    favorites: {
      type: Array
    },
    notes: {
      type: Array
    }
  },
  data() {
    return {
      faved: false
    };
  },
  methods: {
    addFavorite() {
      this.faved = true;
      db.collection("favorites")
        .doc(this.repo.id.toString())
        .set(this.repo);
    },
    removeFavorite() {
      this.faved = false;
      db.collection("favorites")
        .doc(this.repo.id.toString())
        .delete();
    }
  },
  mounted() {
    if (this.favorites.includes(this.repo)) {
      this.faved = true;
    }
  },
  components: {
    NoteDialog
  }
};
</script>
