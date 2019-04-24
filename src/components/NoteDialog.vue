<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-btn icon slot="activator">
      <v-icon color="green">note_add</v-icon>
    </v-btn>
    <v-card color="grey lighten-2">
      <v-toolbar dark flat>
        <span class="headline">Your note for {{repo.name}}</span>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-container grid-list-xs>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="Title"
                  solo
                  flat
                  hint="Think of something snazzy"
                  required
                  v-model="title"
                  :rules="inputRules"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  name="input-7-1"
                  label="Description"
                  solo
                  flat
                  auto-grow
                  hint="Don't forget the milk"
                  v-model="description"
                  :rules="inputRules"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="dialog = false" icon>
          <v-icon>close</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn @click="saveNote" icon>
          <v-icon>save</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { db } from "../base";

export default {
  props: {
    repo: {
      type: Object
    },
    notes: {
      type: Array
    },
    user: {
      type: Object
    }
  },
  data() {
    return {
      dialog: false,
      title: "",
      description: "",
      inputRules: [
        v => v.length >= 3 || "Come on! You can do better than that!"
      ]
    };
  },
  methods: {
    saveNote() {
      if (this.$refs.form.validate()) {
        const note = {
          title: this.title,
          description: this.description,
          repo: this.repo
        };
        db.collection("users")
          .doc(this.user.uid)
          .collection("notes")
          .add(note);
      }
    }
  }
};
</script>

