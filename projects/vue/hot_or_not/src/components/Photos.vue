<script>
import { mapGetters, mapState } from "vuex";
import Photo from "./Photo.vue";

export default {
  name: "Photos",
  components: {
    Photo
  },
  computed: {
    ...mapState(["ready"]),
    ...mapGetters(["currentPhoto"])
  }
};
</script>

<template>
  <div class="photos-container">
    <transition appear name="fade">
      <div v-if="!ready" class="loading-screen">
        <div class="loading-screen__inner">
          <span class="loading-screen__eyebrow">Preparing the deck</span>
          <h2 class="loading-screen__title">Loading portraits</h2>
          <p class="loading-screen__text">
            Bundled images are being decoded so the first swipe feels instant.
          </p>
        </div>
      </div>
    </transition>
    <Photo v-if="currentPhoto" />
  </div>
</template>
