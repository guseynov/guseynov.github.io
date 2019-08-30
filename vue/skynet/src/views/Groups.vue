<script>
import { mapState } from "vuex";
export default {
  name: "Groups",
  computed: {
    ...mapState(["groups"]),
    minMaxPrices: function() {
      if (this.groups.length === 0) {
        return false;
      } else {
        let minMaxPricesArr = [];
        this.groups.map(group => {
          let prices = [];
          group.tarifs.map(tariff => {
            prices.push(tariff.price);
          });
          minMaxPricesArr.push([Math.min(...prices), Math.max(...prices)]);
        });
        return minMaxPricesArr;
      }
    }
  },
  mounted: function() {
    this.$parent.fetchData();
  }
};
</script>

<template>
  <div class="container">
    <vue-headful title="Группы тарифов SkyNet" />
    <div v-if="minMaxPrices.length" class="groups-container">
      <div v-for="(group, index) in groups" v-bind:key="index" class="group">
        <h2 class="group__title">Тариф {{ group.title }}</h2>
        <router-link :to="{path: '/group/' + index}" tag="div" class="group__main-block">
          <div
            :class="[group.speed === 50 ? 'group__speed--slow' : group.speed === 100 ? 'group__speed--medium' : group.speed === 200 ? 'group__speed--fast' : '']"
            class="group__speed"
          >{{ group.speed }} Мбит/с</div>
          <div
            class="group__price"
          >{{ minMaxPrices[index][0] }} — {{ minMaxPrices[index][1] }} ₽/мес</div>
          <p v-if="group.free_options" class="group__description">
            <span v-for="(option, index) in group.free_options" v-bind:key="index">
              {{ option }}
              <br />
            </span>
          </p>
        </router-link>
        <a
          target="_blank"
          :href="group.link"
          class="group__link"
        >узнать подробнее на сайте www.sknt.ru</a>
      </div>
    </div>
    <div v-if="groups.length === 0" class="loading-screen">Загрузка данных...</div>
  </div>
</template>