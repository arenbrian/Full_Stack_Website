import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./AuthContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";  // ← This line is critical!
import "./styles/global.css";

function AppWithOffset() {
  React.useEffect(() => {
    const setNavHeight = () => {
      const nav = document.querySelector(".navbar.fixed-top");
      const h = nav?.offsetHeight || 64;
      document.documentElement.style.setProperty("--nav-height", `${h}px`);
    };
    setNavHeight();
    window.addEventListener("resize", setNavHeight);
    return () => window.removeEventListener("resize", setNavHeight);
  }, []);
  return <App />;
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppWithOffset />
    </AuthProvider>
  </React.StrictMode>
);
