import { Application } from "express";
import { basePath } from "../constants/Api";
import userRoutes from "../routes/userRoutes";
import productRouter from "../routes/ProductRoutes/index.route";
import categoryRouter from "../routes/categoryRoutes/index.routes";
import OrderRouter from "../routes/OrderRoutes/index.Routes";
import statsRouter from "../routes/statsRoutes";

const startuproutes = (app: Application) => {
  const { baseuri, version } = basePath;
  app.use(baseuri + version, userRoutes);
  app.use(baseuri + version, productRouter);
  app.use(baseuri + version, categoryRouter);
  app.use(baseuri + version, OrderRouter);
  app.use(baseuri + version, statsRouter)
};

export default startuproutes;
