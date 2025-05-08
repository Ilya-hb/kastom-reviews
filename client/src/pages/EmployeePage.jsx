import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Employee from "../components/Employee";

export default function EmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/employee/${id}`)
      .then((res) => {
        console.log(res.data.data);
        setEmployee(res.data.data);
      })
      .catch((error) => console.log(`Error: ${error.message}`));
  }, [id]);

  if (!employee) {
    return <div className="text-white">Завантаження...</div>;
  }
  return (
    <div className="container flex flex-col mx-auto pt-10">
      <Employee employeeName={employee.employeeName} />
    </div>
  );
}
