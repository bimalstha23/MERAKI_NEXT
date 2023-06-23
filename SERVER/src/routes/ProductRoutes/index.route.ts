import { Request, Response, Router } from "express";
import AppRouter from "../../utils/AppRouter";
import { isAdmin, requireAuth } from "../../middlewares/authMiddlewares";
import { productRoutesPath } from "../../constants/Api";
import {
  addProduct,
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

productRouter.get(productRoutesPath.getProducts, getProducts);
productRouter.post(
  productRoutesPath.updateProduct,
  requireAuth,
  isAdmin,
  updateProduct
);

export default productRouter;
