<template>
  <transition
    :if="isActive"
    :enter-active="enterClass"
    :leave-active="leaveClass"
  >
    <div class="picture">
      <div v-bind:style="bgStyles" class="photo-wrapper"></div>
    </div>
  </transition>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";

export default class Picture extends Vue {
  bgStyles = this.$attrs["bgStyles"];
  isActive = this.$attrs["isActive"];
  leaveClass = "animated bounceOutDown";
  enterClass = "animated tada";
}
</script>

<style scoped lang="stylus">
.picture
  margin-top 30px
  height 500px

.photo-wrapper
  border 15px solid #F497DA
  display inline-block
  border-radius 15px
  width 500px
  height 100%
  box-shadow 0 0 55px 1px rgba(0,0,0,.5)
  background-size cover
  background-position center
  background-repeat no-repeat
</style>
