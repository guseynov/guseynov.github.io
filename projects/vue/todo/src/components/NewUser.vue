<template>
  <div class="new-user">
    <h1 class="main-heading">What's your name?</h1>
    <div class="new-user__input-container">
      <input
        v-on:input="updateUsername($event.target.value)"
        required
        type="text"
        class="new-user__input"
      />
      <div class="new-user__placeholders-container">
        <span
          v-for="dummyName in getDummyNames"
          v-bind:key="dummyName"
          class="new-user__placeholder"
          >{{ dummyName }}</span
        >
      </div>
    </div>
    <button
      v-on:click="saveUsernameInStore"
      class="btn btn--blue"
      type="button"
    >
      Continue
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
export default {
  name: "NewUser",
  methods: {
    ...mapActions(["updateUsername", "saveUsername"]),
    saveUsernameInStore: function() {
      if (!this.getUsername) {
        Swal.fire({
          title: "Error!",
          text:
            "I really need your name to keep this app running. Would you mind filling the input?",
          icon: "error",
          confirmButtonText: "Cool"
        });
      } else {
        this.saveUsername();
      }
    }
  },
  computed: {
    ...mapGetters(["getUsername", "getDummyNames"])
  }
};
</script>

<style lang="stylus">
.new-user
    &__input-container
        position relative
        overflow hidden
        height 60px
    &__input
        background none
        border 1px solid alpha(#5886ff, .2)
        border-width 0 0 3px 0
        font-size 40px
        font-weight 600
        line-height 60px
        outline none
        box-sizing border-box
        position relative
        height 60px
        font-weight 300
        padding 0
        position relative
        transition all .2s ease
        z-index 1
        &-container
            margin-bottom 40px
        &:focus
        &:active
            border-color #5886ff
            outline none
        &:valid + .new-user__placeholders-container
            opacity 0
    &__placeholders-container
        position absolute
        top 0
        left 0
        width 100%
        opacity .2
        transition opacity .3s ease
        animation 10s ease 2s infinite dummy-names;
    &__placeholder
        display block
        line-height 60px
        font-size 40px
        font-weight 300

@keyframes dummy-names
  for i in 0..9
    {10% * i}
        transform translateY(i * -60px)
</style>
