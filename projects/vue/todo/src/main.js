import Vue from "vue";
import vueHeadful from "vue-headful";
import store from "./store";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.component("vue-headful", vueHeadful);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
