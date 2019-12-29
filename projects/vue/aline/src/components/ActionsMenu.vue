<script>
import Vue from 'vue'
import AdditionIcon from "../icons/Addition.vue";
import DivisionIcon from "../icons/Division.vue";
import MultiplicationIcon from "../icons/Multiplication.vue";
import SubstractionIcon from "../icons/Substraction.vue";

export default {
  components: {
    AdditionIcon,
    DivisionIcon,
    MultiplicationIcon,
    SubstractionIcon
  },
  methods: {
    changeAction(e) {
      this.$store.dispatch({
        type: "changeAction",
        actionType: e.target.attributes[0].value
      });
    }
  }
};
</script>
<template>
  <div class="actions">
    <button v-on:click="changeAction" class="action-btn" action-type="addition">
      <AdditionIcon />
    </button>
    <button
      v-on:click="changeAction"
      class="action-btn"
      action-type="substraction"
    >
      <SubstractionIcon />
    </button>
    <button
      v-on:click="changeAction"
      class="action-btn"
      action-type="multiplication"
    >
      <MultiplicationIcon />
    </button>
    <button v-on:click="changeAction" class="action-btn" action-type="division">
      <DivisionIcon />
    </button>
  </div>
</template>
