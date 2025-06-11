import axios from "../../utils/axiosInstance.js";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Employee from "../components/Employee";
import Loader from "../components/Loader";
import RateEmployee from "../components/RateEmployee";
import toast, { Toaster } from "react-hot-toast";
import { HiArrowLongLeft } from "react-icons/hi2";
import avatar from "../assets/avatar.png";

export default function EmployeePage() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/employee/${id}`)
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch((error) => console.log(`Error: ${error.message}`));
  }, [id]);

  if (!employee) {
    return <Loader />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating <= 3 && !review.trim()) {
      setError("Будь ласка, введіть текст відгуку");
      return;
    }
    if (!rating) {
      setError("Будь ласка, оберіть оцінку");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      await axios.post(`/api/employee/${id}/review`, {
        reviewText: review,
        reviewMark: rating,
      });

      setReview("");
      setRating(null);
      toast.success("Дякуємо за відгук!");
    } catch (error) {
      if (error.response?.status === 429) {
        toast(
          "Ви вже залишили відгук для цього співробітника. Спробуйте пізніше",
          {
            duration: 1800,
            icon: "⏳",
          }
        );
      } else {
        toast.error(`Щось пішло не так... \n${error.message}`);
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className="container flex flex-col mx-auto pt-10 items-center justify-center gap-5 px-3"
          onSubmit={handleSubmit}
        >
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <Link
            to="/"
            className="flex gap-2 items-center hover:text-logo transition duration-200 self-start cursor-pointer"
          >
            <HiArrowLongLeft className="text-4xl" />
            <span className="text-md">Повернутись</span>
          </Link>
          <Employee
            employeeName={employee.employeeName}
            employeeImage={employee.employeeImage || avatar}
          />
          <RateEmployee
            rating={rating}
            setRating={setRating}
            required
          />
          {rating <= 3 && rating !== null ? (
            <textarea
              className={`border-2 ${
                error ? "border-red-500" : "border-logo"
              } px-4 py-2 w-full max-w-[350px] sm:w-[350px] sm:h-[100px] rounded-xl caret-amber-500 active:border-logo focus:border-logo`}
              placeholder="Що саме не сподобалось? 🥺"
              onChange={(e) => setReview(e.target.value)}
              required
            ></textarea>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="px-10 py-3 bg-logo hover:bg-darker-logo transition cursor-pointer rounded-xl active:bg-black"
          >
            Надіслати
          </button>
          {error && (
            <span className="text-red-500 text-sm transition  text-center">
              {error}
            </span>
          )}
        </form>
      )}
    </>
  );
}
