import React from "react";
import avatar from "../assets/avatar.png";

export default function Employee({ employeeName }) {
  console.log(employeeName);
  return (
    <div className="flex flex-col items-center space-y-5 hover:scale-105 transition duration-200 cursor-pointer">
      <img
        src={avatar}
        alt="Employee avatar"
        className="w-full max-w-[200px]"
      />
      <h4 className="text-xl">{employeeName}</h4>
    </div>
  );
}
