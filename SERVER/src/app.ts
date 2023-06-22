import express, { Application } from "express";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import morgan from "morgan";
import startuproutes from "./startup/RoutesStartup";
import cookieParser from "cookie-parser";
import cors from "cors";

require("dotenv").config();

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());

const whitelist = ["http://localhost:5173"];
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin: any, callback: any) => {
    if (whitelist.includes(origin)) return callback(null, true);

    callback(new Error("Not allowed by CORS"));
  },
};

app.use(cors(corsOptions));

// app.options("*", (req: Request, res: Response, next: NextFunction) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   req.header("Access-Control-Allow-Origin");
//   req.header("Access-Control-Allow-Credentials");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.sendStatus(200);
// });

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: "You're in right place folk 🐻" });
});

startuproutes(app);

// app.use((req: Request, res: Response, next: NextFunction) => {
//   next(createError.NotFound());
// });
// UnKnown Routes
// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   const err = new Error(`Route ${req.originalUrl} not found`) as any;
//   err.statusCode = 404;
//   next(err);
// });

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
