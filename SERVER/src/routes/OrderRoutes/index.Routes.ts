import { createOrder, getOrders } from "../../Controllers/orderController";
import { orderRoutesPath } from "../../constants/Api";
import { IsManager, isAdmin, requireAuth } from "../../middlewares/authMiddlewares";
import { deserializeUser } from "../../middlewares/deserializeUser";
import AppRouter from "../../utils/AppRouter";


const OrderRouter = AppRouter.getInstance();
  

OrderRouter.post(orderRoutesPath.createOrder , deserializeUser , requireAuth, isAdmin,  createOrder)
OrderRouter.get(orderRoutesPath.getOrders , deserializeUser , requireAuth, IsManager,  getOrders)

export default OrderRouter;