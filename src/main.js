import Vue from "vue";
import "./plugins/vuetify";
import Vuefire from "vuefire";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(Vuefire);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
