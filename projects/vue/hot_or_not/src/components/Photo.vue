<script>
import { mapGetters, mapState } from "vuex";
import {
  PHOTO_MAX_TILT_DEG,
  PHOTO_MAX_VERTICAL_DRAG,
  PHOTO_SWIPE_THRESHOLD_RATIO
} from "../config";

export default {
  name: "Photo",
  data() {
    return {
      dragX: 0,
      dragY: 0,
      isDragging: false,
      pointerStartX: 0,
      pointerStartY: 0,
      cardWidth: 0
    };
  },
  watch: {
    currentPhoto() {
      this.resetDrag();
    }
  },
  methods: {
    getSwipeThreshold() {
      return Math.max(88, this.cardWidth * PHOTO_SWIPE_THRESHOLD_RATIO);
    },
    resetDrag() {
      this.dragX = 0;
      this.dragY = 0;
      this.isDragging = false;
    },
    updateCardMetrics() {
      if (this.$refs.activeCard) {
        this.cardWidth = this.$refs.activeCard.clientWidth;
      }
    },
    handlePointerDown(event) {
      if (this.isTransitioning || event.button > 0) {
        return;
      }

      this.updateCardMetrics();
      this.pointerStartX = event.clientX;
      this.pointerStartY = event.clientY;
      this.isDragging = true;

      window.addEventListener("pointermove", this.handlePointerMove);
      window.addEventListener("pointerup", this.handlePointerUp);
      window.addEventListener("pointercancel", this.handlePointerCancel);
    },
    handlePointerMove(event) {
      if (!this.isDragging) {
        return;
      }

      const deltaX = event.clientX - this.pointerStartX;
      const deltaY = event.clientY - this.pointerStartY;

      this.dragX = deltaX;
      this.dragY = Math.max(
        -PHOTO_MAX_VERTICAL_DRAG,
        Math.min(PHOTO_MAX_VERTICAL_DRAG, deltaY * 0.35)
      );
    },
    handlePointerUp() {
      if (!this.isDragging) {
        return;
      }

      const shouldDismiss = Math.abs(this.dragX) >= this.getSwipeThreshold();
      const isHot = this.dragX > 0;

      this.detachPointerEvents();
      this.isDragging = false;

      if (shouldDismiss) {
        this.$store.dispatch("makeVerdict", isHot);
        return;
      }

      this.resetDrag();
    },
    handlePointerCancel() {
      this.detachPointerEvents();
      this.resetDrag();
    },
    detachPointerEvents() {
      window.removeEventListener("pointermove", this.handlePointerMove);
      window.removeEventListener("pointerup", this.handlePointerUp);
      window.removeEventListener("pointercancel", this.handlePointerCancel);
    }
  },
  computed: {
    ...mapState(["isTransitioning", "lastVerdict", "ready"]),
    ...mapGetters(["currentPhoto", "nextPhoto"]),
    swipeProgress() {
      return Math.min(1, Math.abs(this.dragX) / this.getSwipeThreshold());
    },
    activePhotoClass() {
      return {
        "photo-card--hot": this.lastVerdict === true,
        "photo-card--not": this.lastVerdict === false,
        "photo-card--dragging": this.isDragging
      };
    },
    activePhotoStyle() {
      const baseWidth = Math.max(this.cardWidth || 1, 1);
      const baseRotate = (this.dragX / baseWidth) * PHOTO_MAX_TILT_DEG;

      if (this.lastVerdict === true) {
        return {
          transform: `translate3d(${this.dragX + baseWidth * 1.35}px, ${this.dragY - 18}px, 0) rotate(${Math.max(baseRotate, 12)}deg)`
        };
      }

      if (this.lastVerdict === false) {
        return {
          transform: `translate3d(${this.dragX - baseWidth * 1.35}px, ${this.dragY - 18}px, 0) rotate(${Math.min(baseRotate, -12)}deg)`
        };
      }

      if (this.lastVerdict !== null) {
        return {};
      }

      const rotate = `${baseRotate}deg`;

      return {
        transform: `translate3d(${this.dragX}px, ${this.dragY}px, 0) rotate(${rotate})`
      };
    },
    nextPhotoStyle() {
      const isExiting = this.lastVerdict !== null;
      const progress = isExiting ? 1 : this.swipeProgress;
      const scale = 0.955 + progress * 0.06;
      const translateY = 16 - progress * 16;

      return {
        transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
        opacity: 0.5 + progress * 0.28
      };
    },
    hotPillStyle() {
      return {
        opacity: this.dragX > 0 ? 0.45 + this.swipeProgress * 0.55 : 0.28,
        transform: `scale(${0.92 + this.swipeProgress * 0.08})`
      };
    },
    notPillStyle() {
      return {
        opacity: this.dragX < 0 ? 0.45 + this.swipeProgress * 0.55 : 0.28,
        transform: `scale(${0.92 + this.swipeProgress * 0.08})`
      };
    }
  },
  mounted() {
    this.updateCardMetrics();
    window.addEventListener("resize", this.updateCardMetrics);
  },
  beforeDestroy() {
    this.detachPointerEvents();
    window.removeEventListener("resize", this.updateCardMetrics);
  }
};
</script>

<template>
  <div v-if="ready && currentPhoto" class="photos-inner-container">
    <div
      v-if="nextPhoto"
      :key="`next-${nextPhoto.id}`"
      class="photo-card photo-card--next"
      :style="nextPhotoStyle"
      aria-hidden="true"
    >
      <img :src="nextPhoto.url" alt="" class="photo-card__image" />
    </div>
    <div
      ref="activeCard"
      :key="`active-${currentPhoto.id}`"
      class="photo-card photo-card--active"
      :class="activePhotoClass"
      :style="activePhotoStyle"
      tabindex="0"
      role="group"
      aria-label="Current portrait. Swipe right for hot or left for not."
      @pointerdown="handlePointerDown"
    >
      <img
        :src="currentPhoto.url"
        alt="AI-generated portrait awaiting your verdict"
        class="photo-card__image"
      />
      <div class="photo-card__overlay">
        <span class="photo-card__pill" :style="hotPillStyle">
          Swipe right for hot
        </span>
        <span
          class="photo-card__pill photo-card__pill--muted"
          :style="notPillStyle"
        >
          Swipe left for not
        </span>
      </div>
    </div>
  </div>
</template>
