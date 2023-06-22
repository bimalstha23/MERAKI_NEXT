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
  try {
    console.log(req.body.userId, "userId");
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
    const user = res.locals.user;
    if (!user) {
     return next(new AppError(`Invalid token or session has expired`, 403))
    }
    next();
  } catch (err: any) {
    next(err);
  }
};
