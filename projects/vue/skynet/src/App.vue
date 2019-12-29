<script>
export default {
  name: "skynet_app",
  methods: {
    fetchData() {
      const CORSProxy = "https://cors-anywhere.herokuapp.com/";
      const API = "https://www.sknt.ru/job/frontend/data.json";
      fetch(CORSProxy + API)
        .then(response => response.json())
        .then(data => {
          this.$store.dispatch("successfulFetch", data);
        })
        .catch(error => {
          this.$store.dispatch("failedToFetch");
        });
    }
  }
};
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>
