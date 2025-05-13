import axios from "axios";
import React, { useEffect, useState } from "react";
import { data, Link, useNavigate, useParams } from "react-router";
import Loader from "../components/Loader";
import avatar from "../assets/avatar.png";
import { HiArrowLongLeft } from "react-icons/hi2";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

export default function AdminEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const formatDate = (unformattedData) => {
    const date = new Date(unformattedData);

    return date.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/employee/${id}`);
        const employeeData = res.data.data;
        setEmployee(employeeData);
        setReviews(employeeData.reviews);
      } catch (error) {
        console.log("Сотрудник не найден", error.message);
        navigate("/admin");
      }
    };
    fetchData();
  }, [id, navigate]);

  if (!employee) return <Loader />;

  return (
    <div className="flex gap-4 items-center flex-col rounded-xl border-neutral-600 shadow-2xl shadow-black bg-black justify-center p-10 mt-10 relative border w-full sm:max-w-[500px] mx-auto">
      <Link
        to="/admin"
        className="flex gap-2 items-center hover:text-logo transition duration-200 self-start cursor-pointer"
      >
        <HiArrowLongLeft className="text-4xl" />
        <span className="text-md">Вернуться</span>
      </Link>
      <img
        src={avatar}
        alt=""
        className="max-w-[150px]"
      />
      <h2 className="text-2xl font-bold">
        Информация о сотруднике: {employee.employeeName}
      </h2>
      <hr className="text-neutral-600 w-full" />
      <div className="flex items-start flex-col gap-4 w-full">
        <div className="text-xl flex items-center justify-center gap-2">
          Средний рейтинг: {employee.averageRating}
          <FaStar className="text-3xl text-yellow-500 " />
        </div>

        <h2 className="text-xl font-bold">Отзывы:</h2>

        {reviews?.length ? (
          reviews.map((el) => (
            <div
              key={el._id}
              className="w-full p-1"
            >
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <p className="text-xl">Оценка: {el.reviewMark}</p>
                  <FaRegStar className="text-xl text-amber-400" />
                </div>

                <span className="justify-end text-neutral-500">
                  {formatDate(el.createdAt)}
                </span>
              </div>
              <p className="text-xl">{el.reviewText}</p>
              <hr className="text-neutral-600 w-full" />
            </div>
          ))
        ) : (
          <p className="text-xl text-neutral-500">Пока что нет отзывов</p>
        )}
      </div>
    </div>
  );
}
