<template>
  <div class="add-task">
    <header class="add-task__header">
      New task
      <button
        v-on:click="toggleAddTaskVisibility"
        type="button"
        class="add-task__close"
      >
        <i class="fas fa-times"></i>
      </button>
    </header>

    <input
      required
      v-model="title"
      class="add-task__title"
      type="text"
      placeholder="Task title"
    />
    <textarea
      v-model="description"
      class="add-task__description"
      placeholder="What are you planning?"
    ></textarea>
    <select
      v-model="category"
      required
      class="add-task__select add-task-select"
    >
      <option value="">Select a category</option>
      <option
        class="add-task-select__option add-task-select-option"
        v-for="(value, categoryName, index) in getCategories"
        v-bind:key="index"
        :value="categoryName"
      >
        {{ categoryName.replace(/^\w/, c => c.toUpperCase()) }}
      </option>
    </select>

    <button
      v-on:click="submitTask"
      type="button"
      class="btn btn--blue add-task__submit"
    >
      <i class="fas fa-save"></i>
      Add new task
    </button>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapActions, mapGetters } from "vuex";
import Choices from "choices.js";
import "choices.js/public/assets/styles/base.min.css";
import "choices.js/public/assets/styles/choices.min.css";
import "choices.js/public/assets/scripts/choices.min.js";
import Swal from "sweetalert2";

export default {
  name: "AddTask",
  data: function() {
    return {
      title: "",
      description: "",
      category: "art",
      choicesInstance: undefined
    };
  },
  methods: {
    ...mapActions(["addTask", "toggleAddTaskVisibility"]),
    submitTask: function() {
      if (!this.title) {
        Swal.fire({
          title: "Not so fast",
          text: "Your task should have a title",
          icon: "error",
          confirmButtonText: "I came up with a title"
        });
      } else if (!this.category) {
        Swal.fire({
          title: "Not so fast",
          text: "Choose a category that fits your task",
          icon: "error",
          confirmButtonText: "Sure"
        });
      } else {
        this.addTask({
          title: this.title,
          description: this.description,
          category: this.category,
          done: false
        });
        this.title = "";
        this.description = "";
        this.category = "art";
        this.toggleAddTaskVisibility();
        this.choicesInstance.setChoiceByValue("art");
      }
    }
  },
  computed: {
    ...mapGetters(["getCategories"])
  },
  mounted: function() {
    this.choicesInstance = new Choices(
      document.querySelector(".add-task-select")
    );
  }
};
</script>

<style lang="stylus">
.add-task
    position fixed
    z-index 3
    padding 30px
    width 500px
    background #f9f9f9
    top 50px
    left 50%
    margin-left -250px
    border-radius 10px
    &__header
        text-align center
        font-size 21px
        margin-bottom 30px
    &__close
        float right
        font-size 26px
        line-height 0
    &__title
        border 3px solid alpha(#5886ff, .2)
        border-width 0 0 3px 0
        font-size 28px
        font-weight 600
        position relative
        font-weight 300
        padding 0
        position relative
        transition all .2s ease
        margin-bottom 20px
        z-index 1
        width 100%
        &:focus
        &:active
            border-color #5886ff
            outline none
    &__description
        border 3px solid alpha(#5886ff, .2)
        background none
        font-size 24px
        padding 10px
        font-weight 300
        width 100%
        transition border-color .2s ease
        resize none
        margin-bottom 20px
        display block
        &:focus
        &:active
            border-color #5886ff
            outline none
    &__submit
        width 100%
        i
            margin-right 5px


.choices__item
    font-size 21px
    font-weight 300
    &[data-value]:before
        display inline-block
        width 30px
        margin-right 10px
        vertical-align middle
        font-family "Font Awesome 5 Free"
        text-align center
        font-weight 900
        padding 0
    &[data-value="misc"]:before
        content "\f249"
        color #43b3bd
    &[data-value="work"]:before
        content "\f0b1"
        color #fcba77
    &[data-value="music"]:before
        content "\f001"
        color #f8937e
    &[data-value="travel"]:before
        content "\f072"
        color #59ca7b
    &[data-value="study"]:before
        content "\f19d"
        color #8d85d1
    &[data-value="home"]:before
        content "\f015"
        color #dc6a5c
    &[data-value="art"]:before
        content "\f53f"
        color #ad67c6
    &[data-value="shopping"]:before
        content "\f07a"
        color #43b3bd
</style>
