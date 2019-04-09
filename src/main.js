import Vue from "vue";
import "./plugins/vuetify";
import { firestorePlugin } from "vuefire";
import App from "./App.vue";
import router from "./router";
import VueClipboard from "vue-clipboard2";

Vue.config.productionTip = false;

Vue.use(firestorePlugin);
Vue.use(VueClipboard);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
