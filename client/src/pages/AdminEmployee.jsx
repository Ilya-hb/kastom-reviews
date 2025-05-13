import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../components/Loader";

export default function AdminEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`/api/employee/${id}`).then((res) => setEmployee(res.data.data));
  }, [id]);

  if (!employee) return <Loader />;
  console.log(employee);
  return <div>AdminEmployee</div>;
}
