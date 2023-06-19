import { Request, Response } from "express";
import prismaClient from "../../PrismaClient";

export const adminMovetoOrder = async (req: Request, res: Response) => {
  try {
    const {
      customer_name,
      customer_phone,
      customer_email,
      customer_address,
      total_amount,
      productIds,
    } = req.body;

    // Fetch the products based on the provided productIds
    const products = await prismaClient.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    // Calculate the total amount based on the product prices
    const calculatedTotalAmount = products.reduce(
      (total, product) => total + product.selling_price,
      0
    );

    // Validate that the provided total_amount matches the calculated total amount
    if (total_amount !== calculatedTotalAmount) {
      return res.status(400).json({
        message: "Invalid total_amount. Please provide the correct value.",
      });
    }

    // Check if there is enough quantity available for each product
    for (const product of products) {
      const orderedQuantity = productIds.filter(
        (id: number | string) => id === product.id
      ).length;

      if (product.quantity < orderedQuantity) {
        return res.status(400).json({
          message: `Insufficient quantity for product: ${product.name}`,
        });
      }
    }

    // Create the order and update the product quantities
    const order = await prismaClient.order.create({
      data: {
        customer_name,
        customer_phone,
        customer_email,
        customer_address,
        total_amount,
        products: {
          connect: productIds.map((productId: number) => ({ id: productId })),
        },
      },
      include: {
        products: true,
      },
    });

    // Decrease the quantity of each product
    for (const product of products) {
      const orderedQuantity = productIds.filter(
        (id: number) => id === product.id
      ).length;
      const newQuantity = product.quantity - orderedQuantity;

      await prismaClient.product.update({
        where: { id: product.id },
        data: { quantity: newQuantity },
      });
    }
    res.status(200).json({ order });
  } catch {}
};
