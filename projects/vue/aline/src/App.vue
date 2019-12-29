<script>
import "normalize.css";
export default {};
</script>

<template>
  <div id="app">
    <div id="nav" />
    <router-view />
  </div>
</template>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300&display=swap')
body
  font-family 'Open Sans', sans-serif
  color #fff
  font-size 18px
  background #5d5b6a
  height 100vh
  display flex
  justify-content center
  align-items center
button
  font-family 'Open Sans', sans-serif
  cursor pointer
  transition all .2s ease
  border none
  &:hover
    box-shadow none
  &:focus
    outline none
a
  text-decoration none
  color #000
  &:hover
  &:focus
    color #000
.container
  width 960px
</style>
