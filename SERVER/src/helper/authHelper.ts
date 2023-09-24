import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request } from "express";
import jwt, { JwtPayload, verify } from "jsonwebtoken";
import prismaClient from "../PrismaClient";

export const hashPassword = async (password: string) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = (user: User) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "1m",
  });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

export const getUser = async (req: Request) => {
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
    const decoded = verify(access_token, process.env.JWT_SECRET!) as JwtPayload;
    if (decoded) {
      const user = await prismaClient.user.findUnique({
        where: {
          id: decoded.id
        },
        select: {
          role: true
        }
      })
      return user
    }
  }
  return null
}


