import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route
          index
          element={<App />}
        />
        <Route
          path="/login"
          element={<Login />}
        >
          <Route
            path="/login/admin"
            element={<Admin />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
