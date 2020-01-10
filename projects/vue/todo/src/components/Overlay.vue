<template>
  <div
    :class="
      getAddTaskVisible === false && getTasksVisible === false
        ? 'overlay'
        : 'overlay overlay--active'
    "
  ></div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Overlay",
  computed: {
    ...mapGetters(["getAddTaskVisible", "getTasksVisible"])
  }
};
</script>

<style lang="stylus">
.overlay
    position fixed
    z-index 2
    top 0
    right 0
    bottom 0
    left 0
    background rgba(0, 0, 0, 0)
    pointer-events none
    transition background .3s ease
    &--active
      background rgba(0, 0, 0, 0.8)
</style>
