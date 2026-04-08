<template>
  <div id="app">
    <vue-headful
      title="Todo"
      description="A minimal category-based todo app built with Vue"
    />
    <main class="app-shell">
      <section class="app-panel">
        <template v-if="getUsernameSaved">
          <header class="app-header">
            <p class="eyebrow">Simple planning</p>
            <div class="app-header__row">
              <div>
                <h1 class="main-heading">Hello, {{ getUsername }}.</h1>
                <p class="app-copy">
                  Capture tasks quickly, keep categories tidy, and finish work
                  without noise.
                </p>
              </div>
            </div>
          </header>
          <Quote />
          <List />
        </template>
        <NewUser v-else />
      </section>
    </main>
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

export default {
  name: "Todo",
  computed: {
    ...mapGetters([
      "getUsername",
      "getUsernameSaved",
      "getAddTaskVisible",
      "getTasksVisible"
    ])
  },
  methods: {
    handleEscapeKey(event) {
      if (event.key === "Escape" && (this.getAddTaskVisible || this.getTasksVisible)) {
        this.$store.dispatch("closeDialog");
      }
    }
  },
  mounted() {
    window.addEventListener("keydown", this.handleEscapeKey);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleEscapeKey);
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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mona+Sans:wght@500;700&display=swap");

html
body
  min-height 100%

*
*:before
*:after
  box-sizing border-box

body
  margin 0
  overflow-x hidden
  background radial-gradient(circle at top, rgba(0, 153, 255, 0.16), transparent 28%), #000
  color #fff

body
input
button
textarea
select
  font-family "Inter", sans-serif

button
input
textarea
select
  padding 0
  border none
  background none
  box-sizing border-box

button
  cursor pointer

#app
  min-height 100vh

.app-shell
  width 100%
  max-width 1040px
  margin 0 auto
  padding 20px 16px 28px

.app-panel
  background linear-gradient(180deg, rgba(9, 9, 9, 0.96), rgba(4, 4, 4, 0.98))
  border-radius 24px
  padding 22px
  box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px, rgba(0, 0, 0, 0.45) 0 24px 80px

.app-header
  margin-bottom 18px
  &__row
    display flex
    align-items flex-end
    justify-content space-between
    gap 16px

.eyebrow
  margin 0 0 8px
  color rgba(255, 255, 255, 0.64)
  font-size 11px
  font-weight 600
  letter-spacing 0.18em
  text-transform uppercase

.main-heading
  margin 0
  font-family "Mona Sans", sans-serif
  font-size clamp(2rem, 5vw, 3.9rem)
  font-weight 700
  letter-spacing -0.06em
  line-height 0.92

.app-copy
  margin 10px 0 0
  max-width 560px
  color rgba(255, 255, 255, 0.72)
  font-size 0.96rem
  line-height 1.5

.btn
  min-height 44px
  padding 10px 16px
  border-radius 999px
  color #fff
  font-size 0.95rem
  font-weight 600
  transition transform .2s ease, background-color .2s ease, box-shadow .2s ease
  &--blue
    background #0099ff
    box-shadow rgba(0, 153, 255, 0.35) 0 12px 32px
  &--ghost
    background rgba(255, 255, 255, 0.08)
    color #fff
    box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px
  &:hover
    transform translateY(-1px)
  &:focus-visible
    outline 2px solid #0099ff
    outline-offset 3px

.fade-enter-active, .fade-leave-active
  transition opacity 0.25s ease, transform 0.25s ease

.fade-enter, .fade-leave-to
  opacity 0
  transform translateY(8px)

::selection
  background rgba(0, 153, 255, 0.3)

@media (max-width: 809px)
  .app-shell
    padding 12px 10px 20px

  .app-panel
    padding 16px
    border-radius 20px

  .app-header
    margin-bottom 16px

@media (prefers-reduced-motion: reduce)
  *, *:before, *:after
    animation none !important
    transition none !important
</style>
