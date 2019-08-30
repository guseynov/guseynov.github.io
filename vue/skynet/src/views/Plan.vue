<script>
import { mapState } from "vuex";
import * as moment from "moment";
export default {
  name: "Group",
  computed: {
    ...mapState(["groups"]),
    planIndex: function() {
      return this.$route.params.planIndex;
    },
    groupIndex: function() {
      return this.$route.params.groupIndex;
    },
    title: function() {
      if (this.groups.length === 0) {
        return;
      }
      return 'Тариф "' + this.groups[this.groupIndex].title + '"';
    },
    plan: function() {
      return this.groups[this.groupIndex].tarifs[this.planIndex];
    },
    validUntilDate: function() {
      let input = this.plan.new_payday;
      let timestamp = input.substring(0, input.indexOf("+"));
      let UTC = input.substring(input.indexOf("+"));
      return moment
        .unix(timestamp)
        .utcOffset(UTC)
        .format("DD.MM.YYYY");
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
    <div v-if="groups.length > 0" class="plan-container">
      <router-link :to="{path: '/group/' + groupIndex}" tag="header" class="plan-header">
        <h1 class="plan-header__title">Выбор тарифа</h1>
      </router-link>
      <div class="plan">
        <h2 class="plan__title">{{ title }}</h2>
        <div class="plan__main-info">
          Период оплаты — {{ plan.pay_period == 1 ? '1 месяц' : plan.pay_period == 3 ? '3 месяца' : plan.pay_period == 6 ? '6 месяцев' : plan.pay_period == 12 ? '12 месяцев' : ''}}
          <br />
          {{ plan.price / plan.pay_period }} ₽/мес
        </div>
        <div class="plan__price-details">
          разовый платёж — {{ plan.price }} ₽
          <br />
          со счета спишется — {{ plan.price }} ₽
        </div>
        <div class="plan__dates">
          вступит в силу — сегодня
          <br />
          активно до — {{ validUntilDate }}
        </div>
        <div class="plan__btn-container">
          <button class="btn">Выбрать</button>
        </div>
      </div>
    </div>
    <div v-if="groups.length === 0" class="loading-screen">Загрузка данных...</div>
  </div>
</template>