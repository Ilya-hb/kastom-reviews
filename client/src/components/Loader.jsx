import React from "react";
import logo from "../assets/logo.png";

export default function Loader() {
  return (
    <div className="h-screen backdrop-blur flex flex-col items-center justify-center ">
      <img
        src={logo}
        className="max-w-[200px] md:max-w-[300px] animate-pulse"
        alt="Loading..."
      />
      {/* <p className="font-bold text-md md:text-xl">Завантаження</p> */}
    </div>
  );
}
