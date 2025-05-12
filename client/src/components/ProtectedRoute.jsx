import React from "react";
import { Outlet, Navigate } from "react-router";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" />;
}
