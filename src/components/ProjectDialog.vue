<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-btn icon slot="activator">
      <v-icon color="deep-purple">add_box</v-icon>
    </v-btn>
    <v-card color="grey lighten-2">
      <v-toolbar dark flat>
        <v-btn @click="dialog = false" icon>
          <v-icon>close</v-icon>
        </v-btn>
        <span class="headline">Create a project</span>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-container grid-list-xs>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Title" solo flat hint="Think of something snazzy" required></v-text-field>
                <v-text-field label="link" solo flat hint="Link to your repo on GitHub" required></v-text-field>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      label="Picker in menu"
                      prepend-inner-icon="event"
                      color="purple"
                      solo
                      flat
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" color="purple" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="purple" @click="menu = false">Cancel</v-btn>
                    <v-btn flat color="purple" @click="$refs.menu.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12>
                <v-textarea label="Description" solo flat auto-grow hint="Don't forget the milk"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>save</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      menu: false,
      date: new Date().toISOString().substr(0, 10)
    };
  }
};
</script>
