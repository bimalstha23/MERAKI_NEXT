import { Request, Response, Router } from "express";
import AppRouter from "../../utils/AppRouter";
import { isAdmin, requireAuth } from "../../middlewares/authMiddlewares";
import { productRoutesPath } from "../../constants/Api";
import { addProduct } from "../../Controllers/productController";

const productRouter = AppRouter.getInstance();

productRouter.post(
  productRoutesPath.createProduct,
  requireAuth,
  isAdmin,
  addProduct
);

export default productRouter;
