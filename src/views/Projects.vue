<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex sx10 md8 lg6>
        <div v-if="!isLogged">
          <v-alert :value="true" type="error">You need to be logged in to see your projects</v-alert>
        </div>
        <v-card v-else>
          <v-toolbar dark>
            <span class="headline">Your Projects</span>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    },
    userData: {
      type: Object
    },
    isLogged: {
      type: Boolean
    }
  },
  data() {
    return {
      Projects: [],
      notes: [],
      userData: {},
      loaded: true
    };
  }
};
</script>
