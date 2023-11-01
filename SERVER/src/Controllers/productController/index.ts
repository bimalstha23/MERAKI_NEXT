import { Request, Response } from "express";
import prismaClient from "../../PrismaClient";
import { ProductState, Product, User } from "@prisma/client";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getUser } from "../../helper/authHelper";
import slugify from "slugify";

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

    if (!name || !categoryId || !quantity || !cost_price || !selling_price || !description || !status) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const storage = getStorage()
    const imagesUrls = [] as any
    for (const file of req.files as Express.Multer.File[]) {
      const storageRef = ref(storage, `images/${file.originalname}`);
      await uploadBytes(storageRef, file.buffer);
      const url = await getDownloadURL(storageRef);
      imagesUrls.push({ url: url })
    }


    await prismaClient.product.create({
      data: {
        name,
        cost_price: Number(cost_price),
        selling_price: Number(selling_price),
        description,
        quantity: Number(quantity),
        discount: Number(discount) || 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: status as ProductState,
        category: {
          connect: { id: Number(categoryId) },
        },
        images: {
          create: imagesUrls,
        },
        slug: slugify(name, {
          lower: true,
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
        }),
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


    const user = await getUser(req) as User | any

    // Prepare filter options based on query parameters
    const filterOptions: {
      category?: {
        name: string;
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
        name: String(category) as unknown as string,
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

    if (status === "ARCHIVED" || status === "archived" && user.role === 'ADMIN') {
      productStatus = "ARCHIVED";
    } else if (status === "DRAFT" || status === "DRAFT" && user.role === 'ADMIN') {
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
        status: productStatus ? (productStatus as ProductState) : "ACTIVE",
      },
      orderBy: {
        [sortBy as string]: sortOrderValid || undefined,
      },
      skip,
      take,
    });

    const total = await prismaClient.product.count({
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
        status: productStatus ? (productStatus as ProductState) : "ACTIVE",
      },
    });

    console.log(total, 'total')

    let nextPage = null
    let hasNextPage = false
    if (page && take) {
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

    if (!user && user?.role !== 'ADMIN') {
      const remmoveCredidentials = updatedProducts.map((product) => {
        const { cost_price, ...rest } = product
        return rest
      })
      res.status(200).json({
        data: remmoveCredidentials, pagination: {
          nextPage,
          has_next_page: hasNextPage,
          total: updatedProducts.length,
          currentPage: page ? Number(page) : 1,
          pageSize: take ? take : 10,
          totalNumberofProducts: total,
          totalNumberofPages: Math.ceil(total / (take ? take : 10))
        }
      });
    } else {
      res.status(200).json({
        data: updatedProducts, pagination: {
          nextPage,
          has_next_page: hasNextPage,
          total: updatedProducts.length,
          currentPage: page ? Number(page) : 1,
          pageSize: take ? take : 10,
          totalNumberofProducts: total,
          totalNumberofPages: Math.ceil(total / (take ? take : 10))
        }
      });
    }

  } catch (error: any) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }
};


export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, slug } = req.query;
    const user = await getUser(req) as User | any;

    let product;

    if (id) {
      product = await prismaClient.product.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          category: true,
          images: true,
        },
      });
    } else if (slug) {
      product = await prismaClient.product.findUnique({
        where: {
          slug: slug as string,
        },
        include: {
          category: true,
          images: true,
        },
      });
    }

    // Check if the product exists
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Calculate the 'instock' property based on some criteria
    const instock = calculateInStock(product);

    if (user && user.role !== 'ADMIN') {
      // Create a new object without the 'cost_price' property
      const { cost_price, ...productWithoutCostPrice } = product;

      // Include 'instock' in the response
      res.status(200).json({ product: { ...productWithoutCostPrice, instock: instock } });
    } else {
      res.status(200).json({ product: { ...product, instock } });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};




export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.query;
    const {
      name,
      categoryId,
      quantity,
      cost_price,
      selling_price,
      description,
      discount,
      status
    } = req.body;

    const product = await prismaClient.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        cost_price: Number(cost_price),
        selling_price: Number(selling_price),
        description,
        quantity: Number(quantity),
        status,
        discount: Number(discount) || 0,
        category: {
          connect: { id: Number(categoryId) },
        },
        slug: slugify(name, {
          lower: true,
          replacement: "-",
          remove: /[*+~.()'"!:@]/g,
        }),
      },
    });
    res.status(200).json({ product });
  } catch (error) {
    console.error(error, 'updateProduct Error')
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

export const changeStatusofProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productids, status } = req.body;

    // Validate the incoming data
    if (!Array.isArray(productids) || productids.length === 0 || !status) {
      res.status(400).json({ message: "Invalid product data" });
      return;
    }

    // Loop through each product in the array and update its status
    const updatedProducts: Product[] = [];

    for (const productId of productids) {
      // Validate productId
      if (!productId) {
        res.status(400).json({ message: "Invalid product data" });
        return;
      }

      // Find the product in the database and update its status
      const updatedProduct = await prismaClient.product.update({
        where: { id: Number(productId) },
        data: { status: status as ProductState },
      });

      updatedProducts.push(updatedProduct);
    }

    res.status(200).json({ updatedProducts });
  } catch (error) {
    console.error(error, "changeStatusofProduct Error");
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Function to calculate the 'instock' property
function calculateInStock(product: Product) {
  // Implement your logic here to calculate 'instock' based on the product details
  // For example, you can check the quantity available or any other criteria
  // Return a boolean value indicating whether the product is in stock or not
  return product.quantity > 0; // Example: Assuming 'quantity' is a property in the product object
}
