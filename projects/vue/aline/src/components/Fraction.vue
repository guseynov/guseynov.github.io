<template>
  <div
    class="fraction"
    data-type="regular"
  >
    <input
      class="fraction__numerator"
      type="text"
      :value="numerator"
    >
    <span class="fraction__separator" />
    <input
      class="fraction__denominator"
      type="text"
      :value="denominator"
    >
  </div>
</template>

<script>
export default {
  name: "Fraction",
  props: ["numerator", "denominator"]
};
</script>
