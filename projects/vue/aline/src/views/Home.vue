<template>
  <div class="container">
    <main class="home">
      <h1 class="home__title">
        This is a project made for the Aline digital agency by Ahmed Guseynov
        using Vue.js <i class="fas fa-rocket" />
      </h1>

      <div class="home__projects">
        <button class="home__project">
          <router-link to="/calculator">
            Calculator
          </router-link>
        </button>
        <button class="home__project">
          <router-link to="/websocket">
            Websocket
          </router-link>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
.home
  display flex
  flex-direction column
  &__title
    font-size 22px
    font-weight 300
    text-align center
    color #fff
    padding 20px
    background-color #758184
    border-radius 7px
    box-shadow 0 0 20px 5px rgba(0, 0, 0, 0.2)
    margin-bottom 50px
  &__projects
    display flex
    justify-content center
  &__project
    padding 25px
    background #758184
    box-shadow 0 0 20px 5px rgba(0, 0, 0, 0.2)
    border none
    border-radius 7px
    width 200px
    margin 0 25px
    a
      text-transform uppercase
      font-size 21px
      font-weight 300
      color #fff
</style>
