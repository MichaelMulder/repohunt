<template>
  <div>
    <NoteCard
      :note="note"
      v-for="note in notes"
      :key="note.id"
      :favorites="favorites"
      :notes="notes"
      :repo="note.repo"
    ></NoteCard>
  </div>
</template>

<script>
import NoteCard from "../components/NoteCard.vue";
import { db } from "../base";
export default {
  props: {
    notes: {
      type: Array
    },
    favorites: {
      type: Array
    }
  },

  name: "Notes",
  components: {
    NoteCard
  }
};
</script>

