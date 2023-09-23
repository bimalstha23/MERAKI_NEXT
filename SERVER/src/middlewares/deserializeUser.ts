import { NextFunction, Request, Response } from "express";
import prismaClient from "../PrismaClient";
import { JwtPayload, verify } from "jsonwebtoken";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req?.cookies?.access_token) {
      access_token = req.cookies.access_token;
    } 

    if (access_token) {
      // Verify the token
      const decoded = verify(access_token, process.env.JWT_SECRET!) as JwtPayload;
      
      if (!decoded) {
        return res.status(403).send({
          success: false,
          message: "You are not authorized to access this route",
        });
      }

      const user = await prismaClient.user.findUnique({
        where: {
          id: Number(decoded?.id as string),
        },
      });
      
      if (!user) {
        return res.status(403).send({
          success: false,
          message: "You are not authorized to access this route",
        });
      }
      
      // This is really important (Helps us know if the user is logged in from other controllers)
      // You can do: (req.user or res.locals.user)
      // res.locals.user = user;
      res.locals.user = user;
      next();
    }else {
      return res.status(403).send({
        success: false,
        message: "You are not logged in",
      });
    }
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
