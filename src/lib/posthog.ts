import posthog from "posthog-js";

export const POSTHOG_DEFAULTS = "2026-01-30";

export function isPostHogEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  const { hostname } = window.location;
  const posthogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

  return (
    Boolean(posthogApiKey) &&
    Boolean(posthogHost) &&
    hostname !== "127.0.0.1" &&
    hostname !== "localhost"
  );
}

export default posthog;
