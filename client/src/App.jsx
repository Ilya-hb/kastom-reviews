import { useEffect, useState } from "react";
import axios from "axios";
import Employee from "./components/Employee";
import { Link } from "react-router";
import Loader from "./components/Loader";
import avatar from "./assets/avatar.png";
import { FaViber } from "react-icons/fa6";

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("/api/employee")
      .then((res) => {
        console.log(res.data.data);
        setEmployees(res.data.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  if (!employees) return <Loader />;

  return (
    <>
      <div className="flex flex-col pt-10 min-h-screen items-center space-y-5 container mx-auto">
        <h1 className="text-4xl text-center text-color-logo font-bold">
          Вітаємо, залиште відгук тут!
        </h1>
        <hr className="max-w-[300px] w-full text-logo border" />
        <div className="flex justify-center items-center">
          <h2 className="text-2xl text-neutral-300 text-center">
            Оберіть співробітника
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-15 justify-center items-center">
          {employees.map((el) => (
            <div
              className="flex justify-center items-center flex-col gap-3 mt-10"
              key={el._id}
            >
              <Link to={`/employee/${el._id}`}>
                <Employee
                  employeeName={el.employeeName}
                  clickable={true}
                  employeeImage={el.employeeImage || avatar}
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="flex-col gap-4 flex items-center my-auto">
          <hr className="max-w-[300px] w-full text-logo border" />
          <h2>Дізнавайтесь останні новини та акції!</h2>
          <a
            href="https://invite.viber.com/?g2=AQBuoGkeZkn5vlAdobnESOpSxJ1M3p6cs6SBVrmxBshlCo6FzicXCK%2BChyPUV6fW"
            className="link"
          >
            <FaViber className="" />
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
