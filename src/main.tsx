import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // use HashRouter for GH Pages
import Index from "./index";
import "./index.css"; // Tailwind/global styles

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Index />
    </HashRouter>
  </React.StrictMode>
);
