import { PostHogProvider } from "@posthog/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { POSTHOG_DEFAULTS, isPostHogEnabled } from "./lib/posthog";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container not found");
}

const posthogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;
const posthogConfig =
  isPostHogEnabled() && posthogApiKey && posthogHost
    ? {
        apiKey: posthogApiKey,
        options: {
          api_host: posthogHost,
          defaults: POSTHOG_DEFAULTS,
        } as const,
      }
    : null;

createRoot(container).render(
  <StrictMode>
    {posthogConfig ? (
      <PostHogProvider apiKey={posthogConfig.apiKey} options={posthogConfig.options}>
        <App />
      </PostHogProvider>
    ) : (
      <App />
    )}
  </StrictMode>,
);
