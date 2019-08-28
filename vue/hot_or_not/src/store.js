import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    infoScreenIsActive: false,
    photos: [],
    hot: [],
    not_hot: [],
    ready: false,
    lastVerdict: undefined,
    currentlyVisible: "first"
  },
  mutations: {
    ADD_PHOTO(state, payload) {
      state.photos.unshift(payload);
    },
    UPDATE_STATUS(state, isReady) {
      state.ready = isReady;
    },
    PROCESS_CURRENT_PHOTO(state, isHot) {
      state.lastVerdict = isHot;
      const currentPhoto = state.photos[state.photos.length - 1];
      if (isHot) {
        state.hot.push(currentPhoto.id);
      } else {
        state.not_hot.push(currentPhoto.id);
      }
      setTimeout(() => {
        state.currentlyVisible =
          state.currentlyVisible === "first" ? "second" : "first";
        state.photos.pop();
        URL.revokeObjectURL(currentPhoto.url);
        state.lastVerdict = undefined;
      }, 500);
    },
    TOGGLE_INFO_SCREEN(state) {
      state.infoScreenIsActive = !state.infoScreenIsActive;
    }
  },
  actions: {
    addPhoto(context, photoObj) {
      context.commit("ADD_PHOTO", photoObj);
      if (context.state.photos.length >= 5) {
        context.commit("UPDATE_STATUS", true);
      } else {
        context.commit("UPDATE_STATUS", false);
      }
    },
    makeVerdict(context, isHot) {
      context.commit("PROCESS_CURRENT_PHOTO", isHot);
    },
    toggleInfoScreen(context) {
      context.commit("TOGGLE_INFO_SCREEN");
    }
  }
});
