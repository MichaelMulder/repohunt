<template>
  <div>
    <RepoCard
      :repo="favorite"
      v-for="favorite in favorites"
      :key="favorite.id"
      :favorites="favorites"
    ></RepoCard>
  </div>
</template>

<script>
import { db } from "../base";
import RepoCard from "../components/RepoCard.vue";
export default {
  props: {
    favorites: {
      type: Array
    }
  },
  components: {
    RepoCard
  }
};
</script>