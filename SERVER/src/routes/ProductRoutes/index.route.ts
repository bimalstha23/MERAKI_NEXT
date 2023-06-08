import { Request, Response, Router } from "express";
import AppRouter from "../../utils/AppRouter";

const productRouter = AppRouter.getInstance();

productRouter.get("/", (req: Request, res: Response) => {
  res.send({ message: "Ok productapi is working 🚀" });
});

export default productRouter;
