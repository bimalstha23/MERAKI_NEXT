import { Request, Response, Router } from "express";
import AppRouter from "../../utils/AppRouter";
import { requireAuth } from "../../middlewares/authMiddlewares";
import { productRoutesPath } from "../../constants/Api";

const productRouter = AppRouter.getInstance();

productRouter.get(
  productRoutesPath.getProducts,
  requireAuth,
  (req: Request, res: Response) => {
    res.send({ message: "Ok productapi is working 🚀" });
  }
);

export default productRouter;
