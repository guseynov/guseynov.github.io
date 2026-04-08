<template>
  <div
    :class="overlayClasses"
    :aria-hidden="overlayActive ? 'false' : 'true'"
    @click="closeDialog"
  ></div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Overlay",
  computed: {
    ...mapGetters(["getAddTaskVisible", "getTasksVisible"]),
    overlayActive() {
      return this.getAddTaskVisible || this.getTasksVisible;
    },
    overlayClasses() {
      return this.overlayActive ? "overlay overlay--active" : "overlay";
    }
  },
  methods: {
    ...mapActions(["closeDialog"])
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
  transition background .25s ease
  &--active
    background rgba(0, 0, 0, 0.78)
    pointer-events auto
</style>
