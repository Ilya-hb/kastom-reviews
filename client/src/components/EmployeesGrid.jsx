import React from "react";
import Employee from "./Employee";

export default function EmployeesGrid({ employeeName }, { image }) {
  return (
    <div className="grid grid-cols-2 gap-4 justify-center items-center space-x-10">
      <div className="flex flex-col items-center space-y-5 hover:scale-105 transition duration-200 cursor-pointer">
        <Employee
          employeeName={employeeName}
          image={image}
        />
      </div>
    </div>
  );
}
