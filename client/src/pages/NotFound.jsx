import React from "react";
import { Link } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";

export default function NotFound() {
  return (
    <div className="flex relative flex-col px-4 py-6 h-screen">
      <div className="">
        <Link
          to="/"
          className="flex gap-2 items-center hover:text-logo transition duration-200 self-start cursor-pointer"
        >
          <HiArrowLongLeft className="text-4xl" />
          <span className="text-md">Повернутись</span>
        </Link>
      </div>
      <div className="self-center my-30 justify-center items-center">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-center">Здається, ви заблукали!</p>
      </div>
    </div>
  );
}
