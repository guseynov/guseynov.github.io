import React from "react";
import { createRoot } from "react-dom/client";
import { Bubble } from "./components/bubble";
import "./main.scss";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <main className="main">
      <Bubble />
    </main>
  </React.StrictMode>
);
