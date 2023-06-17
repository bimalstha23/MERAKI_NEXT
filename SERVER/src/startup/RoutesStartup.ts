import { Application } from "express";
import { basePath } from "../constants/Api";
import userRoutes from "../routes/userRoutes";
import productRouter from "../routes/ProductRoutes/index.route";

const startuproutes = (app: Application) => {
  const { baseuri, version } = basePath;
  app.use(baseuri + version, userRoutes);
  app.use(baseuri + version, productRouter);
};

export default startuproutes;
