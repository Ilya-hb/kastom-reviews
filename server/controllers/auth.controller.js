import jwt from "jsonwebtoken";

export const loginAdmin = (req, res) => {
  const { username, password } = req.body;

  const ADMIN = {
    username: process.env.ADMIN,
    password: process.env.PASSWORD,
  };

  if (username === ADMIN.username && password === ADMIN.password) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });
    return res.status(200).json({ success: true, token });
  }
  return res.status(401).json({ message: "Неверный пароль." });
};
