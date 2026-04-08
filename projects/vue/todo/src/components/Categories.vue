<template>
  <section class="categories-container" aria-label="Task categories">
    <button
      @click="openTasksForCategory('all')"
      class="category"
      type="button"
    >
      <font-awesome-icon class="category__icon" :icon="categoryMeta.all.icon" />
      <p class="category__title">{{ categoryMeta.all.label }}</p>
      <span class="category__tasks-amount">{{ getTasksCount }} tasks total</span>
    </button>

    <button
      v-for="category in filledCategories"
      :key="category.categoryName"
      class="category"
      type="button"
      @click="openTasksForCategory(category.categoryName)"
    >
      <font-awesome-icon
        class="category__icon"
        :icon="categoryMeta[category.categoryName].icon"
      />
      <p class="category__title">
        {{ categoryMeta[category.categoryName].label }}
      </p>
      <span class="category__tasks-amount">{{ category.tasks.length }} tasks</span>
    </button>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { categoryMeta } from "../categoryMeta";

export default {
  name: "Categories",
  data() {
    return {
      categoryMeta
    };
  },
  computed: {
    ...mapGetters(["getCategories", "getTasksCount"]),
    filledCategories() {
      return Object.keys(this.getCategories)
        .filter(category => this.getCategories[category].length > 0)
        .map(category => ({
          categoryName: category,
          tasks: this.getCategories[category]
        }));
    }
  },
  methods: {
    ...mapActions(["openTasksForCategory"])
  }
};
</script>

<style lang="stylus">
.categories-container
  display grid
  grid-template-columns repeat(3, minmax(0, 1fr))
  gap 16px
  width 100%

.category
  text-align left
  background linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03))
  color #fff
  border-radius 20px
  padding 20px
  box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px
  transition transform .2s ease, box-shadow .2s ease, background-color .2s ease
  &:hover
    transform translateY(-2px)
    box-shadow rgba(0, 153, 255, 0.28) 0 0 0 1px
  &:focus-visible
    outline 2px solid #0099ff
    outline-offset 3px
  &__icon
    width 20px
    height 20px
    color #0099ff
  &__title
    margin 18px 0 8px
    font-size 1.15rem
    font-weight 600
  &__tasks-amount
    color rgba(255, 255, 255, 0.64)
    font-size 0.95rem

@media (max-width: 980px)
  .categories-container
    grid-template-columns repeat(2, minmax(0, 1fr))

@media (max-width: 809px)
  .categories-container
    grid-template-columns 1fr
</style>
