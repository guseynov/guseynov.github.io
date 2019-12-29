<template>
  <div id="app">
    <header class="header">
      <h1 class="header__title">
        <b>Hey!</b> I heard you like cat pictures, so I made this small app for
        you.
      </h1>
      <h2 class="header__title">
        But sometimes you don't have an internet connection: what to do then? No
        worries: you can choose your favorite photos and I will save them for
        you.
      </h2>
      <h3 class="header__title">
        Just visit the site when you will be offline: all your favorites would
        be waiting for you, I promise.
      </h3>
    </header>
    <span class="current-status">
      Your current status:
      <span v-show="isOnline"> <b>ONLINE</b>, you are seeing new photos </span>
      <span v-show="isOffline">
        <b>OFFLINE</b>, you can watch what you have saved
      </span>
    </span>
    <Picture
      :isActive="isActive"
      :bgStyles="bgStyles"
      :photoSaved="photoSaved"
    ></Picture>
    <Controls
      @removeActiveClass="removeActiveClass"
      @setNewPhoto="setNewPhoto"
      @savePhoto="savePhoto"
      @doNotSavePhoto="doNotSavePhoto"
    ></Controls>
  </div>
</template>

<script>
import { Component, Prop, Vue } from "vue-property-decorator";
import "animate.css/animate.css";
import Picture from "./components/Picture.vue";
import Controls from "./components/Controls.vue";
import VueOffline from "vue-offline";

Vue.use(VueOffline);

Component({
  name: "App"
});
export default class App extends Vue {
  setNewPhoto(styles) {
    this.bgStyles = styles;
    this.isActive = true;
  }
  removeActiveClass() {
    this.isActive = false;
  }
  savePhoto(blob) {
    localStorage["cat" + Math.round(Math.random() * 100000000)] = blob;
    this.photoSaved = true;
  }
  doNotSavePhoto() {
    this.photoSaved = false;
  }
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,800&display=swap')

*
  box-sizing border-box

html
  background #F65BE3
  display flex
  justify-content center
  align-items center

body
  display flex
  margin 0
  flex-direction column
  justify-content center
  align-items center
  font-family 'Open Sans',sans-serif
  color #fff
  overflow-x hidden

#app
  display inline-block
  text-align center
  width 960px

.header__title
  font-weight 300

.current-status
  display inline-block
  margin-top 15px
  border-radius 20px
  background #883677
  color #fff
  padding 10px 30px
</style>
