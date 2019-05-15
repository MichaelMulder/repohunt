<template>
  <v-card flat color="grey lighten-2">
    <v-container fluid grid-list-md>
      <v-layout>
        <v-flex>
          <v-card class="overflow-hidden">
            <v-container fill-height fluid pa-2 align-center justify-end>
              <v-flex xs12>
                <v-card-title class="title px-0 py-0">
                  {{repo.full_name}}
                  <v-spacer></v-spacer>
                  <v-chip color="lightgrey" small class="caption">
                    {{repo.stargazers_count}}
                    <v-icon>star</v-icon>
                  </v-chip>
                  <v-chip color="amber" small class="caption">
                    {{repo.language}}
                    <v-icon>code</v-icon>
                  </v-chip>
                </v-card-title>
              </v-flex>
            </v-container>
            <div class="grey--text px-3">{{repo.description}}</div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn v-if="faved" class="red--text" @click="removeFavorite" icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn v-else-if="userData.points < 100" class="grey--text" disabled icon>
                <v-icon>favorite_outline</v-icon>
              </v-btn>
              <v-btn v-else class="grey--text" @click="addFavorite" icon>
                <v-icon>favorite_outline</v-icon>
              </v-btn>
              <v-expand-x-transition leave-absolute>
                <ProjectDialog :favorites="favorites" :user="user" :repo="repo" v-show="faved"></ProjectDialog>
              </v-expand-x-transition>
              <NoteDialog :notes="notes" :repo="repo" :user="user"></NoteDialog>
              <v-btn
                icon
                v-clipboard:copy="repo.html_url"
                @click="linkCopied"
                @dblclick="openInTab(repo)"
              >
                <v-icon color="blue">link</v-icon>
              </v-btn>
            </v-card-actions>
            <v-snackbar v-model="copied" color="success">Link to {{repo.full_name}} Copied!</v-snackbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<style scoped>
span {
  overflow: hidden;
}
</style>


<script>
import { db, fs } from "../base.js";
import NoteDialog from "./NoteDialog.vue";
import ProjectDialog from "./ProjectDialog.vue";

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
    },
    user: {
      type: Object
    },
    userData: {
      type: Object
    }
  },
  data() {
    return {
      faved: false,
      copied: false
    };
  },
  methods: {
    addFavorite() {
      this.faved = true;
      console.log(this.repo.html_url);
      db.collection("users")
        .doc(this.user.uid)
        .collection("favorites")
        .doc(this.repo.id.toString())
        .set(this.repo);
      db.collection("users")
        .doc(this.user.uid)
        .update({
          points: fs.FieldValue.increment(-100)
        });
    },
    removeFavorite() {
      this.faved = false;
      db.collection("users")
        .doc(this.user.uid)
        .collection("favorites")
        .doc(this.repo.id.toString())
        .delete();
      db.collection("users")
        .doc(this.user.uid)
        .update({
          points: fs.FieldValue.increment(50)
        });
    },
    linkCopied() {
      this.copied = true;
    },
    openInTab(repo) {
      window.open(repo.html_url, "_blank");
    }
  },
  mounted() {
    const favedIDs = this.favorites.map(favorite => favorite.id);
    if (favedIDs.includes(this.repo.id)) {
      this.faved = true;
    }
  },
  components: {
    NoteDialog,
    ProjectDialog
  }
};
</script>
