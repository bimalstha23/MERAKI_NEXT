import { Request, Response } from "express";
import prismaClient from "../../PrismaClient";

export const moveToDraft = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    prismaClient.product.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "DRAFT",
      },
    });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};
