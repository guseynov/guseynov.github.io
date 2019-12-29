import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = true;

Vue.component("Picture", require("./components/Picture.vue").default);
Vue.component("Controls", require("./components/Controls.vue").default);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
