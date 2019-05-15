import Vue from "vue";
import Router from "vue-router";
import Search from "./views/Search.vue";
import Notes from "./views/Notes.vue";
import Favorites from "./views/Favorites.vue";
import Projects from "./views/Projects.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "search",
      component: Search,
      props: true
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      props: true
    },
    {
      path: "/favorites",
      name: "favorites",
      component: Favorites,
      props: true
    },
    {
      path: "/notes",
      name: "notes",
      component: Notes,
      props: true
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects,
      props: true
    }
  ]
});
