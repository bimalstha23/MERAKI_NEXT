import { CookieOptions, NextFunction, Request, Response } from "express";
import prismaClient from "../../PrismaClient";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "../../helper/authHelper";
import { JwtPayload, Secret, SignOptions, sign, verify } from "jsonwebtoken";
import config from "config";

const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>("accessTokenExpiresIn") * 60 * 1000
  ),
  maxAge: config.get<number>("accessTokenExpiresIn") * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.get<number>("refreshTokenExpiresIn") * 60 * 1000
  ),
  maxAge: config.get<number>("refreshTokenExpiresIn") * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

// Only set secure to true in production
if (process.env.NODE_ENV === "production")
  accessTokenCookieOptions.secure = true;

export const createUser = async (req: Request, res: Response) => {
  console.log("we are here");
  try {
    // get name, email, and password from request body
    const { name, email, password } = req.body;

    // check if name, email, and password are provided
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "name, email, and password are required",
      });
    }

    // check if the user already exists
    const userExists = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    // if user exists, throw an error
    if (userExists) {
      return res.status(400).send({
        success: false,
        message: "user already exists",
      });
    }
    const hashedPassword = await hashPassword(password);
    // create a user
    if (hashedPassword) {
      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      res.status(201).json({ user });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.role === "USER") {
      return res.status(404).send({
        success: false,
        message: "Who are you ? the sysem does not know you",
      });
    }

    const match = await comparePassword(password, user.password);
    let secretOrPrivateKey: Secret | undefined;

    if (process.env.JWT_SECRET) {
      secretOrPrivateKey = process.env.JWT_SECRET;
    }


    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    res.cookie("access_token", newAccessToken, accessTokenCookieOptions);
    res.cookie("refresh_token", newRefreshToken, refreshTokenCookieOptions);
    // send back the user to the client
    res.status(200).json({ user });
  } catch (error: any) {
    // handle errors
    console.log('error', error)
    res.status(500).json({ error: error.message });
  }
};

export const refreshWebToken = async (req: Request, res: Response) => {
  try {
    const refresh_token = req.cookies.refresh_token as string;
    if (!refresh_token) {
      return res.status(403).json("You are not authenticated! refresh token ");
    }

    const payload = verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload;
    if (!payload) {
      return res.status(403).json("You are not authenticated!");
    }
    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(payload?.id as string),
      },
    });
    if (!user) {
      return res.status(403).json("You are not authenticated!");
    }
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    res.cookie("access_token", newAccessToken, accessTokenCookieOptions);
    res.cookie("refresh_token", newRefreshToken, refreshTokenCookieOptions);

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    console.log(res);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).send("Logged out successfully");
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
