import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import avatar from "../assets/avatar.png";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Loader from "../components/Loader";

export default function Admin() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeImage, setEmployeeImage] = useState(null); //TODO
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    setIsLoading(true);
    axios.get("/api//employee").then((res) => setEmployees(res.data.data));
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleDeleteEmployee = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.delete(`/api//employee/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setEmployees(employees.filter((el) => el._id !== id));
    setIsLoading(false);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("employeeName", employeeName);
    if (employeeImage) formData.append("employeeImage", employeeImage);

    try {
      await axios.post("/api/employee", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedList = await axios.get(`/api//employee`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEmployees(updatedList.data.data);
      setEmployeeName("");
      setEmployeeImage(null);
      setIsLoading(false);
    } catch (error) {
      console.log(`Create employee failed: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col container py-10 mx-auto relative">
      {isLoading && (
        <div className="h-screen w-screen absolute top-0 backdrop-blur-md">
          <Loader />
        </div>
      )}
      <div className=" flex items-center gap-4">
        <h1 className="text-4xl">Admin Panel</h1>

        <MdLogout
          onClick={handleLogout}
          className="link cursor-pointer"
        />
      </div>
      <hr className="w-15 h-2 my-5" />
      <h2 className="text-3xl">Создать сотрудника</h2>
      <form
        className="my-5 gap-3 flex flex-col"
        onSubmit={handleCreate}
      >
        <input
          type="text"
          placeholder="Имя сотрудника"
          onChange={(e) => setEmployeeName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <p>Загрузите изображение</p>
        <input
          type="file"
          className="cursor-pointer hover:text-blue-500 transition"
          onChange={(e) => setEmployeeImage(e.target.files[0])}
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
            <Link
              to={`/admin/employee/${employee._id}`}
              key={employee._id}
              className="flex items-center justify-around border-b-1 border-neutral-500 p-2"
            >
              <div className="flex w-1/2 flex-col items-center space-y-2 hover:scale-105 transition duration-200 cursor-pointer">
                <img
                  src={employee.employeeImage || avatar}
                  alt="employee"
                  className="max-w-[100px] rounded-md"
                />
                <h3 className="text-lg  font-bold">{employee.employeeName}</h3>
              </div>
              <div className="flex justify-between items-center space-x-3">
                <MdOutlineEditNote className="text-blue-400 icon" />
                <MdDeleteOutline
                  className=" text-red-500 icon"
                  onClick={(e) => handleDeleteEmployee(e, employee._id)}
                />
              </div>
            </Link>
          ))
        ) : (
          <h4 className="text-white">Список сотрудников пуст</h4>
        )}
      </div>
    </div>
  );
}
