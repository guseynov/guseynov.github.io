<script>
export default {
  name: "Info",
  methods: {
    toggleInfoScreen() {
      this.$store.dispatch("toggleInfoScreen");
    }
  }
};
</script>

<template>
  <div class="info-screen">
    <button v-on:click="toggleInfoScreen()" class="close-info-screen">
      Back to the app!
    </button>
    <p>
      All these people are not real and were generated by artificial
      intelligence. After you make your descision, this face will be sent to
      nonexistence, so don't expect to make a match :)
    </p>
    <p>
      Each photo has its unique ID, which is used to form a list of your
      actions. This information is accessible through the Vuex Store.
    </p>
    <p>The project uses Vue.js, Vuex, SCSS and Vue CLI.</p>
  </div>
</template>
