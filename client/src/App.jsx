import { useEffect, useState } from "react";
import avatar from "./assets/avatar.png";
import avatar2 from "./assets/avatar2.png";
import axios from "axios";

function App() {
  const [employee, setEmployee] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employee")
      .then((res) => {
        console.log(res.data.data);
        setEmployee(res.data.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <>
      <div className="flex flex-col pt-10 items-center h-screen space-y-5 container mx-auto">
        {/* <h1 className="text-4xl text-white text-center">
          Братан, давай сделаем сайт с системой отзывов про кассиров?
        </h1>
        <h2 className="text-xl text-neutral-400">Помнишь, мы хотели?</h2>
        <a href="tel:+380508843693">
          <button className="px-6 py-2 bg-logo text-white outline-0 hover:bg-darker-logo transition duration-200 rounded-sm cursor-pointer font-semibold">
            Погнали попробуем
          </button>
        </a>
        <h3 className="text-sm text-neutral-400">
          <span className="font-semibold">P.S</span> А мне надо проектик в
          портфолио
        </h3>
        <Link
          to={"/login"}
          className="link"
        >
          Логин
        </Link> */}

        {/* Employees */}
        <h1 className="text-4xl text-center text-color-logo font-bold">
          Вітаємо, залиште відгук тут!
        </h1>
        <div className="flex justify-center items-center">
          <h2 className="text-2xl text-neutral-300 text-center">
            Оберіть співробітника
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 justify-center items-center space-x-10">
          <div className="flex flex-col items-center space-y-5 hover:scale-105 transition duration-200 cursor-pointer">
            <img
              src={avatar}
              alt=""
              className="w-full max-w-[200px]"
            />
            <h4 className="text-xl">Халид Кащмири</h4>
          </div>

          <div className="flex flex-col items-center space-y-5 hover:scale-105 transition duration-200 cursor-pointer">
            <img
              src={avatar2}
              alt=""
              className="w-full max-w-[200px]"
            />
            <h4 className="text-xl">Мухаммед Сумбуль</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
