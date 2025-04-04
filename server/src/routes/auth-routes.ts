import { Router, Request, Response } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Invalid username" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error" });
  }
};
const router = Router();

// POST /login - Login a user
router.post("/login", login);

export default router;
