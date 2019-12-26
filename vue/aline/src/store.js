import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fractions: [{}, {}],
    actions: ["substraction"],
    actionsMenuVisible: false,
    changingActionIndex: undefined
  },
  mutations: {
    toggleActionsMenu(state, payload) {
      state.changingActionIndex = payload.actionIndex;
      state.actionsMenuVisible = !state.actionsMenuVisible;
    },
    setAction(state, payload) {
      const activeIndex = state.changingActionIndex;
      state.actions[activeIndex] = payload.actionType;
      state.actionsMenuVisible = !state.actionsMenuVisible;
    },
    setNumerator(state, payload) {
      state.fractions[payload.fractionIndex]["numerator"] =
        payload.newNumerator;
    },
    setDenominator(state, payload) {
      state.fractions[payload.fractionIndex]["denominator"] =
        payload.newDenominator;
    }
  },
  actions: {
    toggleActionsMenu(context, payload) {
      context.commit("toggleActionsMenu", payload);
    },
    changeAction(context, payload) {
      context.commit("setAction", payload);
    },
    changeNumerator(context, payload) {
      context.commit("setNumerator", payload);
    },
    changeDenominator(context, payload) {
      context.commit("setDenominator", payload);
    }
  }
});
