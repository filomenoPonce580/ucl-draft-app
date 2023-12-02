import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// Create preconnect links
const preconnectFonts = document.createElement("link");
preconnectFonts.rel = "preconnect";
preconnectFonts.href = "https://fonts.googleapis.com";
document.head.appendChild(preconnectFonts);

const preconnectFontsGStatic = document.createElement("link");
preconnectFontsGStatic.rel = "preconnect";
preconnectFontsGStatic.href = "https://fonts.gstatic.com";
preconnectFontsGStatic.setAttribute("crossorigin", "");
document.head.appendChild(preconnectFontsGStatic);

// Create link to import Google Fonts CSS
const linkGoogleFonts = document.createElement("link");
linkGoogleFonts.href =
  "https://fonts.googleapis.com/css2?family=Heebo:wght@100;400;700&family=Lora:wght@400;700&display=swap";
linkGoogleFonts.rel = "stylesheet";
document.head.appendChild(linkGoogleFonts);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
