import posthog, { isPostHogEnabled } from "./posthog";

type AnalyticsProperty = boolean | number | string;
type AnalyticsProperties = Record<string, AnalyticsProperty>;

const seenSectionViews = new Set<string>();

export function trackEvent(
  eventName: string,
  properties?: AnalyticsProperties,
) {
  if (!isPostHogEnabled()) {
    return;
  }

  posthog.capture(eventName, properties);
}

type TrackSectionViewOptions = {
  sectionId: string;
  sectionIndex: number;
  sectionLabel: string;
  sectionTitle: string;
};

export function trackSectionView({
  sectionId,
  sectionIndex,
  sectionLabel,
  sectionTitle,
}: TrackSectionViewOptions) {
  if (seenSectionViews.has(sectionId)) {
    return;
  }

  seenSectionViews.add(sectionId);
  trackEvent("section_viewed", {
    section_id: sectionId,
    section_index: sectionIndex,
    section_label: sectionLabel,
    section_title: sectionTitle,
  });
}

type TrackCtaClickOptions = {
  href: string;
  label: string;
  placement: string;
  properties?: AnalyticsProperties;
};

export function trackCtaClick({
  href,
  label,
  placement,
  properties,
}: TrackCtaClickOptions) {
  trackEvent("cta_clicked", {
    href,
    label,
    placement,
    ...properties,
  });
}

type TrackNavigationClickOptions = {
  href: string;
  label: string;
  placement: string;
};

export function trackNavigationClick({
  href,
  label,
  placement,
}: TrackNavigationClickOptions) {
  trackEvent("navigation_clicked", {
    href,
    label,
    placement,
  });
}
