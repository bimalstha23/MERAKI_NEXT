import express from "express";
import { Router } from "express-serve-static-core";
class AppRouter {
  static instance: Router;

  static getInstance() {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }
    return AppRouter.instance;
  }
}
export default AppRouter;
