import { NextFunction, Request, Response } from "express";
import { Router } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.send({ message: "Ok api is working 🚀" });
});

export default router;

// module.exports = router;
