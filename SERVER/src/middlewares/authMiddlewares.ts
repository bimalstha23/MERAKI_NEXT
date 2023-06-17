import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import prismaClient from "../PrismaClient";

interface CustomRequest extends Request {
  user?: any;
}

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: req.body.userId,
      },
    });
    if (user?.role !== "ADMIN") {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to access this route",
      });
    }
    next();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const requireAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).send({
        success: false,
        message: "You are not authorized to access this route",
      });
    }

    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    const decode = verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decode;
    next();
    //handle token error
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};
