<script>
import { mapGetters, mapState } from "vuex";
import Photos from "./components/Photos.vue";
import Controls from "./components/Controls.vue";
import Info from "./components/Info.vue";
import "./main.css";
import { PHOTO_EXIT_MS } from "./config";
import infoIcon from "./icons/info.svg";

export default {
  name: "hot_or_not",
  components: {
    Photos,
    Controls,
    Info
  },
  async created() {
    document.title = "Hot or Not?";
    await this.$store.dispatch("initialize");
    window.addEventListener("keydown", this.handleKeydown);
  },
  computed: {
    ...mapState([
      "hot",
      "notHot",
      "infoScreenIsActive",
      "isTransitioning",
      "feedMode"
    ]),
    ...mapGetters(["totalVotes", "currentPhoto"]),
    animationStyle() {
      return {
        "--photo-exit-duration": `${PHOTO_EXIT_MS}ms`
      };
    },
    infoIcon() {
      return infoIcon;
    },
    feedStatusLabel() {
      return this.feedMode === "live" ? "Live AI feed" : "Bundled AI deck";
    },
    feedStatusClass() {
      return this.feedMode === "live" ? "feed-badge--live" : "feed-badge--fallback";
    }
  },
  methods: {
    toggleInfoScreen() {
      this.$store.dispatch("toggleInfoScreen");
    },
    handleKeydown(event) {
      if (this.infoScreenIsActive && event.key === "Escape") {
        this.toggleInfoScreen();
        return;
      }

      if (this.infoScreenIsActive || this.isTransitioning || !this.currentPhoto) {
        return;
      }

      if (event.key === "ArrowLeft") {
        this.$store.dispatch("makeVerdict", false);
      }

      if (event.key === "ArrowRight") {
        this.$store.dispatch("makeVerdict", true);
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeydown);
  }
};
</script>

<template>
  <div id="app" :style="animationStyle">
    <header class="header shell-card">
      <div class="header__copy">
        <p class="eyebrow">AI portrait game</p>
        <h1 class="title"><b>Hot</b> or not?</h1>
        <p class="subtitle">
          Swipe or use the arrow keys to judge a stream of AI-generated
          portraits. Live fetching is supported through a same-origin proxy, with
          a bundled fallback so the app stays deploy-safe.
        </p>
      </div>
      <div class="header__meta">
        <div class="feed-status" aria-live="polite">
          <span class="feed-badge" :class="feedStatusClass">
            {{ feedStatusLabel }}
          </span>
          <p v-if="feedMode !== 'live'" class="feed-status__hint">
            The worker is unavailable right now, so the app switched to the
            local backup deck.
          </p>
        </div>
        <dl class="stats" aria-label="Session stats">
          <div class="stats__item">
            <dt>Hot</dt>
            <dd>{{ hot.length }}</dd>
          </div>
          <div class="stats__item">
            <dt>Not</dt>
            <dd>{{ notHot.length }}</dd>
          </div>
          <div class="stats__item">
            <dt>Total</dt>
            <dd>{{ totalVotes }}</dd>
          </div>
        </dl>
        <button type="button" @click="toggleInfoScreen()" class="show-info">
          <img :src="infoIcon" alt="" aria-hidden="true" />
          <span>About</span>
        </button>
      </div>
    </header>
    <main class="main shell-card">
      <Photos />
      <Controls />
    </main>
    <Info v-if="infoScreenIsActive" />
  </div>
</template>
