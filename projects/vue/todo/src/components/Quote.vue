<template>
  <blockquote class="quote">
    <div>
      <p class="quote__eyebrow">Daily note</p>
      <p class="quote__text">
        {{ quoteText }}
      </p>
      <footer class="quote__author">{{ quoteAuthor }}</footer>
    </div>
    <button
      @click="loadQuote"
      type="button"
      class="quote__refresh"
      :aria-busy="getQuoteLoading ? 'true' : 'false'"
      aria-label="Load a new quote"
    >
      <font-awesome-icon icon="sync-alt" />
      <span>{{ getQuoteLoading ? "Loading" : "Refresh" }}</span>
    </button>
  </blockquote>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Quote",
  computed: {
    ...mapGetters(["getQuote", "getQuoteLoading"]),
    quoteText() {
      return this.getQuote.content || "Loading a short note...";
    },
    quoteAuthor() {
      return this.getQuote.author || "Todo";
    }
  },
  methods: {
    ...mapActions(["loadQuote"])
  },
  mounted() {
    this.loadQuote();
  }
};
</script>

<style lang="stylus">
.quote
  margin 0 0 20px
  padding 18px 20px
  border-radius 20px
  background linear-gradient(135deg, rgba(0, 153, 255, 0.16), rgba(255, 255, 255, 0.04))
  color #fff
  display flex
  justify-content space-between
  align-items flex-start
  gap 16px
  box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px
  &__eyebrow
    margin 0 0 6px
    color rgba(255, 255, 255, 0.6)
    font-size 11px
    font-weight 600
    letter-spacing 0.18em
    text-transform uppercase
  &__text
    margin 0
    font-size clamp(0.98rem, 2vw, 1.08rem)
    line-height 1.55
  &__author
    margin-top 10px
    color rgba(255, 255, 255, 0.72)
  &__refresh
    flex 0 0 auto
    display inline-flex
    align-items center
    gap 10px
    min-height 40px
    padding 0 14px
    border-radius 999px
    background rgba(255, 255, 255, 0.08)
    color #fff
    box-shadow rgba(0, 153, 255, 0.15) 0 0 0 1px

@media (max-width: 809px)
  .quote
    flex-direction column
    align-items stretch
    padding 16px

  .quote__refresh
    justify-content center
</style>
