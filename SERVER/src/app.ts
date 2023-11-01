import express, { Application } from "express";
import { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import startuproutes from "./startup/RoutesStartup";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import { startStorage } from "./startup/storageStartup";

require("dotenv").config();

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const whitelist = ["http://localhost:5173", "http://localhost:3000", "https://meraki-next-hmzc.vercel.app", "https://meraki-next-hmzc-git-main-bimalstha23.vercel.app", "*"];

const corsOptions = {
  origin: whitelist,
  credentials: true,
}

app.use(cors(corsOptions));

app.get("/", async (_req: Request, res: Response, _next: NextFunction) => {
  res.send({ message: "You're in right place folk 🐻" });
});
startStorage();
startuproutes(app);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));


// const corsOptions = {
//   credentials: true, // This is important.

//   origin: (origin: any, callback: any) => {
//     if (whitelist.includes(origin)) return callback(null, true);

//     callback(new Error("Not allowed by CORS"));
//   },
// };
