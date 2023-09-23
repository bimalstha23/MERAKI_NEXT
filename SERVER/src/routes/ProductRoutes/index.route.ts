import { Request, Response, Router } from "express";
import AppRouter from "../../utils/AppRouter";
import { isAdmin, requireAuth } from "../../middlewares/authMiddlewares";
import { productRoutesPath } from "../../constants/Api";
import {
  addProduct,
  changeStatusofProduct,
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

productRouter.get(productRoutesPath.getProducts, getProducts);
productRouter.get(productRoutesPath.getProduct, deserializeUser, requireAuth, isAdmin, getProduct)
productRouter.put(productRoutesPath.updateProduct, deserializeUser, requireAuth, isAdmin, updateProduct)
productRouter.patch(productRoutesPath.changeStatus, deserializeUser, requireAuth, isAdmin, changeStatusofProduct)

export default productRouter;
