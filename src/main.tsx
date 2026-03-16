import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PostHogProvider } from "@posthog/react";
import App from "@/App";
import "./index.css";

const container = document.getElementById("root");
const posthogApiKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const posthogOptions = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2026-01-30",
} as const;

if (!container) {
  throw new Error("Root container not found");
}

createRoot(container).render(
  <StrictMode>
    {posthogApiKey ? (
      <PostHogProvider apiKey={posthogApiKey} options={posthogOptions}>
        <App />
      </PostHogProvider>
    ) : (
      <App />
    )}
  </StrictMode>,
);
