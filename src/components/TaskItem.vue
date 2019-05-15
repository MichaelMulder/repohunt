<template>
  <v-list-tile class="todo-item" :class="{'editing': editing}">
    <v-list-tile-action>
      <v-checkbox
        :input-value="task.done"
        @change="completeTask(task)"
        color="deep-purple"
        v-if="!editing"
      ></v-checkbox>
      <v-icon color="green" v-else>edit</v-icon>
    </v-list-tile-action>
    <template v-if="!editing">
      <v-list-tile-content
        :class="{ 'grey--text': task.done }"
        @dblclick="editing = true"
      >{{ task.text }}</v-list-tile-content>
      <v-scroll-x-reverse-transition>
        <v-icon v-if="task.done" color="deep-purple">check</v-icon>
      </v-scroll-x-reverse-transition>

      <v-list-tile-action>
        <v-btn @click="deleteTask(task)" color="red lighten-3" flat icon>
          <v-icon>close</v-icon>
        </v-btn>
      </v-list-tile-action>
    </template>
    <v-text-field
      v-model="task.text"
      @keyup.enter="editTask(task)"
      clearable
      color="primary"
      flat
      hide-details
      maxlength="1023"
      ref="input"
      solo
      v-else
      v-focus="editing"
    ></v-text-field>
  </v-list-tile>
</template>

<style lang="stylus">
.todo-item {
  .v-list__tile {
    height: auto;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  &.editing .v-list__tile {
    height: 48px;
  }
}
</style> 

<script>
export default {
  props: {
    task: {
      type: Object
    }
  },
  name: "TaskItem",
  data() {
    return {
      editing: false
    };
  },
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          context.$refs.input.focus();
        });
      }
    }
  },
  methods: {
    editTask(task) {
      console.log(task);
      this.$emit("editTask", task);
      this.editing = false;
    },
    deleteTask(task) {
      console.log(task);
      this.$emit("deleteTask", task);
    },
    completeTask(task) {
      this.$emit("completeTask", task);
    }
  }
};
</script>
