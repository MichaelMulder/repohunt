<template>
  <v-card flat color="grey lighten-2">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex>
          <v-card>
            <v-container fill-height fluid pa-2>
              <v-layout>
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
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
