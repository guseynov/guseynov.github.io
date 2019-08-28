import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { VueHammer } from 'vue2-hammer'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

// Use Hammer.js library for detecting swipes
Vue.use(VueHammer)