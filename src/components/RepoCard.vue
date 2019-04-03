<template>
  <v-card>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex>
          <v-card>
            <v-container fill-height fluid pa-2>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline black--text" v-text="repo.full_name"></span>
                </v-flex>
              </v-layout>
              <v-chip color="lightgrey">
                {{repo.stargazers_count}}
                <v-icon right>star</v-icon>
              </v-chip>
            </v-container>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>note_add</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>share</v-icon>
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
  }
};
</script>
