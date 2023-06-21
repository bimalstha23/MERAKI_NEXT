import express, { Application } from "express";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import morgan from "morgan";
import startuproutes from "./startup/RoutesStartup";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

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
  res.send({ message: "You're in right place folk 🐻" });
});

startuproutes(app);

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
