import React from "react";
import avatar from "../assets/avatar.png";

export default function Employee({ employeeName, averageRating, reviews }) {
  console.log(employeeName, averageRating, reviews);
  return (
    <div className="flex flex-col items-center space-y-5 hover:scale-105 transition duration-200 cursor-pointer">
      <img
        src={avatar}
        alt="Employee avatar"
        className="w-full max-w-[200px]"
      />
      <h4 className="text-2xl">{employeeName}</h4>
    </div>
  );
}
