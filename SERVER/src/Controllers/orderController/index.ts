import { Request, Response } from "express";
import prismaClient from "../../PrismaClient";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      customer_name,
      customer_phone,
      customer_email,
      customer_address,
      total_amount,
      deleviry_fee,
      products,
      userid,
      discount,
    } = req.body;
    

    let calculatedTotalAmount = 0;
    let totalDiscount = 0;
    let totalCostPrice = 0;

    // Calculate the total amount, total discount, and total cost price
    for (const product of products) {
      const orderedQuantity = product.quantity;
      const productData = await prismaClient.product.findUnique({ where: { id: product.id } });

      if (!productData) {
        return res.status(400).json({
          message: `Invalid product ID: ${product.id}. Product not found.`,
        });
      }
      const productSubtotal = productData.selling_price * orderedQuantity;
      console.log(productSubtotal , 'productSubtotal')
      // Check if the product has an individual discount
      if (productData.discount) {
        const productDiscount = productSubtotal * (productData.discount/100);
        totalDiscount += productDiscount;
      }

      calculatedTotalAmount += productSubtotal;
      totalCostPrice += productData.cost_price * orderedQuantity;
    }

    // Apply the overall discount to the total amount
    const discountedTotalAmount = calculatedTotalAmount - totalDiscount;
    let TotalAmount  = discountedTotalAmount
    if(discount){
      const extraDiscount = discountedTotalAmount * (discount/100);
      TotalAmount = discountedTotalAmount - extraDiscount;
    }
    // Apply the delivery fee to the total amount
    if(deleviry_fee){
      TotalAmount = TotalAmount + Number(deleviry_fee);
    }

    
    // Validate that the provided total_amount matches the calculated discounted total amount
    if (total_amount !== TotalAmount) {
      return res.status(400).json({
        message: "Invalid total_amount. Please provide the correct value.",
      });
    }

    // Check if there is enough quantity available for each product
    for (const product of products) {
      const orderedQuantity = product.quantity;
      const productData = await prismaClient.product.findUnique({ where: { id: product.id } });

      if (!productData) {
        return res.status(400).json({
          message: `Invalid product ID: ${product.id}. Product not found.`,
        });
      }

      if (productData.quantity < orderedQuantity) {
        return res.status(400).json({
          message: `Insufficient quantity for product: ${productData.name}`,
        });
      }
    }

    // Calculate the profit
    const profit = discountedTotalAmount - totalCostPrice;

    // Create the order and update the product quantities
    const order = await prismaClient.order.create({
      data: {
        status: "PENDING",
        user: { connect: { id: userid } }, // Use 'user' instead of 'userId' and connect it to the corresponding user ID
        customer_name,
        customer_phone,
        customer_email,
        customer_address,
        total_amount: discountedTotalAmount, // Use the discounted total amount
        discount: totalDiscount + (discountedTotalAmount * discount), // Save the combined discount value in the order
        profit, // Save the calculated profit in the order
        delivery_fee: Number(deleviry_fee),
        products: {
          create: products.map((product: any) => ({
            name: product.name, // Include 'name', 'selling_price', 'cost_price', and 'category' for each product
            selling_price: product.selling_price,
            cost_price: product.cost_price,
            category: { connect: { id: product.categoryId } }, // Use 'connect' to associate an existing category with the product
            quantity: product.quantity,
            // product: { connect: { id: product.id } }, // Use 'connect' to associate an existing product with the order
          })),
        },
      },

      include: {
        products: true,
      },
    });

    // Decrease the quantity of each product
    for (const product of products) {
      const orderedQuantity = product.quantity;
      const productData = await prismaClient.product.findUnique({ where: { id: product.id } });

      if (!productData) {
        return res.status(400).json({
          message: `Invalid product ID: ${product.id}. Product not found.`,
        });
      }

      const newQuantity = productData.quantity - orderedQuantity;

      await prismaClient.product.update({
        where: { id: product.id },
        data: { quantity: newQuantity },
      });
    }

    res.status(200).json({ order });
  } catch(e) {
    console.log(e)
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prismaClient.order.findMany({
      include: {
        products: {
          include: {
            category: true,
            images: true,
          },
        },
      },
    });
    res.status(200).json({ orders });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
}