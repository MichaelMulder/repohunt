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
          <ProjectCard
            :projects="projects"
            v-for="project in projects"
            :key="project.id"
            :repo="project.repo"
            :project="project"
            :user="user"
            :userData="userData"
            @completeProject="completeProject"
            @deleteProject="deleteProject"
          ></ProjectCard>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db, fs } from "../base";
import ProjectCard from "../components/ProjectCard";
import Axios from "axios";

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
      projects: [],
      notes: [],
      loaded: true,
      repoStats: {},
      today: new Date().toISOString().substr(0, 10)
    };
  },

  firestore() {
    return {
      projects: db
        .collection("users")
        .doc(this.user.uid)
        .collection("projects")
    };
  },
  computed: {
    completedProjects() {
      return this.projects.filter(project => project.done).length;
    },
    progress() {
      return (this.completedProjects / this.project.length) * 100;
    },
    remainingProjects() {
      return this.projects.length - this.completedProjects;
    }
  },

  methods: {
    completeProject(project, completedTasks) {
      if (!project.done) {
        let pointsAwared = 100;
        if (this.repoStats.total >= completedTasks) {
          db.collection("users")
            .doc(this.user.uid)
            .collection("projects")
            .doc(project.id)
            .update({
              done: true
            });
          if (project.date <= this.today) {
            pointsAwared *= this.completedProjects / 2;
            pointsAwared *= completedTasks / 10;
          }
          db.collection("users")
            .doc(this.user.uid)
            .update({
              points: fs.FieldValue.increment(pointsAwared)
            });
        }
      }
      this.getRepoStats(project.repo);
    },
    getRepoStats(repo) {
      Axios.get(
        `https://api.github.com/repos/${repo.full_name}/stats/contributors`
      ).then(response => {
        this.repoStats = response.data[0];
      });
    },
    deleteProject(project) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("projects")
        .doc(project.id)
        .delete();
    }
  },

  components: {
    ProjectCard
  }
};
</script>
