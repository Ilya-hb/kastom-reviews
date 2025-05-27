import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("/api/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (error) {
      if (error.status === 401) setError("Неверный логин или пароль");
      else setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="container mx-auto py-10 flex flex-col items-center"
    >
      <div className="rounded border-1 border-neutral-800 bg-neutral-700 gap-4 shadow-xs justify-center shadow-black p-10 flex flex-col items-center">
        <h2 className="text-4xl font-bold mr-3">Login page</h2>
        <input
          type="text"
          placeholder="Login"
          onChange={(e) => setUsername(e.target.value)}
          className="border-black border-1 px-4 py-2 text-xl"
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-black border-1 px-4 py-2 text-xl"
          autoComplete="false"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 text-xl border-1 border-black cursor-pointer hover:bg-black transition duration-300"
        >
          Submit
        </button>
        {error && <span className="text-red-500 text-md">Ошибка: {error}</span>}
      </div>
    </form>
  );
}
