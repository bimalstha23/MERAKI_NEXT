import { Application } from "express";
import { basePath } from "../constants/Api";
import userRoutes from "../routes/userRoutes";
import productRouter from "../routes/ProductRoutes/index.route";
import categoryRouter from "../routes/categoryRoutes/index.routes";

const startuproutes = (app: Application) => {
  const { baseuri, version } = basePath;
  app.use(baseuri + version, userRoutes);
  app.use(baseuri + version, productRouter);
  app.use(baseuri + version, categoryRouter);
};

export default startuproutes;
