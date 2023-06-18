import { Request, Response } from "express";
import prismaClient from "../../PrismaClient";

export const addCategory = (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    prismaClient.category.create({
      data: {
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    res.status(201).json({ message: "Category added successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prismaClient.category.findMany();
    res.status(200).json({ categories });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await prismaClient.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ category });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await prismaClient.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        updatedAt: new Date(),
      },
    });
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prismaClient.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
