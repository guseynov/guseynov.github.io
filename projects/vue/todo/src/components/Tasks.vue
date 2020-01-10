<template>
  <div class="category-tasks">
    <header class="category-tasks__header">
      {{
        getActiveCategory === "all"
          ? "All tasks"
          : "Tasks from the " + getActiveCategory + " category"
      }}

      <button
        v-on:click="toggleTasksVisibility"
        type="button"
        class="category-tasks__close"
      >
        <font-awesome-icon icon="times" />
      </button>
    </header>
    <p class="no-tasks" v-if="getTasksCount === 0">
      You have no tasks in this category yet
    </p>
    <ul class="category-tasks-list">
      <li
        v-for="(task, index) in getTasks"
        v-bind:key="index"
        class="category-tasks-list__task category-task"
      >
        <div class="category-task__content">
          <p class="category-task__title">
            {{ task.title }}
          </p>
          <p class="category-task__description">
            {{ task.description }}
          </p>
        </div>
        <div class="category-task__buttons">
          <button
            v-on:click="
              toggleTaskStatusForceUpdate({
                category: task.category,
                index: task.index
              })
            "
            :class="
              task.done === true
                ? 'category-task__status category-task__status--done'
                : 'category-task__status'
            "
            type="button"
          >
          
            <font-awesome-icon icon="check" />
          </button>
          <button
            v-on:click="
              deleteTask({
                category: task.category,
                index: task.index
              })
            "
            class="category-task__delete"
            type="button"
          >
            <font-awesome-icon icon="trash" />
          </button>
        </div>
      </li>
    </ul>
    <img class="great-job" :src="visualCongratulationsPath" alt="Great Job!" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import fireworks from "fireworks";
import audioCongratulations from "../assets/sounds/greatjob.wav";
import visualCongratulations from "../assets/gif/greatjob.gif";

export default {
  name: "Tasks",
  data: function() {
    return {
      visualCongratulationsPath: ""
    };
  },
  computed: {
    ...mapGetters([
      "getTasks",
      "getActiveCategory",
      "getTaskStatus",
      "getTasksCount"
    ])
  },
  methods: {
    ...mapActions(["deleteTask", "toggleTaskStatus", "toggleTasksVisibility"]),
    toggleTaskStatusForceUpdate: function(task) {
      // eslint-disable-next-line no-console
      console.log(task);
      this.toggleTaskStatus(task);
      const status = this.getTaskStatus(task);
      if (status === true) {
        this.visualCongratulationsPath = visualCongratulations;
        setTimeout(() => {
          this.visualCongratulationsPath = "";
        }, 3000);
        new Audio(audioCongratulations).play();
        for (let index = 0; index < 10; index++) {
          fireworks({
            x: Math.random(window.innerWidth) * 1000,
            y: Math.random(window.innerWidth) * 1000,
            colors: ["#cc3333", "#4CAF50", "#81C784"]
          });
        }
      }
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="stylus">
.category-tasks
    position fixed
    z-index 3
    padding 30px 0
    width 960px
    background #f9f9f9
    top 50px
    left 50%
    margin-left -480px
    border-radius 3px
    &__header
        text-align center
        font-size 21px
        margin-bottom 30px
        padding 0 30px
    &__close
        float right
        font-size 26px
        line-height 0
.category-tasks-list
    margin 0
    padding 0

.category-task
    list-style-type none
    border 1px solid #ebebeb
    border-width 1px 0
    padding 10px 30px
    width 100%
    display flex
    align-items center
    &__content
        max-width 700px
        overflow hidden
        white-space pre-line
    &__title
        font-size 24px
        margin 0
        font-weight 600
    &__description
        font-size 18px
        margin 0
        font-weight 300
    &__buttons
        margin-left auto
    &__status
    &__delete
        opacity .5
        transition opacity .2s ease
        font-size 42px
        line-height 0
        &:hover
            opacity .7
        &:active
        &--done
            opacity 1
    &__status
        color #63cc83
        margin-right 30px
    &__delete
        color #da6f62

.great-job
    position fixed
    bottom 30px
    right 30px
    &[src=""]
        display none
</style>
