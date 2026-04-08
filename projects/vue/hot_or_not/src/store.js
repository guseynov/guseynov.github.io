import Vue from "vue";
import Vuex from "vuex";
import {
  DECK_REPLENISH_BUFFER,
  INITIAL_PRELOAD_COUNT,
  PHOTO_EXIT_MS
} from "./config";
import { fetchRemotePhoto, hasRemoteFaceApi } from "./api";
import { faceUrls } from "./faces";

Vue.use(Vuex);

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function buildDeck(cycle = 0) {
  return shuffle(faceUrls).map((url, index) => ({
    id: `${cycle}-${index}`,
    url
  }));
}

function preloadImages(urls) {
  return Promise.all(
    urls.map(
      url =>
        new Promise(resolve => {
          const image = new Image();
          image.src = url;
          image.onload = resolve;
          image.onerror = resolve;
        })
    )
  );
}

async function loadRemoteDeck(count) {
  const photos = [];

  while (photos.length < count) {
    const photo = await fetchRemotePhoto();

    if (!photo) {
      break;
    }

    photos.push({
      id: `${photo.id}-${photos.length}`,
      url: photo.url
    });
  }

  return photos;
}

export default new Vuex.Store({
  state: {
    infoScreenIsActive: false,
    hot: [],
    notHot: [],
    ready: false,
    lastVerdict: null,
    isTransitioning: false,
    deck: buildDeck(),
    currentIndex: 0,
    deckCycle: 1,
    remoteMode: hasRemoteFaceApi(),
    feedMode: hasRemoteFaceApi() ? "live" : "bundled"
  },
  getters: {
    currentPhoto: state => state.deck[state.currentIndex] || null,
    nextPhoto: state => state.deck[state.currentIndex + 1] || null,
    totalVotes: state => state.hot.length + state.notHot.length
  },
  mutations: {
    SET_READY(state, isReady) {
      state.ready = isReady;
    },
    TOGGLE_INFO_SCREEN(state) {
      state.infoScreenIsActive = !state.infoScreenIsActive;
    },
    START_TRANSITION(state, isHot) {
      state.lastVerdict = isHot;
      state.isTransitioning = true;
    },
    COMPLETE_TRANSITION(state) {
      const currentPhoto = state.deck[state.currentIndex];

      if (!currentPhoto) {
        state.lastVerdict = null;
        state.isTransitioning = false;
        return;
      }

      if (state.lastVerdict) {
        state.hot.push(currentPhoto.id);
      } else {
        state.notHot.push(currentPhoto.id);
      }

      state.currentIndex += 1;
      state.lastVerdict = null;
      state.isTransitioning = false;
    },
    APPEND_DECK(state) {
      state.deck.push(...buildDeck(state.deckCycle));
      state.deckCycle += 1;
    },
    APPEND_REMOTE_DECK(state, photos) {
      state.deck.push(...photos);
    },
    SET_INITIAL_DECK(state, photos) {
      state.deck = photos;
      state.currentIndex = 0;
      state.deckCycle = 1;
    },
    SET_FEED_MODE(state, mode) {
      state.feedMode = mode;
    }
  },
  actions: {
    async initialize({ commit, state }) {
      let initialPhotos = state.deck.slice(0, INITIAL_PRELOAD_COUNT);

      if (state.remoteMode) {
        try {
          const remotePhotos = await loadRemoteDeck(INITIAL_PRELOAD_COUNT);

          if (remotePhotos.length === INITIAL_PRELOAD_COUNT) {
            initialPhotos = remotePhotos;
            commit("SET_INITIAL_DECK", remotePhotos);
            commit("SET_FEED_MODE", "live");
          } else {
            commit("SET_FEED_MODE", "bundled");
          }
        } catch (error) {
          commit("SET_FEED_MODE", "bundled");
        }
      }

      await preloadImages(initialPhotos.map(photo => photo.url));
      commit("SET_READY", true);
    },
    async makeVerdict({ commit, getters, state }, isHot) {
      if (!state.ready || state.isTransitioning || !getters.currentPhoto) {
        return;
      }

      commit("START_TRANSITION", isHot);

      window.setTimeout(() => {
        commit("COMPLETE_TRANSITION");
      }, PHOTO_EXIT_MS);

      if (state.deck.length - state.currentIndex <= DECK_REPLENISH_BUFFER) {
        if (state.remoteMode && state.feedMode === "live") {
          try {
            const remotePhotos = await loadRemoteDeck(INITIAL_PRELOAD_COUNT);

            if (remotePhotos.length > 0) {
              commit("APPEND_REMOTE_DECK", remotePhotos);
              return;
            }
          } catch (error) {
            commit("SET_FEED_MODE", "bundled");
          }
        }

        commit("APPEND_DECK");
      }
    },
    toggleInfoScreen({ commit }) {
      commit("TOGGLE_INFO_SCREEN");
    }
  }
});
