<script>
export default {
  name: "Info",
  methods: {
    toggleInfoScreen() {
      this.$store.dispatch("toggleInfoScreen");
    }
  },
  mounted() {
    this.$nextTick(() => {
      const closeButton = this.$refs.closeButton;
      if (closeButton) {
        closeButton.focus();
      }
    });
  }
};
</script>

<template>
  <div class="info-screen" role="dialog" aria-modal="true" aria-labelledby="info-title">
    <div class="info-screen__panel shell-card">
      <button
        ref="closeButton"
        type="button"
        @click="toggleInfoScreen()"
        class="close-info-screen"
      >
        Back to the deck
      </button>
      <p class="eyebrow">About the project</p>
      <h2 id="info-title">Hot or Not, cleaned up for publishing</h2>
      <p>
        The original idea stays intact: rate AI-generated faces quickly and
        move on. The app now supports a live feed again through a same-origin
        proxy endpoint, with a bundled portrait deck as fallback so deployment
        does not depend on a brittle public proxy.
      </p>
      <p>
        Verdicts are tracked in the Vuex store, controls are keyboard-friendly,
        and the card animation timing now comes from the same source the UI
        uses for motion.
      </p>
      <p>
        Built with Vue 2, Vuex, SCSS, and a modernized Vite build.
      </p>
    </div>
  </div>
</template>
