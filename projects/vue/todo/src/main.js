import Vue from "vue";
import vueHeadful from "vue-headful";
import store from "./store";
import App from "./App.vue";
import { dom, library, config } from "@fortawesome/fontawesome-svg-core";
import {
  faSave,
  faTimes,
  faStickyNote,
  faBriefcase,
  faMusic,
  faPlane,
  faGraduationCap,
  faHome,
  faPalette,
  faShoppingCart,
  faPlus,
  faSyncAlt,
  faClipboard,
  faCheck,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faSave,
  faTimes,
  faStickyNote,
  faBriefcase,
  faMusic,
  faPlane,
  faGraduationCap,
  faHome,
  faPalette,
  faShoppingCart,
  faPlus,
  faSyncAlt,
  faClipboard,
  faCheck,
  faTrash
);

config.searchPseudoElements = true;

Vue.component("font-awesome-icon", FontAwesomeIcon);

dom.watch();

Vue.config.productionTip = false;

Vue.component("vue-headful", vueHeadful);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
