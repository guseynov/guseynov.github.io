<script>
import { mapState } from "vuex";
import flameIcon from "../icons/flame.svg";
import thumbDownIcon from "../icons/thumb-down.svg";

export default {
  name: "Controls",
  methods: {
    makeVerdict(isHot) {
      this.$store.dispatch("makeVerdict", isHot);
    }
  },
  computed: {
    ...mapState(["ready", "isTransitioning"]),
    controlsDisabled() {
      return !this.ready || this.isTransitioning;
    },
    flameIcon() {
      return flameIcon;
    },
    thumbDownIcon() {
      return thumbDownIcon;
    }
  }
};
</script>

<template>
  <div v-if="ready" class="controls-container">
    <button
      type="button"
      :disabled="controlsDisabled"
      @click="makeVerdict(false)"
      class="btn btn--secondary"
      aria-keyshortcuts="ArrowLeft"
    >
      <span class="btn__eyebrow">Arrow left</span>
      <span class="btn__text">Not</span>
      <img :src="thumbDownIcon" alt="" aria-hidden="true" class="btn__icon" />
    </button>
    <div class="controls-separator" aria-hidden="true">or</div>
    <button
      type="button"
      :disabled="controlsDisabled"
      @click="makeVerdict(true)"
      class="btn btn--primary"
      aria-keyshortcuts="ArrowRight"
    >
      <span class="btn__eyebrow">Arrow right</span>
      <span class="btn__text">Hot</span>
      <img :src="flameIcon" alt="" aria-hidden="true" class="btn__icon" />
    </button>
  </div>
</template>
