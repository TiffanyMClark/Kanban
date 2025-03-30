import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  username: string;
}
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err || !decoded || typeof decoded === "string") {
      res.status(403).json({ message: "Invalid or expired token." });
      return;
    }

    req.user = decoded as JwtPayload;
    next();
  });
};
