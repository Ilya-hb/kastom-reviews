import axios from "axios";
import React, { act, useEffect, useState } from "react";
import { Link } from "react-router";
import avatar from "../assets/avatar.png";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import { MdLogout } from "react-icons/md";

export default function Admin() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeImage, setEmployeeImage] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employee")
      .then((res) => setEmployees(res.data.data));
  }, []);

  const handleDeleteEmployee = async (id) => {
    await axios.delete(`http://localhost:3000/api/employee/${id}`);
    setEmployees(employees.filter((el) => el._id !== id));
  };

  const handleCreate = async () => {
    await axios.post(`http://localhost:3000/api/employee`, { employeeName });
    const updatedList = await axios.get(`http://localhost:3000/api/employee`);
    setEmployees(updatedList.data);
    setEmployeeName("");
    setEmployeeImage(null);
  };

  return (
    <div className="flex justify-center items-center flex-col container py-10 mx-auto">
      <div className=" flex items-center gap-4">
        <h1 className="text-4xl">Admin Panel</h1>
        <Link
          to={"/login"}
          className="link"
        >
          <MdLogout />
        </Link>
      </div>
      <h2 className="text-3xl">Создать сотрудника</h2>
      <form
        className="my-5 gap-3 flex flex-col"
        onSubmit={handleCreate}
      >
        <input
          type="text"
          placeholder="Имя сотрудника"
          onChange={(e) => setEmployeeName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <p>Загрузите изображение</p>
        <input
          type="file"
          className="cursor-pointer"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150 cursor-pointer"
        >
          Создать
        </button>
      </form>
      <hr className="w-15 h-2 my-5" />
      <h2 className="text-xl">Список сотрудников:</h2>
      <div className="bg-neutral-900 rounded-xl p-5 w-full max-w-[500px] space-y-5 my-5">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div
              key={employee._id}
              className="flex items-center justify-around border-b-1 border-neutral-500 p-2"
            >
              <div className="flex w-1/2 flex-col items-center space-y-2 hover:scale-105 transition duration-200 cursor-pointer">
                <img
                  src={employee.employeeImage || avatar}
                  alt="employee"
                  className="w-20 h-20 rounded-full"
                />
                <h3 className="text-lg  font-bold">{employee.employeeName}</h3>
              </div>
              <div className="flex justify-between items-center space-x-3">
                <MdOutlineEditNote className="text-blue-400 icon" />
                <MdDeleteOutline
                  className=" text-red-500 icon"
                  onClick={() => handleDeleteEmployee(employee._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-white">Список сотрудников пуст</h4>
        )}
      </div>
    </div>
  );
}
