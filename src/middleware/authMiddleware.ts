import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(403).json({ message: "No token provided!" });

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD ?? "");

    if (typeof decoded === "string") throw new Error("Invalid token");

    req.userId = decoded.id as string;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token!" });
  }
};
