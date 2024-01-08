import React from "react";
import ReactDOM from "react-dom";
import { Bubble } from "./components/bubble";
import "./main.scss";

ReactDOM.render(
  <React.StrictMode>
    <main className="main">
      <Bubble />
    </main>
  </React.StrictMode>,
  document.getElementById("root")
);
