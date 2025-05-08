import { useEffect, useState } from "react";
import axios from "axios";
import Employee from "./components/Employee";
import { Link } from "react-router";
import Loader from "./components/Loader";

function App() {
  const [employees, setEmployees] = useState([]);
  const [review, setReview] = useState({});

  useEffect(() => {
    axios
      .get("/api/employee")
      .then((res) => {
        console.log(res.data.data);
        setEmployees(res.data.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleReview = async (e, id) => {
    e.preventDefault();
  };

  if (!employees) return <Loader />;

  return (
    <>
      <div className="flex flex-col pt-10 items-center h-screen space-y-5 container mx-auto">
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
          {employees.map((el) => (
            <div
              className="flex justify-center items-center flex-col gap-3"
              key={el._id}
            >
              <Link to={`/employee/${el._id}`}>
                <Employee employeeName={el.employeeName} />
                {/* При нажатии открываеся страница с сотрудником */}
              </Link>

              {/* <form className="flex flex-col space-y-3">
                <textarea
                  className="border p-3 w-[300px] max-w-[300px]"
                  placeholder="Напишіть відгук тут"
                  onChange={(e) => setReview(e.target.value)}
                  maxLength={250}
                ></textarea>
                <button
                  type="submit"
                  className="border rounded border-logo"
                >
                  Надіслати
                </button>
              </form> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
