<script>
import { mapState } from "vuex";

export default {
  name: "Group",
  computed: {
    ...mapState(["groups"]),
    index: function() {
      return this.$route.params.index;
    },
    title: function() {
      if (this.groups.length === 0) {
        return;
      }
      return 'Тариф "' + this.groups[this.index].title + '"';
    }
  },
  mounted: function() {
    if (this.groups.length === 0) {
      this.$parent.fetchData();
    }
  }
};
</script>

<template>
  <div class="container">
    <vue-headful :title="title" />
    <div v-if="groups.length > 0" class="plans-container">
      <router-link :to="{path: '/'}" tag="header" class="group-header">
        <h1 class="group-header__title">{{ title }}</h1>
      </router-link>
      <div v-for="(plan, planIndex) in groups[index].tarifs" :key="planIndex" class="plan">
        <h2
          class="plan__title"
        >{{ plan.pay_period == 1 ? '1 месяц' : plan.pay_period == 3 ? '3 месяца' : plan.pay_period == 6 ? '6 месяцев' : plan.pay_period == 12 ? '12 месяцев' : ''}}</h2>
        <router-link
          :to="{path: '/group/' + index + '/plan/' + planIndex}"
          tag="div"
          class="plan__prices"
        >
          <div class="plan__price">{{ plan.price / plan.pay_period }} ₽/мес</div>
          <div class="plan__fullprice">разовый платеж — {{ plan.price }} ₽</div>
        </router-link>
      </div>
    </div>
    <div v-if="groups.length === 0" class="loading-screen">Загрузка данных...</div>
  </div>
</template>