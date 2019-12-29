<script>
import { mapState } from "vuex";
import Photo from "./Photo.vue";

export default {
  name: "Photos",
  components: {
    Photo
  },
  computed: {
    ...mapState(["photos", "ready"])
  },
  mounted() {
    // Call parent method and start loading new images in the background
    this.$parent.getNewImages(50);
  }
};
</script>

<template>
  <div class="photos-container">
    <transition appear name="fade">
      <div v-if="!ready" class="loading-screen">
        <span class="loading-screen__text">
          Loading new photos from the API, it may take some time
          <br />
          <b>{{ photos.length }} / 5 new photos downloaded</b>
        </span>
      </div>
    </transition>
    <Photo />
  </div>
</template>
