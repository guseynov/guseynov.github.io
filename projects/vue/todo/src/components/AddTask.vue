<template>
  <section
    class="dialog-shell"
    role="dialog"
    aria-modal="true"
    aria-labelledby="add-task-title"
  >
    <form class="dialog-card add-task" @submit.prevent="submitTask">
      <header class="dialog-header">
        <div>
          <p class="dialog-kicker">Create</p>
          <h2 id="add-task-title" class="dialog-title">New task</h2>
        </div>
        <button
          @click="closeDialog"
          type="button"
          class="dialog-close"
          aria-label="Close add task dialog"
        >
          <font-awesome-icon icon="times" />
        </button>
      </header>

      <label class="field">
        <span class="field__label">Title</span>
        <input
          ref="titleInput"
          v-model.trim="title"
          class="field__input"
          type="text"
          maxlength="80"
          placeholder="Ship portfolio refresh"
        />
      </label>

      <label class="field">
        <span class="field__label">Notes</span>
        <textarea
          v-model.trim="description"
          class="field__input field__input--textarea"
          rows="4"
          maxlength="240"
          placeholder="Optional details, context, or next step."
        ></textarea>
      </label>

      <label class="field">
        <span class="field__label">Category</span>
        <select v-model="category" class="field__input field__input--select">
          <option value="" disabled hidden>Select a category</option>
          <option
            v-for="(value, categoryName) in getCategories"
            :key="categoryName"
            :value="categoryName"
          >
            {{ categoryName.replace(/^\w/, c => c.toUpperCase()) }}
          </option>
        </select>
      </label>

      <p v-if="errorMessage" class="dialog-error" role="alert">
        {{ errorMessage }}
      </p>

      <footer class="dialog-actions">
        <button @click="closeDialog" type="button" class="btn btn--ghost">
          Cancel
        </button>
        <button type="submit" class="btn btn--blue">
          Add task
        </button>
      </footer>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddTask",
  data() {
    return {
      title: "",
      description: "",
      category: "",
      errorMessage: ""
    };
  },
  computed: {
    ...mapGetters(["getCategories", "getAddTaskVisible"])
  },
  methods: {
    ...mapActions(["addTask", "closeDialog"]),
    resetForm() {
      this.title = "";
      this.description = "";
      this.category = "";
      this.errorMessage = "";
    },
    focusTitleInput() {
      this.$nextTick(() => {
        if (this.$refs.titleInput) {
          this.$refs.titleInput.focus();
        }
      });
    },
    submitTask() {
      if (!this.title) {
        this.errorMessage = "Add a short title so the task can be recognized later.";
        this.focusTitleInput();
        return;
      }

      if (!this.category) {
        this.errorMessage = "Choose a category to keep the list structured.";
        return;
      }

      this.addTask({
        title: this.title,
        description: this.description,
        category: this.category,
        done: false
      });
      this.resetForm();
      this.closeDialog();
    }
  },
  watch: {
    getAddTaskVisible(isVisible) {
      if (isVisible) {
        this.focusTitleInput();
      } else {
        this.resetForm();
      }
    }
  }
};
</script>

<style lang="stylus">
.dialog-shell
  position fixed
  inset 0
  z-index 3
  display grid
  place-items center
  padding 24px

.dialog-card
  width 100%
  max-width 640px
  background linear-gradient(180deg, rgba(10, 10, 10, 0.98), rgba(4, 4, 4, 0.98))
  color #fff
  border-radius 22px
  padding 20px
  box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px, rgba(0, 0, 0, 0.45) 0 20px 60px

.dialog-header
  display flex
  align-items flex-start
  justify-content space-between
  gap 16px
  margin-bottom 18px

.dialog-kicker
  margin 0 0 6px
  color rgba(255, 255, 255, 0.56)
  font-size 12px
  font-weight 600
  letter-spacing 0.16em
  text-transform uppercase

.dialog-title
  margin 0
  font-family "Space Grotesk", sans-serif
  font-size clamp(1.6rem, 4vw, 2.2rem)
  letter-spacing -0.05em

.dialog-close
  width 44px
  height 44px
  border-radius 999px
  background rgba(255, 255, 255, 0.08)
  color #fff
  font-size 1rem
  box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px

.field
  display block
  margin-bottom 14px
  &__label
    display block
    margin-bottom 8px
    color rgba(255, 255, 255, 0.68)
    font-size 0.9rem
  &__input
    width 100%
    min-height 48px
    padding 12px 14px
    border-radius 16px
    background rgba(255, 255, 255, 0.06)
    color #fff
    box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px
    font-size 1rem
    &:focus-visible
      outline 2px solid #0099ff
      outline-offset 2px
    &::placeholder
      color rgba(255, 255, 255, 0.34)
  &__input--textarea
    min-height 104px
    resize vertical
  &__input--select
    appearance auto
    color-scheme dark
    padding-right 40px

.field__input--select option
  background #111
  color #fff

.dialog-error
  margin 4px 0 0
  color #8ccfff
  font-size 0.95rem

.dialog-actions
  display flex
  justify-content flex-end
  gap 12px
  margin-top 18px

@media (max-width: 809px)
  .dialog-shell
    align-items end
    padding 12px

  .dialog-card
    width 100%
    max-width 560px
    max-height calc(100vh - 24px)
    overflow auto
    border-radius 22px 22px 18px 18px

  .dialog-actions
    flex-direction column-reverse
    .btn
      width 100%
</style>
