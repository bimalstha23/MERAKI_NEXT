import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import prismaClient from "../PrismaClient";
import AppError from "../utils/AppError/appError";

interface CustomRequest extends Request {
  user?: any;
}

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('isAdmin')
  try {
    const userID = res.locals.user.id;
    const user = await prismaClient.user.findUnique({
      where: {
        id: userID,
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

export const IsManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = res.locals.user.id;
    const user = await prismaClient.user.findUnique({
      where: {
        id: userID,
      },
    });
    if (user?.role === "MANAGER" || user?.role === "ADMIN") {
      next();
    }
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
    console.log(
      'require Auth',
    );
    const user = res.locals.user;
    if (!user) {
     return res.status(403).send({
        success: false,
        message: "You are not authorized to access this route",
      });
    }
    next();
  } catch (err: any) {
    next(err);
  }
};
