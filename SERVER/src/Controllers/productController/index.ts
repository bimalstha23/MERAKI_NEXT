import { Request, Response } from "express";
import { Product } from "@prisma/client";
import multer, { MulterError } from "multer";
import prismaClient from "../../PrismaClient";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix); // Filename for the uploaded file
  },
});

const upload = multer({ storage: storage }).array("images", 5); // Accept up to 5 files with the field name 'images'

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      categoryId,
      quantity,
      cost_price,
      selling_price,
      description,
      discount,
    } = req.body;
    console.log(req.files, "req.files");
    upload(req, res, async (err: any) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const fileNames = (req.files as Express.Multer.File[])?.map(
        (file: { filename: any }) => file.filename
      );

      console.log(fileNames, "fileNames");
      const imagesData = fileNames?.map((fileName: string) => ({
        url: fileName,
      }));

      await prismaClient.product.create({
        data: {
          name,
          cost_price,
          selling_price,
          description,
          quantity,
          discount: discount || 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          category: {
            connect: { id: Number(categoryId) },
          },
          images: {
            create: imagesData,
          },
        },
      });

      res.status(201).json({ message: "Product created successfully" });
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
