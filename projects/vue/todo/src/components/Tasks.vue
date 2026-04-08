<template>
  <section
    class="dialog-shell"
    role="dialog"
    aria-modal="true"
    aria-labelledby="tasks-title"
  >
    <div class="dialog-card category-tasks">
      <header class="dialog-header category-tasks__header">
        <div>
          <p class="dialog-kicker">Review</p>
          <h2 id="tasks-title" class="dialog-title">
            {{ activeCategoryLabel }}
          </h2>
          <p class="category-tasks__copy">
            {{ getTasks.length }} {{ getTasks.length === 1 ? "task" : "tasks" }}
          </p>
        </div>
        <button
          @click="closeDialog"
          type="button"
          class="dialog-close"
          aria-label="Close tasks dialog"
        >
          <font-awesome-icon icon="times" />
        </button>
      </header>

      <p class="category-tasks__empty" v-if="getTasks.length === 0">
        Nothing here yet.
      </p>

      <ul v-else class="category-tasks-list">
        <li
          v-for="task in getTasks"
          :key="task.id"
          class="category-task"
          :class="{ 'category-task--done': task.done }"
        >
          <div class="category-task__content">
            <div class="category-task__title-row">
              <p class="category-task__title">
                {{ task.title }}
              </p>
              <span v-if="task.done" class="category-task__badge">
                Done
              </span>
            </div>
            <p v-if="task.description" class="category-task__description">
              {{ task.description }}
            </p>
          </div>
          <div class="category-task__buttons">
            <button
              @click="toggleTaskStatusForTask(task)"
              class="category-task__action category-task__action--status"
              type="button"
              :aria-pressed="task.done ? 'true' : 'false'"
              :aria-label="task.done ? 'Mark task as incomplete' : 'Mark task as complete'"
            >
              <font-awesome-icon icon="check" />
            </button>
            <button
              @click="deleteTask(task)"
              class="category-task__action category-task__action--delete"
              type="button"
              aria-label="Delete task"
            >
              <font-awesome-icon icon="trash" />
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { categoryMeta } from "../categoryMeta";

export default {
  name: "Tasks",
  computed: {
    ...mapGetters(["getTasks", "getActiveCategory"]),
    activeCategoryLabel() {
      return categoryMeta[this.getActiveCategory].label;
    }
  },
  methods: {
    ...mapActions(["deleteTask", "toggleTaskStatus", "closeDialog"]),
    toggleTaskStatusForTask(task) {
      this.toggleTaskStatus(task);
    }
  }
};
</script>

<style lang="stylus">
.category-tasks
  width min(100%, 860px)
  max-height min(78vh, 860px)
  display flex
  flex-direction column
  &__header
    margin-bottom 16px
  &__copy
    margin 8px 0 0
    color rgba(255, 255, 255, 0.64)
  &__empty
    margin 0
    color rgba(255, 255, 255, 0.64)

.category-tasks-list
  margin 0
  padding 0
  list-style none
  overflow auto

.category-task
  display flex
  align-items flex-start
  gap 16px
  padding 18px 0
  border-top 1px solid rgba(255, 255, 255, 0.08)
  &:first-child
    border-top none
  &--done
    background rgba(127, 227, 162, 0.05)
    border-top-color transparent
    border-radius 16px
    margin 4px 0
    padding 16px
    .category-task__title,
    .category-task__description
      opacity 0.72
    .category-task__title
      text-decoration line-through
      text-decoration-thickness 1.5px
      text-decoration-color rgba(127, 227, 162, 0.48)
  &__content
    flex 1 1 auto
    min-width 0
  &__title-row
    display flex
    align-items center
    gap 10px
    flex-wrap wrap
  &__title
    margin 0
    font-size 1.08rem
    font-weight 600
    line-height 1.4
    word-break break-word
  &__badge
    display inline-flex
    align-items center
    min-height 22px
    padding 0 9px
    border-radius 999px
    background rgba(127, 227, 162, 0.14)
    color #9bf0b5
    font-size 0.72rem
    font-weight 700
    letter-spacing 0.05em
    text-transform uppercase
  &__description
    margin 8px 0 0
    color rgba(255, 255, 255, 0.68)
    line-height 1.55
    white-space pre-line
    word-break break-word
  &__buttons
    display flex
    gap 10px
  &__action
    width 44px
    height 44px
    border-radius 999px
    color #fff
    background rgba(255, 255, 255, 0.08)
    box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px
    transition background-color .2s ease, color .2s ease, box-shadow .2s ease, transform .2s ease
    &:hover
      transform translateY(-1px)
    &--status
      color #7fe3a2
    &[aria-pressed="true"]
      background rgba(127, 227, 162, 0.18)
      color #b8f7c9
      box-shadow rgba(127, 227, 162, 0.26) 0 0 0 1px
    &:focus
      outline none
    &:focus-visible
      outline 2px solid rgba(0, 153, 255, 0.85)
      outline-offset 3px
    &--delete
      color #ff9f9f

@media (max-width: 809px)
  .category-tasks
    width 100%
    max-height calc(100vh - 24px)

  .category-task
    flex-direction column

  .category-task__buttons
    width 100%
    justify-content flex-end
</style>
