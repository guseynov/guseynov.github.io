<template>
  <section class="new-user">
    <p class="eyebrow">Todo</p>
    <h1 class="main-heading">A simple list, kept in order.</h1>
    <p class="new-user__copy">
      This project is a lightweight personal planner. Add your name once, then
      keep tasks grouped into clear buckets.
    </p>

    <form class="new-user__form" @submit.prevent="saveUsernameInStore">
      <label class="new-user__label" for="username">Your name</label>
      <div class="new-user__input-container">
        <div
          class="new-user__placeholders-container"
          :class="{ 'new-user__placeholders-container--hidden': username }"
          aria-hidden="true"
        >
          <span
            v-for="dummyName in getDummyNames"
            :key="dummyName"
            class="new-user__placeholder"
          >
            {{ dummyName }}
          </span>
        </div>
        <input
          id="username"
          v-model.trim="username"
          required
          type="text"
          class="new-user__input"
          :placeholder="username ? '' : placeholderName"
          autocomplete="name"
          maxlength="40"
        />
      </div>
      <p v-if="errorMessage" class="new-user__error" role="alert">
        {{ errorMessage }}
      </p>
      <button class="btn btn--blue" type="submit">
        Continue
      </button>
    </form>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NewUser",
  data() {
    return {
      username: "",
      errorMessage: ""
    };
  },
  computed: {
    ...mapGetters(["getDummyNames"]),
    placeholderName() {
      return this.getDummyNames[0] || "Alex";
    }
  },
  methods: {
    ...mapActions(["updateUsername", "saveUsername"]),
    saveUsernameInStore() {
      if (!this.username) {
        this.errorMessage = "A name is required so the app can personalize the workspace.";
        return;
      }

      this.updateUsername(this.username);
      this.saveUsername();
    }
  }
};
</script>

<style lang="stylus">
.new-user
  max-width 640px
  min-height min(100vh - 120px, 760px)
  display flex
  flex-direction column
  justify-content center
  &__copy
    margin 16px 0 0
    color rgba(255, 255, 255, 0.7)
    line-height 1.7
    max-width 540px
  &__form
    margin-top 32px
  &__label
    display block
    margin-bottom 10px
    color rgba(255, 255, 255, 0.68)
  &__input-container
    position relative
    margin-bottom 14px
    overflow hidden
    border-radius 22px
  &__input
    width 100%
    min-height 64px
    padding 18px 20px
    border-radius 22px
    background rgba(255, 255, 255, 0.06)
    color #fff
    font-size clamp(1.25rem, 4vw, 2rem)
    font-weight 500
    box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px
    &:focus-visible
      outline 2px solid #0099ff
      outline-offset 3px
    &::placeholder
      color transparent
  &__placeholders-container
    position absolute
    inset 0
    top 50%
    left 20px
    right 20px
    height 64px
    margin-top -32px
    color rgba(255, 255, 255, 0.28)
    pointer-events none
    transition opacity .2s ease
    animation dummy-names 14s ease-in-out infinite
    &--hidden
      opacity 0
  &__placeholder
    min-height 64px
    display flex
    align-items center
    font-size clamp(1.25rem, 4vw, 2rem)
    font-weight 500
  &__error
    margin 0 0 14px
    color #8ccfff

@keyframes dummy-names
  0%, 12%
    transform translateY(0)
  16%, 28%
    transform translateY(-64px)
  32%, 44%
    transform translateY(-128px)
  48%, 60%
    transform translateY(-192px)
  64%, 76%
    transform translateY(-256px)
  80%, 92%
    transform translateY(-320px)
  100%
    transform translateY(0)

@media (max-width: 809px)
  .new-user
    min-height auto
    justify-content flex-start
    padding-top 24px
</style>
