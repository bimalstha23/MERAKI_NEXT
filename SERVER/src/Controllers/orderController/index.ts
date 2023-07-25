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
      customer_address_landmark,
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
    const profit = TotalAmount - totalCostPrice - Number(deleviry_fee);

    // Create the order and update the product quantities
    const order = await prismaClient.order.create({
      data: {
        status: "PENDING",
        user: { connect: { id: userid } }, // Use 'user' instead of 'userId' and connect it to the corresponding user ID
        customer_name,
        customer_phone,
        customer_address,
        customer_address_landmark,
        customer_email,
        total_amount: discountedTotalAmount, // Use the discounted total amount
        discount: totalDiscount + (discountedTotalAmount * discount), // Save the combined discount value in the order
        profit, // Save the calculated profit in the order
        createdByAdmin: true,
        delivery_fee: Number(deleviry_fee),
        orderProducts: {
          create: products.map((product: { id: any; quantity: any; }) => ({
            product: { connect: { id: product.id } },
            quantity: product.quantity,
          })),
        },
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
    const { customerName, orderId, sortBy, page, pageSize , filter ,  from , to } = req.query;

    // Convert page and pageSize to numbers with default values
    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(pageSize)|| 10;

    // Build the filters based on the query parameters
    let filters = {
      createdAt:{
      }


     } 
   if(filter){
   if(filter ==="last7days"){
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    filters.createdAt = {
      gte: new Date(sevenDaysAgo).toISOString(), // Convert to ISO 8601 DateTime format
    lte: new Date(currentDate).toISOString()
    };
   }
    else if(filter ==="last1month"){
    const currentDate = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(currentDate.getDate() - 30);
    filters.createdAt = {
      gte: new Date(thirtyDaysAgo).toISOString(), // Convert to ISO 8601 DateTime format
      lte: new Date(currentDate).toISOString()
    };
  }
    else if(filter ==="last2days"){
      const currentDate = new Date();
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(currentDate.getDate() - 2);
      filters.createdAt = {
        gte: new Date(twoDaysAgo).toISOString(), // Convert to ISO 8601 DateTime format
        lte: new Date(currentDate).toISOString()
      };
    }
    else if(filter ==="last6month"){
      const currentDate = new Date();
      const sixMonthAgo = new Date();
      sixMonthAgo.setDate(currentDate.getDate() - 180);
      filters.createdAt = {
        gte: new Date(sixMonthAgo).toISOString(), // Convert to ISO 8601 DateTime format
    lte: new Date(currentDate).toISOString()
      };
    }
    else if(filter ==="last1year"){
        const currentDate = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setDate(currentDate.getDate() - 365);
        filters.createdAt = {
          gte: new Date(oneYearAgo).toISOString(), // Convert to ISO 8601 DateTime format
    lte: new Date(currentDate).toISOString()
        };
    }
}
 console.log(filters , 'filter')
if(from && to){
  filters.createdAt = {
    gte: new Date(from as string),
    lte: new Date(to as string)
  };
}



    // Define the sorting options based on the sortBy query parameter
    const sortingOptions: any = {};
    if (sortBy === 'customerName') {
      sortingOptions.user = {
        name: 'asc',
      };
    } else if (sortBy === 'orderId') {
      sortingOptions.id = 'asc';
    }

    const totalOrders = await prismaClient.order.count({ where: {
      OR: customerName || orderId
      ? [
          { customer_name: { contains:customerName  as string, mode: "insensitive" } },
          {
            customer_address: {
              contains: customerName as string,
              mode: "insensitive",
            },
          },
        ]
      : undefined,
    }, });

    const orders = await prismaClient.order.findMany({
      where: {
        OR: customerName
        ? [
            { customer_name: { contains:customerName  as string, mode: "insensitive" } },
            {
              customer_address: {
                contains: customerName as string,
                mode: "insensitive",
              },
            },
            {
              customer_phone: {
                contains: customerName as string,
                mode: "insensitive",
              },
            },
            {
              id:{
                equals: parseInt(customerName as string),
              },
            }
          ]
        : undefined,
          ...filters,
      },
      include: {
        user: true,
        orderProducts: {
          include: {
            product: {
              select: {
                name: true,
                quantity: true,
                description: true,
                id: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy:{
        createdAt: 'desc'
      },
      skip: (pageNumber - 1) * itemsPerPage,
      take: itemsPerPage,
    });

    // Function to filter out unnecessary product fields
    const filterProductFields = (product: any) => {
      const { cost_price, ...filteredProduct } = product;
      return filteredProduct;
    };

    // Function to filter out unnecessary order fields
    const filterOrderFields = (order: any) => {
      order.orderProducts.forEach((orderProduct: any) => {
        orderProduct.product = filterProductFields(orderProduct.product);
      });
      return order;
    };

    // Filter out unnecessary fields from the response
    const filteredOrders = orders.map((order) => filterOrderFields(order));
    const totalPages = Math.ceil(totalOrders / itemsPerPage);
    const hasNextPage = pageNumber < totalPages;
    const nextPage = hasNextPage ? pageNumber + 1 : null;

    res.status(200).json({
      data: filteredOrders,
      pagination: {
        nextPage,
        has_next_page: hasNextPage,
        total: totalOrders,
        currentPage: pageNumber,
        pageSize: itemsPerPage,
      },
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOrder =  async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    const order = await prismaClient.order.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        orderProducts: {
          include: {
            product: {
              select: {
                name: true,
                quantity: true,
                description: true,
                id: true,
                images: true,
                selling_price: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Function to filter out unnecessary product fields
    const filterProductFields = (product: any) => {
      const { cost_price, quantity ,  ...filteredProduct } = product;
      return filteredProduct;
    };

    // Function to filter out unnecessary order fields
    const filterOrderFields = (order: any) => {
      order.orderProducts.forEach((orderProduct: any) => {
        orderProduct.product = filterProductFields(orderProduct.product);

      });
      return order;
    };

    // Filter out unnecessary fields from the response
    const filteredOrder = filterOrderFields(order);
    // remove profit and discount from the response
    delete filteredOrder.profit;

    
    res.status(200).json({ order: filteredOrder });
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const ChangeOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id, status } = req.body;
    console.log(id , status)
    const order = await prismaClient.order.findUnique({
      where: { id: Number(id) },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await prismaClient.order.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (e) {
    console.log(e)
    res.status(500).json({ message: "Something went wrong" });
  }
}