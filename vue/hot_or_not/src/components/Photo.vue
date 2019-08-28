<script>
import { mapState } from "vuex";
export default {
  name: "Photo",
  methods: {
    checkTheLastVerdict() {
      // Decide which class should be applied to the current photo for the correct animation
      if (this.lastVerdict === true) {
        return "active-photo--hot";
      } else if (this.lastVerdict === false) {
        return "active-photo--not-hot";
      } else {
        return "";
      }
    },
    swipeEvent(params) {
      if (params.direction === 2) {
        // Swipe to the left
        this.$store.dispatch("makeVerdict", true);
      } else if (params.direction === 4) {
        // Swipe to the right
        this.$store.dispatch("makeVerdict", false);
      }
    }
  },
  computed: {
    ...mapState(["ready", "lastVerdict", "currentlyVisible", "photos"]),
    secondPhotoIsActive: function() {
      return this.currentlyVisible === "second";
    },
    lastPhotoURL: function() {
      return this.photos[this.photos.length - 1].url;
    },
    penultimatePhotoURL: function() {
      return this.photos[this.photos.length - 2].url;
    },
    firstPhotoURL: function() {
      if (this.secondPhotoIsActive) {
        // If the second photo container is active, provide it with the latest photo
        // Give the first photo container, which is hidden behind the second one, a link to the next photo
        return this.penultimatePhotoURL;
      } else {
        // Otherwise, provide it with the latest photo URL, as it's currenly active
        return this.lastPhotoURL;
      }
    },
    secondPhotoURL: function() {
      if (this.secondPhotoIsActive) {
        return this.lastPhotoURL;
      } else {
        return this.penultimatePhotoURL;
      }
    },
    firstPhotoClass: function() {
      // Check wether any animation should be applied to the first photo container
      if (this.secondPhotoIsActive) {
        return "";
      } else {
        return this.checkTheLastVerdict();
      }
    },
    secondPhotoClass: function() {
      // Check wether any animation should be applied to the second photo container
      if (this.secondPhotoIsActive) {
        return this.checkTheLastVerdict();
      } else {
        return "";
      }
    }
  }
};
</script>

<template>
  <div v-if="ready" class="photos-inner-container">
    <!-- Show this copy of the first photo container if it has to be behind the second one  -->
    <div
      v-hammer:swipe="swipeEvent"
      v-if="secondPhotoIsActive"
      v-bind:class="firstPhotoClass"
      :style="{ backgroundImage: `url('${firstPhotoURL}')` }"
      class="active-photo"
    ></div>
    <div
      v-hammer:swipe="swipeEvent"
      v-bind:class="secondPhotoClass"
      :style="{ backgroundImage: `url('${secondPhotoURL}')` }"
      class="active-photo"
    ></div>
    <!-- Otherwise display the first photo container on top of the second one  -->
    <div
      v-hammer:swipe="swipeEvent"
      v-if="!secondPhotoIsActive"
      v-bind:class="firstPhotoClass"
      :style="{ backgroundImage: `url('${firstPhotoURL}')` }"
      class="active-photo"
    ></div>
  </div>
</template>