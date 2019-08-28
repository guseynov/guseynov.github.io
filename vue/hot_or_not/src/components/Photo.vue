<script>
import { mapState } from "vuex";
export default {
  name: "Photo",
  methods: {
    checkTheLastVerdict() {
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
        this.$store.dispatch("makeVerdict", true);
      } else if (params.direction === 4) {
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
        return this.penultimatePhotoURL;
      } else {
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
      if (this.secondPhotoIsActive) {
        return "";
      } else {
        return this.checkTheLastVerdict();
      }
    },
    secondPhotoClass: function() {
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
    <div
      v-hammer:swipe="swipeEvent"
      v-if="!secondPhotoIsActive"
      v-bind:class="firstPhotoClass"
      :style="{ backgroundImage: `url('${firstPhotoURL}')` }"
      class="active-photo"
    ></div>
  </div>
</template>