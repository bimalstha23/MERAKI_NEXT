import { Request, Response } from "express";
import { Product } from "@prisma/client";
import multer, { MulterError } from "multer";
import prismaClient from "../../PrismaClient";
import { ProductStatus } from "@prisma/client";

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
    console.log(req.body, "req.body")
    console.log(req.file, "req.files")
    upload(req, res, async (err: any) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      
      console.log(req.files, "req.files");
      const fileNames = (req.files as Express.Multer.File[])?.map(
        (file: { filename: any }) => file.filename
      );

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

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      searchTerm,
      status,
      page,
      pageSize,
    } = req.query;

    // Prepare filter options based on query parameters
    const filterOptions: {
      category?: {
        name?: string;
      };
      price?: {
        gte?: number;
        lte?: number;
      };
      status?: string;
    } = {};

    if (category) {
      filterOptions.category = {
        name: category as string,
      };
    }

    if (minPrice || maxPrice) {
      filterOptions.price = {};

      if (minPrice) {
        filterOptions.price.gte = parseInt(minPrice as string, 10);
      }

      if (maxPrice) {
        filterOptions.price.lte = parseInt(maxPrice as string, 10);
      }
    }

    if (status) {
      filterOptions.status = status as string;
    }

    let productStatus = "ACTIVE";

    if (status === "ARCHIVED" || status === "archived") {
      productStatus = "ARCHIVED";
    } else if (status === "DRAFT" || status === "DRAFT") {
      productStatus = "DRAFT";
    } else {
      productStatus = "ACTIVE";
    }

    const sortOrderValid =
      sortOrder === "asc" || sortOrder === "desc" ? sortOrder : undefined;

    const skip = page
      ? (parseInt(page as string, 10) - 1) * parseInt(pageSize as string, 10)
      : undefined;
    const take = pageSize ? parseInt(pageSize as string, 10) : undefined;

    const products = await prismaClient.product.findMany({
      include: {
        category: true,
        images: true,
      },
      where: {
        ...filterOptions,
        OR: searchTerm
          ? [
              { name: { contains: searchTerm as string, mode: "insensitive" } },
              {
                description: {
                  contains: searchTerm as string,
                  mode: "insensitive",
                },
              },
            ]
          : undefined,
        status: productStatus ? (productStatus as ProductStatus) : "ACTIVE",
      },
      orderBy: {
        [sortBy as string]: sortOrderValid || undefined,
      },
      skip,
      take,
    });

    const updatedProducts = products.map((product) => {
      if (product.quantity > 0) {
        return {
          ...product,
          instock: true,
        };
      }
      return {
        ...product,
        instock: false,
      };
    });

    res.status(200).json({ updatedProducts });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await prismaClient.product.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        category: true,
        images: true,
      },
    });

    res.status(200).json({ product });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      name,
      categoryId,
      quantity,
      cost_price,
      selling_price,
      description,
      discount,
    } = req.body;

    const product = await prismaClient.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        cost_price,
        selling_price,
        description,
        quantity,
        discount: discount || 0,
        category: {
          connect: { id: Number(categoryId) },
        },
      },
    });
    res.status(200).json({ product });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prismaClient.product.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};
