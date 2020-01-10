<template>
  <section class="categories-container">
    <div
      v-on:click="updateStoreData('all')"
      class="category"
      data-category-name="all"
    >
      <p class="category__title">
        All
      </p>
      <span class="category__tasks-amount">{{ getTasksCount }} tasks</span>
    </div>
    <div
      v-for="(value, categoryName, index) in filledCategories"
      v-bind:key="index"
      class="category"
      :data-category-name="value.categoryName"
      v-on:click="updateStoreData(value.categoryName)"
    >
      <p class="category__title">
        {{ value.categoryName.replace(/^\w/, c => c.toUpperCase()) }}
      </p>
      <span class="category__tasks-amount">{{ value.tasks.length }} tasks</span>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Categories",
  methods: {
    ...mapActions(["toggleTasksVisibility", "setActiveCategory"]),
    updateStoreData: function(category) {
      this.toggleTasksVisibility();
      this.setActiveCategory(category);
    }
  },
  computed: {
    ...mapGetters(["getCategories", "getTasksCount"]),
    filledCategories: function() {
      let filledCategoriesArr = [];
      for (const category in this.getCategories) {
        if (this.getCategories[category].length > 0) {
          filledCategoriesArr.push({
            categoryName: category,
            tasks: this.getCategories[category]
          });
        }
      }
      return filledCategoriesArr;
    }
  }
};
</script>

<style lang="stylus">
.categories-container
    display flex
    flex-wrap wrap
    justify-content space-evenly
    width 100%

.category
    background #fff
    box-shadow 0 0 20px 0 rgba(0,0,0,0.3)
    padding 20px 30px
    border-radius 10px
    display flex
    flex-direction column
    margin 0 0 30px
    cursor pointer
    transition all .2s ease
    flex 0 0 18%
    &:hover
    &:active
      box-shadow 0 0 20px 0 rgba(0,0,0,0.2)
      transform translateY(-10px)
    &__title
        font-size 21px
        margin-bottom 0
        font-weight 600
    &__tasks-amount
        color #838383
    &[data-category-name]
      svg 
        width 45px
        height 60px
        margin-bottom 15px
      &:before
        display block
        font-family "Font Awesome\ 5 Free"
        font-size 32px
        font-weight 900
        padding 0
        display none
    &[data-category-name="all"]
      svg
        path
          fill #5a87fc
      &:before
        content "\f328"
    &[data-category-name="misc"]
      svg
        path
          fill #43b3bd
      &:before
        content "\f249"
    &[data-category-name="work"]
      svg
        path
          fill #fcba77
      &:before
        content "\f0b1"
    &[data-category-name="music"]
      svg
        path
          fill #f8937e
      &:before
        content "\f001"
    &[data-category-name="travel"]
      svg
        path
          fill #59ca7b
      &:before
        content "\f072"
    &[data-category-name="study"]
      svg
        path
          fill #8d85d1
      &:before
        content "\f19d"
    &[data-category-name="home"]
      svg
        path
          fill #dc6a5c
      &:before
        content "\f015"
    &[data-category-name="art"]
      svg
        path
          fill #ad67c6
      &:before
        content "\f53f"
    &[data-category-name="shopping"]
      svg
        path
          fill #43b3bd
      &:before
        content "\f07a"
</style>
