import { Request, Response } from "express";
import prismaClient from "../../PrismaClient";

export const moveToArchived = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    prismaClient.product.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "ARCHIVED",
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteArchive = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    prismaClient.product.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
