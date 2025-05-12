import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Routes, Route } from "react-router";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./index.css";
import App from "./App.jsx";
import EmployeePage from "./pages/EmployeePage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<App />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={<Admin />}
          />
        </Route>
        <Route
          path="/employee/:id"
          element={<EmployeePage />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
