<script>
import Vue from "vue";
import { mapState } from "vuex";
import Navbar from "../components/Navbar.vue";
import ActionsMenu from "../components/ActionsMenu.vue";
var Fraction = require("fraction.js");
// Icons
import AdditionIcon from "../icons/Addition.vue";
import DivisionIcon from "../icons/Division.vue";
import MultiplicationIcon from "../icons/Multiplication.vue";
import SubstractionIcon from "../icons/Substraction.vue";
import EqualIcon from "../icons/Equal.vue";
export default {
  components: {
    Navbar,
    ActionsMenu,
    AdditionIcon,
    DivisionIcon,
    MultiplicationIcon,
    SubstractionIcon,
    EqualIcon
  },
  computed: {
    ...mapState(["fractions", "actions", "actionsMenuVisible"])
  },
  methods: {
   
     changeNumeratorOuter(e) {
      this.$store.dispatch({
        type: "changeNumerator",
        fractionIndex: e.target.dataset.fractionIndex,
        newNumerator: e.target.value
      });
    },
    changeDenominatorOuter(e) {
      this.$store.dispatch({
        type: "changeDenominator",
        fractionIndex: e.target.dataset.fractionIndex,
        newDenominator: e.target.value
      });
    },
    toggleActionsMenu(e) {
      this.$store.dispatch({
        type: "toggleActionsMenu",
        actionIndex: e.target.dataset.index
      });
    },
  }
};
</script>
<template>
  <div class="container">
    <Navbar />
    <main class="calculator">
      <ActionsMenu v-show="actionsMenuVisible" />
      <div class="fractions-container">
        <div
          v-for="(fraction, index) in fractions"
          :key="index"
          class="fraction"
          data-type="regular"
        >
          <div class="fraction__inner">
            <input
              class="fraction__numerator"
              type="text"
              @input="changeNumeratorOuter"
              :data-fraction-index="index"
            />
            <span class="fraction__separator" />
            <input
              class="fraction__denominator"
              type="text"
              @input="changeDenominatorOuter"
              :data-fraction-index="index"
            />
          </div>
          <!-- If it's the last fraction, omit the action button -->
          <button
            v-if="fractions.length - 1 !== index"
            class="action-btn"
            v-on:click="toggleActionsMenu"
            :data-action="actions[index]"
            :data-index="index"
          >
            <span v-if="actions[index] == 'addition'" class="action-btn__inner">
              <AdditionIcon />
            </span>
            <span v-if="actions[index] == 'division'" class="action-btn__inner">
              <DivisionIcon />
            </span>
            <span
              v-if="actions[index] == 'multiplication'"
              class="action-btn__inner"
            >
              <MultiplicationIcon />
            </span>
            <span
              v-if="actions[index] == 'substraction'"
              class="action-btn__inner"
            >
              <SubstractionIcon />
            </span>
          </button>
        </div>

        <div class="equal">
          <EqualIcon />
          <div class="fraction fraction--equal">
            <div class="fraction__inner">
              <span class="fraction__numerator"></span>
              <span class="fraction__separator" />
              <span class="fraction__denominator"></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="stylus">
.calculator
  display flex
  align-items center
  justify-content center
  flex-direction column
.fraction
  display flex
  align-items center
  &--equal
    margin-left 25px
  &__inner
    display flex
    flex-direction column
  &__separator
    margin 10px 0
    height 2px
    background #758184
  &__numerator
  &__denominator
    background #758184
    display inline-block
    border none
    border-radius 3px
    height 100px
    width 100px
    text-align center
    color #fff
    font-weight 300
    padding 10px
    overflow hidden
    font-size 32px
    box-shadow inset 0 0 5px 0 rgba(0, 0,0,.5)
    &:focus
    &:active
      outline none
.current-action
  margin 0 30px
  img
    width 50px
.actions
  display flex
  justify-content center
  align-items center
  margin-bottom 20px
.action-btn
.current-action
  background #758184
  border none
  line-height 0
  box-shadow: 0 0 20px 5px rgba(0,0,0,0.2);
  border-radius: 7px;
  margin: 0 25px;
  width 80px
  height 80px
  padding 20px
  &__inner
  svg
    pointer-events none
  img
    width 100%
  &--active
  &:hover
    box-shadow none
.fractions-container
  display flex
.equal
  display flex
  align-items center
  margin-left 25px
</style>
