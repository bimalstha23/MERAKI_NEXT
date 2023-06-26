import { Request, Response } from "express";
import { Product } from "@prisma/client";
import multer, { MulterError } from "multer";
import prismaClient from "../../PrismaClient";
import { ProductStatus } from "@prisma/client";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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
      status,
    } = req.body;
      const storage  = getStorage()
      const imagesUrls  = [] as any
      for (const file of req.files as Express.Multer.File[]) {
        const storageRef = ref(storage, `images/${file.originalname}`);
        await uploadBytes(storageRef, file.buffer);
        const url = await getDownloadURL(storageRef);
        imagesUrls.push({url:url})
      }


      await prismaClient.product.create({
        data: {
          name,
          cost_price:Number(cost_price),
          selling_price:Number(selling_price),
          description,
          quantity : Number(quantity),
          discount: Number(discount) || 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: status as ProductStatus,
          category: {
            connect: { id: Number(categoryId) },
          },
          images: {
            create: imagesUrls,
          },
        },
      });

      res.status(201).json({ message: "Product created successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error.message, "error.message")
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
      onStock,
      outOfStock,
    } = req.query;

    // Prepare filter options based on query parameters
    const filterOptions: {
      category?: {
        id: number;
      };
      price?: {
        gte?: number;
        lte?: number;
      };
      status?: string;
      quantity?: {
        gte?: number; // Add quantity filter for onStock
        lte?: number; // Add quantity filter for outOfStock
      };
    } = {};
    
    if (category) {
      filterOptions.category = {
        id: Number(category) as unknown as number,
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
    
    if (onStock) {
      filterOptions.quantity = {
        gte: 1, // Filter for onStock products (quantity greater than or equal to 1)
      };
    }
    
    if (outOfStock) {
      filterOptions.quantity = {
        lte: 0, // Filter for outOfStock products (quantity less than or equal to 0)
      };
    }
    
    if (category) {
      filterOptions.category = {
        id: Number(category) as unknown as number,
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
    let nextPage = null
    let hasNextPage = false
    if(page && take){
        nextPage = products.length < take ? null : Number(page) + 1;
        hasNextPage = products.length < take ? false : true;
      }
    

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
  
    res.status(200).json({ data:updatedProducts , pagination:{
      nextPage,
      has_next_page:hasNextPage,
      total:updatedProducts.length,
      currentPage:page ? Number(page) : 1,
      pageSize:take ? take : 10
    } });
  } catch (error: any) {
    console.log(error)
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
