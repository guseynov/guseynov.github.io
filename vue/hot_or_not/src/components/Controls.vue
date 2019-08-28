<script>
import { mapState } from "vuex";
export default {
  name: "Controls",
  methods: {
    makeVerdict(isHot) {
      this.$store.dispatch("makeVerdict", isHot);
    }
  },
  computed: {
    ...mapState(["ready"])
  }
};
</script>

<template>
  <div v-if="ready" class="controls-container">
    <button v-on:click="makeVerdict(true)" class="btn hot-btn">
      <span class="btn__text">Hot</span>
      <img :src="require('../icons/flame.svg')" alt="Hot" class="btn__icon" />
    </button>
    <div class="controls-separator">OR</div>
    <button v-on:click="makeVerdict(false)" class="btn not-hot-btn">
      <span class="btn__text">Not</span>
      <img :src="require('../icons/thumb-down.svg')" alt="Not Hot" class="btn__icon" />
    </button>
  </div>
</template>