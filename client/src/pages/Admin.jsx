import React from "react";
import { Link } from "react-router";

export default function Admin() {
  return (
    <>
      <div>Admin</div>
      <Link
        to={"/login"}
        className="link"
      >
        Разлогиниться
      </Link>
    </>
  );
}
