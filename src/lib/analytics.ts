import posthog from "posthog-js";

const seenSectionViews = new Set<string>();

function isAnalyticsEnabled() {
  return Boolean(import.meta.env.VITE_PUBLIC_POSTHOG_KEY);
}

export function trackEvent(eventName: string, properties?: Record<string, string | number>) {
  if (!isAnalyticsEnabled()) {
    return;
  }

  posthog.capture(eventName, properties);
}

interface TrackSectionViewOptions {
  sectionId: string;
  sectionLabel: string;
  sectionTitle: string;
  sectionIndex: number;
}

export function trackSectionView({
  sectionId,
  sectionLabel,
  sectionTitle,
  sectionIndex,
}: TrackSectionViewOptions) {
  if (seenSectionViews.has(sectionId)) {
    return;
  }

  seenSectionViews.add(sectionId);
  trackEvent("section_viewed", {
    section_id: sectionId,
    section_label: sectionLabel,
    section_title: sectionTitle,
    section_index: sectionIndex,
  });
}

interface TrackCtaClickOptions {
  label: string;
  href: string;
  placement: string;
}

export function trackCtaClick({ label, href, placement }: TrackCtaClickOptions) {
  trackEvent("cta_clicked", {
    label,
    href,
    placement,
  });
}
