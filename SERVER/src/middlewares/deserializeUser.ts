import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";
import prismaClient from "../PrismaClient";
import { verify } from "jsonwebtoken";

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

    if (!access_token) {
    }

    // Verify the token
    const decoded = verify(access_token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(403).send({
        success: false,
        message: "You are not authorized to access this route",
      });
    } else {
      console.log("decoded", decoded);
    }

    console.log(decoded?.sub, "decoded");

    // Check if user still exist
    // const user = await findUserById(JSON.parse(session).id);

    // const user = await prismaClient.user.findUnique({
    //   where: {
    //     id: req.body.userId,
    //   },
    // });
    // if (!user) {
    //   res.status(403).send({
    //     success: false,
    //     message: "You are not authorized to access this route",
    //   });
    // }

    // This is really important (Helps us know if the user is logged in from other controllers)
    // You can do: (req.user or res.locals.user)
    // res.locals.user = user;

    next();
  } catch (err: any) {
    // res.status(500).send({
    //   success: false,
    //   message: "Internal Server Error",
    // });
    console.log(err);
  }
};
