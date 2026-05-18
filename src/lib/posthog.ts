import posthog from "posthog-js";

export const POSTHOG_DEFAULTS = "2026-01-30";

function shouldInitializePostHog() {
  if (typeof window === "undefined") {
    return false;
  }

  const { host } = window.location;
  const posthogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

  return (
    Boolean(posthogApiKey) &&
    Boolean(posthogHost) &&
    !host.includes("127.0.0.1") &&
    !host.includes("localhost")
  );
}

export function isPostHogEnabled() {
  return shouldInitializePostHog();
}

export default posthog;
