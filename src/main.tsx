import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";  // ← Changed from "./index"
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />  {/* ← Changed from <Index /> */}
    </HashRouter>
  </React.StrictMode>
);
