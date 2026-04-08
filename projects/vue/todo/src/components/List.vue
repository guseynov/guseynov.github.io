<template>
  <section class="tasks">
    <div class="tasks__topline">
      <div>
        <h2 class="tasks__heading">Tasks by category</h2>
        <p class="tasks__copy">
          Open a category to review tasks, mark progress, or delete clutter.
        </p>
      </div>
      <button type="button" class="btn btn--blue tasks__cta" @click="openAddTask">
        <font-awesome-icon icon="plus" />
        Add task
      </button>
    </div>

    <div v-if="getTasksCount === 0" class="empty-state">
      <p class="empty-state__title">No tasks yet.</p>
      <p class="empty-state__copy">
        Start with one small task and sort it into the category that fits best.
      </p>
      <button type="button" class="btn btn--ghost" @click="openAddTask">
        Create the first task
      </button>
    </div>

    <Categories v-else />
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Categories from "./Categories.vue";

export default {
  name: "List",
  components: {
    Categories
  },
  computed: {
    ...mapGetters(["getTasksCount"])
  },
  methods: {
    ...mapActions(["openAddTask"])
  }
};
</script>

<style lang="stylus">
.tasks
  &__topline
    display flex
    align-items flex-end
    justify-content space-between
    gap 12px
    margin-bottom 14px
  &__heading
    margin 0
    font-family "Mona Sans", sans-serif
    font-size clamp(1.35rem, 3.5vw, 1.9rem)
    letter-spacing -0.04em
  &__copy
    margin 6px 0 0
    color rgba(255, 255, 255, 0.64)
    line-height 1.45
    font-size 0.95rem
  &__cta
    display inline-flex
    align-items center
    gap 8px
    white-space nowrap

.empty-state
  padding 22px
  border-radius 20px
  text-align center
  background rgba(255, 255, 255, 0.04)
  box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px
  &__title
    margin 0 0 8px
    font-size 1.08rem
    font-weight 600
  &__copy
    margin 0 0 14px
    color rgba(255, 255, 255, 0.64)
    line-height 1.5
    font-size 0.95rem

@media (max-width: 809px)
  .tasks__topline
    flex-direction column
    align-items stretch

  .tasks__cta
    width 100%
    justify-content center
</style>
