<template>
  <header class="navbar">
    <div class="container">
      <nav class="navbar__nav">
        <ul class="navbar__list">
          <li class="navbar__item">
            <router-link to="/">
              Home
            </router-link>
          </li>
          <li class="navbar__item">
            <router-link to="/calculator">
              Calculator
            </router-link>
          </li>
          <li class="navbar__item">
            <router-link to="/websocket">
              Websocket
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="stylus">
.container
  margin 0 auto
.navbar
  position fixed
  width 100%
  left 0
  top 0
  background #758184
  box-shadow 0 0 20px 0 rgba(0, 0, 0, 0.3)
  &__list
    margin 0
    padding 0
    display flex
    list-style-type none
    justify-content center
  &__item
    padding 0 20px
    transition all .2s ease
    &:hover
      background lighten(#758184, 20%)
    a
      line-height 60px
      color #fff
      text-transform uppercase
      font-weight 300
      display block
</style>
