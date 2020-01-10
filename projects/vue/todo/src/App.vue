<template>
  <div id="app">
    <vue-headful
      title="Vue Todo App"
      description="A simple todo app powered by Vue/Vuex"
    />
    <h1 class="main-heading" v-if="getUsernameSaved">
      Hello, {{ getUsername }}!
    </h1>
    <NewUser v-if="!getUsernameSaved" />
    <Quote v-if="getUsernameSaved" />
    <List v-if="getUsernameSaved" />
    <transition name="fade">
      <AddTask v-show="getAddTaskVisible" />
    </transition>
    <transition name="fade">
      <Tasks v-show="getTasksVisible" />
    </transition>
    <Overlay />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NewUser from "./components/NewUser.vue";
import Quote from "./components/Quote.vue";
import List from "./components/List.vue";
import AddTask from "./components/AddTask.vue";
import Overlay from "./components/Overlay.vue";
import Tasks from "./components/Tasks.vue";
import "@fortawesome/fontawesome-free/css/solid.min.css";

export default {
  name: "Todo",
  computed: {
    ...mapGetters(["getUsername", "getUsernameSaved", "getAddTaskVisible", "getTasksVisible"])
  },
  components: {
    NewUser,
    Quote,
    List,
    AddTask,
    Overlay,
    Tasks
  }
};
</script>

<style lang="stylus">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&display=swap");

body
  background #f2f2f2
  color #333
  box-sizing border-box

body
input
button
textarea
  font-family "Open Sans", sans-serif

button
input
textarea
  padding 0
  border none
  background none
  box-sizing border-box
  outline none
  &:focus
  &:active
    outline none

button
  cursor pointer

#app
  width 960px
  margin 30px auto
  background #fdfdfd
  box-shadow 0 0 20px 0 rgba(0, 0, 0, 0.3)
  padding 30px
  border-radius 10px
  overflow hidden

.main-heading
  margin 0 0 20px
  font-weight 300

.btn
  padding 15px 20px
  border-radius 3px
  color #fff
  font-size 28px
  &--blue
    background #5886ff

.fade-enter-active, .fade-leave-active
  transition opacity 0.3s ease


.fade-enter, .fade-leave-to
  opacity 0
</style>
