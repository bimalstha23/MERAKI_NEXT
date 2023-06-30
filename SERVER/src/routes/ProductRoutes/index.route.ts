import { Request, Response, Router } from "express";
import AppRouter from "../../utils/AppRouter";
import { isAdmin, requireAuth } from "../../middlewares/authMiddlewares";
import { productRoutesPath } from "../../constants/Api";
import {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../../Controllers/productController";
import { deserializeUser } from "../../middlewares/deserializeUser";
import { upload } from "../../middlewares/upload";

const productRouter = AppRouter.getInstance();

productRouter.post(
  productRoutesPath.createProduct,
  deserializeUser,
  requireAuth,
  isAdmin,
  upload,
  addProduct
);

productRouter.get(productRoutesPath.getProducts, deserializeUser,
  requireAuth,
  isAdmin, getProducts);
productRouter.get(productRoutesPath.getProduct,deserializeUser ,requireAuth , isAdmin ,   getProduct)
productRouter.put(productRoutesPath.updateProduct,deserializeUser ,requireAuth , isAdmin ,   updateProduct)


export default productRouter;
