import express from "express";
import { NextFunction, Request, Response, Router } from "express";
import createError from "http-errors";
import morgan from "morgan";
import productRouter from "./routes/ProductRoutes/index.route";

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api/products", productRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound());
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
