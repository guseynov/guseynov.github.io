import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import styles from "./main.styl";
import vueHeadful from "vue-headful";

Vue.component("vue-headful", vueHeadful);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");


Vue.config.productionTip = true;
