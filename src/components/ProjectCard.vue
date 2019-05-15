<template>
  <v-card flat color="grey lighten-2">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex>
          <v-card>
            <v-container fill-height fluid pa-2>
              <v-layout>
                <v-flex xs12 align-end flexbox>
                  <span class="title px-1 py-2" v-text="project.name"></span>
                  <div class="grey--text px-2">{{project.description}}</div>
                </v-flex>
              </v-layout>
              <div>
                <v-btn
                  icon
                  class="blue--text"
                  v-clipboard:copy="repo.html_url"
                  @click="linkCopied"
                  @dblclick="openInTab(repo)"
                >
                  <v-icon>link</v-icon>
                </v-btn>
                <v-btn
                  v-if="!project.done"
                  icon
                  class="deep-purple--text"
                  @click="completeProject(project, completedTasks)"
                >
                  <v-icon>turned_in_not</v-icon>
                </v-btn>
                <v-btn v-else icon class="deep-purple--text" @click="alreadyComplete()">
                  <v-icon>turned_in</v-icon>
                </v-btn>
                <v-btn v-if="project.done" icon class="red--text" @click="deleteProject(project)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </div>
            </v-container>
            <v-layout align-center justify-center>
              <v-progress-circular
                size="100"
                width="15"
                :value="progress"
                color="deep-purple"
              >{{progress.toFixed(1)}} %</v-progress-circular>
            </v-layout>
            <v-container class="grey lighten-5">
              <v-text-field
                v-model="text"
                label="What needs to be done?"
                solo
                @keydown.enter="createTask"
              >
                <v-fade-transition v-slot:append>
                  <v-icon v-if="task" @click="createTask">add_circle</v-icon>
                </v-fade-transition>
              </v-text-field>
              <v-card v-if="tasks.length > 0">
                <v-slide-y-transition class="py-0" group>
                  <TaskItem
                    v-for="task in tasks"
                    :key="task.id"
                    :task="task"
                    @editTask="editTask"
                    @deleteTask="deleteTask"
                    @completeTask="completeTask"
                  ></TaskItem>
                </v-slide-y-transition>
              </v-card>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar v-model="copied" color="success">Link to {{repo.full_name}} Copied!</v-snackbar>
    <v-snackbar v-model="complete" color="success">You have completed {{repo.full_name}}!</v-snackbar>
  </v-card>
</template>
<script>
import { db, fs } from "../base";
import TaskItem from "./TaskItem";

export default {
  props: {
    user: {
      type: Object
    },
    repo: {
      type: Object
    },
    project: {
      type: Object
    }
  },
  data() {
    return {
      text: "",
      tasks: [],
      copied: false,
      complete: false
    };
  },
  firestore() {
    return {
      tasks: db
        .collection("users")
        .doc(this.user.uid)
        .collection("projects")
        .doc(this.project.id)
        .collection("tasks")
    };
  },
  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    }
  },
  methods: {
    createTask() {
      const task = {
        text: this.text,
        done: false
      };
      db.collection("users")
        .doc(this.user.uid)
        .collection("projects")
        .doc(this.project.id)
        .collection("tasks")
        .add(task);

      this.text = "";
    },
    editTask(task) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("projects")
        .doc(this.project.id)
        .collection("tasks")
        .doc(task.id)
        .update({
          text: task.text
        });
    },
    deleteTask(task) {
      if (this.tasks.length > 1) {
        db.collection("users")
          .doc(this.user.uid)
          .collection("projects")
          .doc(this.project.id)
          .collection("tasks")
          .doc(task.id)
          .delete();
        db.collection("users")
          .doc(this.user.uid)
          .update({
            points: fs.FieldValue.increment(-75)
          });
      }
    },
    completeTask(task) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("projects")
        .doc(this.project.id)
        .collection("tasks")
        .doc(task.id)
        .update({
          done: true
        });
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
    },
    completeProject(project, completedTasks) {
      this.$emit("completeProject", project, completedTasks);
    },
    deleteProject(project) {
      this.$emit("deleteProject", project);
    },
    alreadyComplete() {
      this.complete = true;
    }
  },
  components: {
    TaskItem
  }
};
</script>