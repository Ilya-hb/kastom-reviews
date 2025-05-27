import axios from "../../utils/axiosInstance.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import avatar from "../assets/avatar.png";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import Loader from "../components/Loader";

export default function Admin() {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeImage, setEmployeeImage] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editState, setEditState] = useState({
    isModalOpen: false,
    selectedEmployee: null,
    updatedName: "",
    updatedImage: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setIsLoading(true);
    axios.get("/api/employee").then((res) => setEmployees(res.data.data));
    setIsLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleDeleteEmployee = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    await axios.delete(`/api/employee/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setEmployees(employees.filter((el) => el._id !== id));
    setIsLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("employeeName", editState.updatedName);
    if (editState.updatedImage)
      formData.append("employeeImage", editState.updatedImage);
    try {
      await axios.put(
        `/api/employee/${editState.selectedEmployee._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchEmployees();
      setEditState({
        isModalOpen: false,
        selectedEmployee: null,
        updatedName: "",
        updatedImage: null,
      });
    } catch (error) {
      console.log("Employee update failed: ", error.message);
    }
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
      const updatedList = await axios.get(`/api/employee`, {
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
      <hr className="w-15 h-2 my-5 text-logo" />
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
          className="cursor-pointer transition file:transition file:mr-4 file:rounded-md file:border-0 file:bg-logo file:px-4 file:py-2 file:text-sm file:font-semibold file:cursor-pointer hover:file:bg-darker-logo"
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
      <div className="bg-neutral-900 rounded-xl p-5 w-full md:max-w-[500px] space-y-4 my-5">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div
              key={employee._id}
              className="flex items-center justify-around border-b-1 border-neutral-500 p-2"
            >
              {editState.isModalOpen &&
              editState.selectedEmployee?._id === employee._id ? (
                <form
                  onSubmit={handleUpdate}
                  className="w-2/3 flex flex-col gap-4"
                >
                  <h2 className="text-md font-bold">Редактировать</h2>
                  <input
                    type="text"
                    value={editState.updatedName}
                    onChange={(e) =>
                      setEditState((prev) => ({
                        ...prev,
                        updatedName: e.target.value,
                      }))
                    }
                    className="border px-2 py-1 max-w-[150px] rounded-md"
                    placeholder="Новое имя"
                  />

                  <input
                    type="file"
                    className="cursor-pointer transition file:transition file:mr-4 file:rounded-md file:border-0 file:bg-logo file:px-4 file:py-2 file:text-sm file:font-semibold file:cursor-pointer hover:file:bg-darker-logo"
                    onChange={(e) =>
                      setEditState((prev) => ({
                        ...prev,
                        updatedImage: e.target.files[0],
                      }))
                    }
                  />
                  <button
                    type="submit"
                    className="bg-green-600 transition cursor-pointer text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Сохранить
                  </button>
                </form>
              ) : (
                <Link
                  to={`/admin/employee/${employee._id}`}
                  className="flex w-1/2 flex-col items-center space-y-2 hover:scale-105 transition duration-200 cursor-pointer"
                >
                  <img
                    src={employee.employeeImage || avatar}
                    alt="employee"
                    className="max-w-[100px] rounded-md "
                  />
                  <h3 className="text-lg  font-bold">
                    {employee.employeeName}
                  </h3>
                </Link>
              )}

              <div className="flex justify-between items-center space-x-3">
                <MdOutlineEditNote
                  className="text-blue-400 icon text-2xl cursor-pointer"
                  onClick={() => {
                    setEditState({
                      isModalOpen: !editState.isModalOpen,
                      selectedEmployee: employee,
                      updatedName: employee.employeeName,
                      updatedImage: null,
                    });
                  }}
                />
                <MdDeleteOutline
                  className=" text-red-500 icon"
                  onClick={(e) => handleDeleteEmployee(e, employee._id)}
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
