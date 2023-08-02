import { Request, Response } from "express";
import prismaClient from "../../PrismaClient";
interface SaleData {
  createdAt: string;
  _sum: {
    total_amount: number;
  };
}



export const getStats = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    const filters:{
        createdAt?:{
            gte?:string;
            lte?:string;
        }
    } ={};

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
     

    const ordersQuery = {
      where: {
        createdAt: {
          gte: filters.createdAt?.gte,
          lte: filters.createdAt?.lte,
        },
      },
    };

    const orders = await prismaClient.order.findMany(ordersQuery);
    const TotalOrders  = orders.length;
    const Totalproducts = await prismaClient.product.count();
    const TotalCategories = await prismaClient.category.count();
    const Totalusers = await prismaClient.user.count();
    const totalProfit = orders.reduce((acc, order) => acc + order.profit, 0);
    const TotalSales = orders.reduce((acc, order) => acc + order.total_amount, 0);
    const orderProducts = await prismaClient.orderProduct.findMany(ordersQuery);
    const TotalProductsSold = orderProducts.reduce((acc, order) => acc + order.quantity, 0);

    const Products = await prismaClient.product.findMany({
      include: {
        category: true,
        images: true,
      },
      orderBy: {
        soldCount: "desc",
      },
      take: 10,
    })
    res.status(200).json({
      Totalproducts,
      TotalCategories,
      Totalusers,
      totalProfit,
      TotalSales,
      TotalProductsSold,
      TotalOrders,
      topProducts:Products
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const getChartData = async (req: Request, res: Response) => {
      try{
        const currentDate = new Date();
        const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        const lastweek = new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000);
        const lastWeekSales = await prismaClient.order.groupBy({
          by: ["createdAt"],
          where: {
            createdAt: {
              gte: lastweek,
              lte: oneWeekAgo,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
          _sum: {
            total_amount: true,
          },
        });
        const thisWeeksales = await prismaClient.order.groupBy({
          by: ["createdAt"],
          where: {
            createdAt: {
              gte: oneWeekAgo,
              lte: currentDate,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
          _sum: {
            total_amount: true,
          },
        });
        const lastWeekSalesData = combineDailySales(lastWeekSales);
        const thisWeekSalesData = combineDailySales(thisWeeksales);

        res.status(200).json({
          lastWeekSales:lastWeekSalesData,
          thisWeeksales:thisWeekSalesData
        });

      }catch(e){
          console.log(e);
          res.status(500).json({message:"Something went wrong"});
      }
}

// Helper function to combine the total sales data by date
const combineDailySales = (salesData: any): { createdAt: string; total_sales: number }[] => {
  const combinedSalesData: { [key: string]: number } = {};
  const combinedSalesArray: { createdAt: string; total_sales: number }[] = [];

  for (const sale of salesData) {
    const date = new Date(sale.createdAt).toLocaleDateString();
    if (combinedSalesData[date]) {
      combinedSalesData[date] += sale._sum.total_amount;
    } else {
      combinedSalesData[date] = sale._sum.total_amount;
    }
  }

  for (const date in combinedSalesData) {
    combinedSalesArray.push({ createdAt: date, total_sales: combinedSalesData[date] });
  }

  return combinedSalesArray;
};
