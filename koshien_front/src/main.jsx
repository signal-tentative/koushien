import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router";
import { Roots } from "./Roots.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Roots />
    </Router>
  </StrictMode>,
);
