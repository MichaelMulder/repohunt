<template>
  <v-card>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex>
          <v-card>
            <v-container fill-height fluid pa-2>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline" v-text="repo.full_name"></span>
                </v-flex>
              </v-layout>
              <v-chip color="lightgrey">
                {{repo.stargazers_count}}
                <v-icon right>star</v-icon>
              </v-chip>
              <v-chip color="amber">
                {{repo.language}}
                <v-icon right>code</v-icon>
              </v-chip>
            </v-container>
            <div class="grey--text px-2">{{repo.description}}</div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :class="fav ? 'red--text' : ''" @click="fav = !fav" icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="green">note_add</v-icon>
              </v-btn>
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
export default {
  name: "RepoCard",
  props: {
    repo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      fav: false
    };
  }
};
</script>
