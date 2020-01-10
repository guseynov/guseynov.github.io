<template>
  <blockquote class="quote">
    <button v-on:click="loadQuote" type="button" class="quote__refresh">
      <i class="fas fa-sync-alt"></i>
    </button>
    <p class="quote__text">
      {{ getQuote.content || "Fetching.." }}
    </p>
    <footer>
      <p class="quote__author">
        {{ getQuote.author || "Fetching.." }}
      </p>
    </footer>
  </blockquote>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Quote",
  methods: {
    ...mapActions(["loadQuote"])
  },
  computed: {
    ...mapGetters(["getQuote"])
  },
  mounted: function() {
    this.loadQuote();
  }
};
</script>

<style lang="stylus">
.quote
    margin 0px -30px 30px
    background #5886ff
    color #fff
    padding 30px
    position relative
    &__text
        font-style italic
        font-size 18px
        margin 0 0 10px
        padding-right 30px
    &__author
        font-weight bold
        text-align right
        margin 0
    &__refresh
        position absolute
        line-height 0
        top 30px
        right 30px
        transition transform .2s ease
        color #fff
        font-size 21px
        &:hover
            transform rotate(180deg)
</style>
