import React from "react";
import avatar from "../assets/avatar.png";

export default function Employee({
  employeeName,
  averageRating,
  reviews,
  employeeImage,
  clickable = false,
}) {
  return (
    <div
      className={`flex flex-col items-center space-y-5 hover transition duration-200 ${
        clickable ? "cursor-pointer hover:scale-105" : ""
      } `}
    >
      <img
        src={employeeImage || avatar}
        alt="Employee avatar"
        className="w-full max-w-[200px] rounded-md"
      />
      <h4 className="text-2xl">{employeeName}</h4>
    </div>
  );
}
