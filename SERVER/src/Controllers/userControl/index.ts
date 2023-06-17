import { Request, Response } from "express";
import prismaClient from "../../PrismaClient";
import { comparePassword, hashPassword } from "../../helper/authHelper";
import { Secret, SignOptions, sign } from "jsonwebtoken";

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

    if (!user) {
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

    const options: SignOptions = {
      expiresIn: "7d",
    };
    let token = "";
    if (secretOrPrivateKey) {
      token = sign({ id: user.id }, secretOrPrivateKey, options);
      // Use the token as needed
    } else {
      // Handle the case when the secret key is undefined
      console.error("JWT secret key is not defined");
    }
    // if password is incorrect, throw an error

    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // send back the user to the client
    res.status(200).json({ user, token: token });
  } catch (error: any) {
    // handle errors
    res.status(500).json({ error: error.message });
  }
};
