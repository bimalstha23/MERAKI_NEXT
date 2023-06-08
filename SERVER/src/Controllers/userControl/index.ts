import { Request, Response } from "express";
import prismaClient from "../../PrismaClient";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(201).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
