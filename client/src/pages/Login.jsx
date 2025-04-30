import React from "react";
import { Link, Outlet } from "react-router";

export default function Login() {
  return (
    <div>
      <h1>Login page</h1>
      <Link
        to={"/"}
        className="link"
      >
        Назад
      </Link>
      <Link
        to={"/admin"}
        className="link"
      >
        В админку
      </Link>
    </div>
  );
}
