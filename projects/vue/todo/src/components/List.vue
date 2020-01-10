<template>
  <section class="tasks">
    <h2 class="tasks__heading">
      Tasks by categories
    </h2>
    <p class="no-tasks" v-if="getTasksCount === 0">
      You have no tasks yet
    </p>
    <Categories v-if="getTasksCount > 0" />
    <button
      type="button"
      class="add-task-btn"
      v-on:click="toggleAddTaskVisibility"
    >
      <font-awesome-icon icon="plus" />
    </button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Categories from "./Categories.vue";
export default {
  name: "List",
  methods: {
    ...mapActions(["toggleAddTaskVisibility"])
  },
  computed: {
    ...mapGetters(["getCategories", "getTasksCount"])
  },
  components: {
    Categories
  }
};
</script>

<style lang="stylus">
.tasks__heading
  margin-bottom 30px
.no-tasks
    opacity .5
    text-align center
.add-task-btn
    width 70px
    height 70px
    background #5380f5
    color #fff
    border-radius 50%
    display flex
    align-items center
    justify-content center
    font-size 38px
    box-shadow 0 0 20px 0 rgba(0, 0, 0, 0.3)
    float right
    transition box-shadow .3s ease
    &:hover
        box-shadow 0 0 20px 0 rgba(0, 0, 0, 0)
</style>
