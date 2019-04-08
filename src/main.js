import Vue from "vue";
import "./plugins/vuetify";
import Vuefire from "vuefire";
import App from "./App.vue";
import router from "./router";
import VueClipboard from "vue-clipboard2";

Vue.config.productionTip = false;

Vue.use(Vuefire);
Vue.use(VueClipboard);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
